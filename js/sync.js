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

  function setBtn(text, opts) {
    if (!btn) return;
    btn.textContent = text;
    btn.disabled = !!(opts && opts.disabled);
    btn.classList.toggle("signed-in", !!(opts && opts.signedIn));
    if (opts && opts.title) btn.title = opts.title;
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

    auth.onAuthStateChanged(authInstance, async function (user) {
      if (user) {
        uid = user.uid;
        const name = (user.displayName || user.email || "account").split(" ")[0];
        setBtn("Sign out · " + name, { signedIn: true });
        try {
          // one-time merge: pull remote, merge with local, write the union back
          const snap = await fs.getDoc(userRef());
          const remote = snap.exists() ? (snap.data().srs || {}) : {};
          applyingRemote = true;
          const merged = window.SRS ? window.SRS.importRemote(remote) : remote;
          applyingRemote = false;
          await fs.setDoc(userRef(), { srs: merged, updatedAt: Date.now() }, { merge: true });
        } catch (e) {
          console.warn("[sync] initial merge failed:", e);
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
      } else {
        doSignIn();
      }
    });
  })();
})();
