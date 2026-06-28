/* ============================================================
   sync.js — optional cloud sync of SRS progress across devices.
   - Google sign-in (Firebase Auth) + Firestore (one doc per user).
   - Merges with local progress on sign-in; writes are debounced;
     other devices update live via onSnapshot.
   - If Firebase is not configured, the app runs unchanged and the
     button shows "Sync off". Local progress (localStorage) always works.

   Data: users/{uid} = { srs: { cardId: {level, ts} }, updatedAt }
   ============================================================ */
(function () {
  "use strict";

  const SDK = "https://www.gstatic.com/firebasejs/10.12.0/";
  const btn = document.getElementById("authBtn");

  // Who the local progress (localStorage) currently belongs to. localStorage is
  // shared across all accounts on one browser, so we tag it with the signed-in
  // uid to avoid merging one account's progress into another's.
  const OWNER_KEY = "ielts-reading-owner-v1";
  function getOwner() { try { return localStorage.getItem(OWNER_KEY); } catch (e) { return null; } }
  function setOwner(v) { try { localStorage.setItem(OWNER_KEY, v); } catch (e) {} }

  function setBtn(text, opts) {
    if (!btn) return;
    btn.classList.remove("is-avatar", "is-initials");
    btn.textContent = text;                 // clears any avatar <img> too
    btn.disabled = !!(opts && opts.disabled);
    btn.classList.toggle("signed-in", !!(opts && opts.signedIn));
    btn.title = (opts && opts.title) || "";
    btn.removeAttribute("aria-label");
  }

  function initials(name) {
    const parts = String(name).trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return "?";
    if (parts.length === 1) return parts[0].slice(0, 1).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  // signed in: the button becomes the user's Google avatar (or initials);
  // clicking it still signs out (handled by the existing click listener).
  function setAvatar(user) {
    if (!btn) return;
    const name = user.displayName || user.email || "account";
    btn.disabled = false;
    btn.classList.add("signed-in");
    btn.title = "Sign out · " + name;
    btn.setAttribute("aria-label", "Sign out — signed in as " + name);
    const photo = user.photoURL;
    if (photo) {
      btn.classList.add("is-avatar");
      btn.classList.remove("is-initials");
      // referrerpolicy avoids Google occasionally 403-ing the avatar request
      btn.innerHTML = '<img class="avatar" alt="" referrerpolicy="no-referrer" src="' + photo + '" />';
      const img = btn.querySelector("img");
      if (img) img.addEventListener("error", function () {
        btn.classList.remove("is-avatar");
        btn.classList.add("is-initials");
        btn.textContent = initials(name);
      });
    } else {
      btn.classList.remove("is-avatar");
      btn.classList.add("is-initials");
      btn.textContent = initials(name);
    }
  }

  // Google blocks OAuth inside embedded/in-app browsers (Messenger, Instagram,
  // Facebook, Zalo, TikTok, Android WebView...) with error 403 disallowed_useragent.
  function isInAppBrowser() {
    const ua = navigator.userAgent || "";
    if (/FBAN|FBAV|FB_IAB|Messenger|Instagram|Line\/|MicroMessenger|Zalo|TikTok|Snapchat|Twitter|Pinterest|GSA/i.test(ua)) return true;
    if (/Android.*;\s*wv\)/i.test(ua)) return true;            // Android WebView
    return false;
  }

  function showAppBrowserHelp() {
    if (document.getElementById("iabHelp")) return;
    const url = location.href;
    const wrap = document.createElement("div");
    wrap.id = "iabHelp";
    wrap.setAttribute("role", "dialog");
    wrap.style.cssText = "position:fixed;left:0;right:0;bottom:0;z-index:200;background:#16201d;color:#fff;" +
      "padding:18px;box-shadow:0 -10px 36px rgba(0,0,0,.45);font-family:system-ui,-apple-system,sans-serif";
    const btnCss = "appearance:none;border:1px solid rgba(255,255,255,.35);background:transparent;color:#fff;" +
      "border-radius:7px;padding:9px 14px;font-size:14px;cursor:pointer";
    wrap.innerHTML =
      '<div style="max-width:560px;margin:0 auto;font-size:14.5px;line-height:1.55">' +
        '<b style="font-size:15.5px">Mở bằng trình duyệt để đăng nhập</b><br>' +
        'Google chặn đăng nhập trong trình duyệt in-app (Messenger, Facebook, Instagram…). ' +
        'Bấm <b>•••</b> ở góc trên màn hình &rarr; <b>Open in Safari / Mở trong trình duyệt</b>, rồi đăng nhập ở đó.' +
        '<div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap">' +
          '<button id="iabCopy" style="' + btnCss + '">Copy link</button>' +
          '<button id="iabClose" style="' + btnCss + '">Đóng</button>' +
        "</div>" +
      "</div>";
    document.body.appendChild(wrap);
    const copy = document.getElementById("iabCopy");
    copy.addEventListener("click", function () {
      try { navigator.clipboard.writeText(url).then(function () { copy.textContent = "Đã copy ✓"; }); }
      catch (e) { copy.textContent = url; }
    });
    document.getElementById("iabClose").addEventListener("click", function () { wrap.remove(); });
  }

  const cfg = window.FIREBASE_CONFIG;
  const unconfigured = !cfg || !cfg.apiKey || /PASTE_|YOUR_|XXXX/.test(cfg.apiKey);
  if (unconfigured) {
    setBtn("Sync off", { disabled: true, title: "Add your Firebase config in js/firebase-config.js to enable cross-device sync" });
    return;
  }

  setBtn("Sign in", { disabled: true });

  (async function init() {
    let app, auth, db, fs;
    try {
      const [appMod, authMod, fsMod] = await Promise.all([
        import(SDK + "firebase-app.js"),
        import(SDK + "firebase-auth.js"),
        import(SDK + "firebase-firestore.js")
      ]);
      app = appMod.initializeApp(cfg);
      auth = authMod;
      fs = fsMod;
      db = fsMod.getFirestore(app);
    } catch (e) {
      console.warn("[sync] Firebase failed to load:", e);
      setBtn("Sync off", { disabled: true, title: "Could not load Firebase (offline?). Local progress still works." });
      return;
    }

    const authInstance = auth.getAuth(app);
    const provider = new auth.GoogleAuthProvider();
    let uid = null, unsub = null, writeTimer = null, applyingRemote = false;

    function flashError(e) {
      const code = (e && (e.code || e.message)) || "error";
      setBtn("Sign-in error", { title: code });
      console.warn("[sync] auth error:", code, e);
      setTimeout(function () { if (!authInstance.currentUser) setBtn("Sign in", {}); }, 4000);
    }

    // popup is nicer but is blocked by many browsers / third-party-cookie
    // settings and on mobile; fall back to a full-page redirect.
    const POPUP_FALLBACK = [
      "auth/popup-blocked", "auth/popup-closed-by-user", "auth/cancelled-popup-request",
      "auth/operation-not-supported-in-this-environment", "auth/web-storage-unsupported",
      "auth/internal-error"
    ];
    async function doSignIn() {
      try {
        await auth.signInWithPopup(authInstance, provider);
      } catch (e) {
        if (POPUP_FALLBACK.indexOf(e && e.code) !== -1) {
          try { await auth.signInWithRedirect(authInstance, provider); }
          catch (e2) { flashError(e2); }
        } else {
          flashError(e);
        }
      }
    }
    // catch results / errors coming back from a redirect sign-in
    auth.getRedirectResult(authInstance).catch(flashError);

    function userRef() { return fs.doc(db, "users", uid); }

    function pushSoon(storeObj) {
      if (!uid) return;
      clearTimeout(writeTimer);
      writeTimer = setTimeout(function () {
        fs.setDoc(userRef(), { srs: storeObj, updatedAt: Date.now() }, { merge: true })
          .catch(function (e) { console.warn("[sync] write failed:", e); });
      }, 1500);
    }

    // push local changes (study / reset) up — unless we are applying a remote change
    if (window.SRS) {
      window.SRS.onChange(function (storeObj) { if (!applyingRemote) pushSoon(storeObj); });
    }

    setBtn("Sign in", { disabled: false });
    if (isInAppBrowser()) setBtn("Open in browser ↗", { title: "In-app browsers block Google sign-in — open in Safari/Chrome" });

    auth.onAuthStateChanged(authInstance, async function (user) {
      if (user) {
        uid = user.uid;
        setAvatar(user);
        if (unsub) { unsub(); unsub = null; }
        // Is this a DIFFERENT account than the one the local data belongs to?
        const prevOwner = getOwner();
        const switchingAccount = !!prevOwner && prevOwner !== uid;
        setOwner(uid);
        try {
          const snap = await fs.getDoc(userRef());
          const remote = snap.exists() ? (snap.data().srs || {}) : {};
          applyingRemote = true;
          // Switching to another account on this browser → load THIS account's
          // data fresh (replace), so progress never mixes between accounts.
          // Same account, or first sign-in claiming offline progress → merge.
          const result = window.SRS
            ? (switchingAccount ? window.SRS.replaceAll(remote) : window.SRS.importRemote(remote))
            : remote;
          applyingRemote = false;
          await fs.setDoc(userRef(), { srs: result, updatedAt: Date.now() }, { merge: true });
        } catch (e) {
          console.warn("[sync] initial sync failed:", e);
          applyingRemote = false;
        }
        // live updates from other devices
        unsub = fs.onSnapshot(userRef(), function (snap) {
          if (!snap.exists() || !window.SRS) return;
          applyingRemote = true;
          window.SRS.importRemote(snap.data().srs || {});
          applyingRemote = false;
        });
      } else {
        uid = null;
        if (unsub) { unsub(); unsub = null; }
        setBtn("Sign in", {});
      }
    });

    btn.addEventListener("click", function () {
      if (authInstance.currentUser) {
        auth.signOut(authInstance);
      } else if (isInAppBrowser()) {
        showAppBrowserHelp();   // OAuth would hit Google's 403 here
      } else {
        doSignIn();
      }
    });
  })();
})();
