/* ============================================================
   toeic.js — TOEIC Listening & Reading content.
   TOEIC = { lc: [parts 1-4], rc: [parts 5-7] }
   Part shape: { id,no,title,alias,meta,blurb, essence,
                 format:[{k,v}], tips:[{t,ex}], traps:[{n,d,ex}] }
     format  -> the "Format" tab (spec sheet + essence)
     tips    -> the "Strategy" tab (ol.steps)
     traps   -> the "Traps" tab (ul.traps)
   ============================================================ */

const TOEIC = {

  /* ==================== LISTENING (Parts 1-4) ==================== */
  lc: [
    {
      id: "lc-p1", no: "P1", title: "Photographs", alias: "describe the picture", meta: "6 questions",
      blurb: "You see one photo and hear four statements (A&ndash;D) spoken once. Choose the statement that best describes the picture.",
      essence: "A literal-listening test: the correct option matches what is <b>actually visible</b> &mdash; the right subject, action and place. No reading; the four choices are audio only.",
      format: [
        { k: "Questions", v: "6 (the easiest part)" },
        { k: "Audio", v: "4 short statements per photo, spoken once" },
        { k: "On the page", v: "the photo only &mdash; choices are not printed" },
        { k: "Tests", v: "vocabulary for people&rsquo;s actions, objects, and locations" }
      ],
      tips: [
        { t: "<b>Study the photo before the audio starts.</b> Ask: who? what action? where?", ex: "Pre-load likely words: a worker, a desk, holding, leaning, on the wall." },
        { t: "Decide if it is a <b>people photo</b> (focus on actions) or a <b>scene/object photo</b> (focus on location/state).", ex: "People &rarr; &lsquo;She is typing&rsquo;. Objects &rarr; &lsquo;Chairs are arranged in rows&rsquo;." },
        { t: "Hold all four in mind and <b>eliminate</b> as you hear each one; keep the last one standing.", ex: "A (no &mdash; wrong action) &middot; B (no &mdash; not shown) &middot; C (yes, matches) &middot; D (no) &rarr; mark C." },
        { t: "Match the <b>verb tense and subject</b> exactly to the image.", ex: "&lsquo;is being loaded&rsquo; (action in progress) vs &lsquo;has been loaded&rsquo; (already done)." }
      ],
      traps: [
        { n: "Similar sounds.", d: "A wrong option swaps in a word that sounds like a right one.", ex: "&lsquo;working&rsquo; vs &lsquo;walking&rsquo;, &lsquo;copy&rsquo; vs &lsquo;coffee&rsquo;." },
        { n: "Right object, wrong action.", d: "The noun is in the photo but the verb describes something not happening.", ex: "There is a car, but no one &lsquo;is washing&rsquo; it." },
        { n: "Active vs passive state.", d: "&lsquo;is being painted&rsquo; needs a person painting now; &lsquo;has been painted&rsquo; just needs paint.", ex: "A finished wall &rarr; &lsquo;has been painted&rsquo; (right); &lsquo;is being painted&rsquo; with no painter in view is the trap." },
        { n: "Plausible but not shown.", d: "A reasonable real-world guess the photo doesn&rsquo;t actually depict.", ex: "Reject anything you cannot see." }
      ]
    },
    {
      id: "lc-p2", no: "P2", title: "Question&ndash;Response", alias: "pick the reply", meta: "25 questions",
      blurb: "You hear a question or statement followed by three responses (A&ndash;C), spoken once. Choose the most logical response. Nothing is printed.",
      essence: "Tests whether you catch the <b>question type</b> and choose a natural reply. The <b>first word</b> usually decides everything; it is pure listening with no text to fall back on.",
      format: [
        { k: "Questions", v: "25 (the most numerous LC part)" },
        { k: "Audio", v: "a prompt + 3 responses, spoken once" },
        { k: "On the page", v: "nothing at all" },
        { k: "Tests", v: "WH- vs Yes/No vs tag questions, and indirect replies" }
      ],
      tips: [
        { t: "<b>Lock onto the first word</b> (Who / Where / When / Why / How / Do / Are / Have&hellip;).", ex: "It tells you what kind of answer is even possible." },
        { t: "A <b>WH- question cannot</b> be answered &lsquo;Yes / No&rsquo; &mdash; eliminate those instantly.", ex: "&lsquo;Where is the report?&rsquo; &rarr; &lsquo;Yes, I did&rsquo; is impossible." },
        { t: "Expect <b>indirect answers</b> &mdash; they are often correct.", ex: "&lsquo;When does it start?&rsquo; &rarr; &lsquo;I&rsquo;ll check the schedule.&rsquo;" },
        { t: "For statements / tag questions, look for <b>agreement or a relevant reaction</b>.", ex: "&lsquo;This room is cold.&rsquo; &rarr; &lsquo;I&rsquo;ll turn up the heating.&rsquo;" }
      ],
      traps: [
        { n: "Repeated-word trap.", d: "A response echoes a word from the prompt &mdash; almost always wrong.", ex: "&lsquo;Did you finish the report?&rsquo; &rarr; &lsquo;The report is on the desk&rsquo; (sounds related, doesn&rsquo;t answer)." },
        { n: "Similar-sounding word.", d: "A near-homophone planted to mislead.", ex: "&lsquo;fare&rsquo; vs &lsquo;fair&rsquo;, &lsquo;leave&rsquo; vs &lsquo;live&rsquo;." },
        { n: "Yes/No to a WH- question.", d: "Grammatically impossible &mdash; a quick elimination.", ex: "&lsquo;Where&rsquo;s the manager?&rsquo; &rarr; &lsquo;Yes, this morning&rsquo; is impossible; &lsquo;In her office&rsquo; is right." },
        { n: "Right topic, wrong response.", d: "On the same subject but not a logical reply to the actual question.", ex: "&lsquo;How was the trip?&rsquo; &rarr; &lsquo;Next Monday&rsquo; (right topic, but answers &lsquo;when&rsquo;, not &lsquo;how&rsquo;)." }
      ]
    },
    {
      id: "lc-p3", no: "P3", title: "Conversations", alias: "2&ndash;3 speakers", meta: "39 questions · 13 sets",
      blurb: "You hear a conversation between 2&ndash;3 people and answer three printed questions (with four options each). Some sets include a visual/graphic.",
      essence: "Tests gist, specific detail, inference and <b>speaker intent</b>. The questions are printed, so the real skill is <b>reading ahead</b> and knowing what to listen for &mdash; the audio plays once.",
      format: [
        { k: "Questions", v: "39 &mdash; 13 conversations, 3 questions each" },
        { k: "Speakers", v: "2 or 3 (watch for three-person sets)" },
        { k: "Graphics", v: "some sets show a table / map / schedule" },
        { k: "On the page", v: "the 3 questions + options (+ any graphic)" }
      ],
      tips: [
        { t: "<b>Read the three questions before the audio</b> and predict what to listen for.", ex: "Underline keywords: &lsquo;Why is the man calling?&rsquo;, &lsquo;What will the woman do next?&rsquo;" },
        { t: "Questions follow the <b>conversation order</b> (Q1 = early, Q3 = late).", ex: "Q1 &lsquo;What is the problem?&rsquo; (start) &rarr; Q3 &lsquo;What will the man do next?&rsquo; (end)." },
        { t: "Track <b>who says what</b> &mdash; detail is often attributed to a specific speaker.", ex: "Three-speaker sets love &lsquo;What does the second man suggest?&rsquo;" },
        { t: "For graphic questions, the answer <b>links the audio to the visual</b> &mdash; don&rsquo;t just read the chart.", ex: "Audio: &lsquo;the 2 p.m. session&rsquo; &rarr; look up its room on the schedule." }
      ],
      traps: [
        { n: "Detail-swap distractor.", d: "A choice uses real words from the audio but the wrong number, time or place.", ex: "Audio: &lsquo;the order ships Friday&rsquo; &rarr; trap option says &lsquo;Thursday&rsquo;." },
        { n: "Misattributed speaker.", d: "Something the woman said is offered as the man&rsquo;s view.", ex: "The woman booked the room, but a choice credits &lsquo;the man&rsquo; with the reservation." },
        { n: "Mentioned-but-not-asked.", d: "True in the conversation but not the answer to this question.", ex: "They discuss price and a deadline; the question asks only about the deadline." },
        { n: "Intent questions.", d: "&lsquo;Why does she say &hellip;?&rsquo; needs the context/feeling, not the literal meaning.", ex: "&lsquo;That&rsquo;s great&rsquo; can be genuine or sarcastic depending on context." }
      ]
    },
    {
      id: "lc-p4", no: "P4", title: "Talks", alias: "one speaker", meta: "30 questions · 10 sets",
      blurb: "You hear a short monologue &mdash; an announcement, voicemail, broadcast, ad or speech &mdash; and answer three printed questions. Some include a graphic.",
      essence: "Like Part 3 but a <b>single speaker</b>. The opening lines reveal who is talking, to whom and where &mdash; identify the talk type fast and read the questions ahead.",
      format: [
        { k: "Questions", v: "30 &mdash; 10 talks, 3 questions each" },
        { k: "Speaker", v: "one (announcement, voicemail, news, advert, tour&hellip;)" },
        { k: "Graphics", v: "some talks show a visual" },
        { k: "On the page", v: "the 3 questions + options (+ any graphic)" }
      ],
      tips: [
        { t: "<b>Identify the talk type from the first sentence</b> (speaker, audience, place).", ex: "&lsquo;Attention shoppers&hellip;&rsquo; = store announcement; &lsquo;You&rsquo;ve reached&hellip;&rsquo; = voicemail." },
        { t: "Read the questions first; the <b>first</b> is often purpose/speaker/location.", ex: "&lsquo;Where would this be heard?&rsquo;, &lsquo;Who is the speaker?&rsquo;" },
        { t: "The <b>last</b> question is often &lsquo;what will happen next&rsquo; or &lsquo;what are listeners asked to do&rsquo;.", ex: "Listen for the closing instruction or call to action." },
        { t: "Map answers to the talk&rsquo;s order, just like Part 3.", ex: "Q1 comes from the opening line; Q3 from the closing instruction." }
      ],
      traps: [
        { n: "Specific-detail distractor.", d: "Right area of the talk, wrong figure / date / name.", ex: "Talk: &lsquo;the tour starts at 9 a.m.&rsquo; &rarr; trap option says &lsquo;10 a.m.&rsquo;" },
        { n: "Misread purpose.", d: "A reason that&rsquo;s plausible but not the speaker&rsquo;s actual aim.", ex: "A sale advert &rarr; trap: &lsquo;to announce a new branch&rsquo; (plausible, not the real aim)." },
        { n: "Future-action confusion.", d: "Mixing what already happened with what the speaker says will happen.", ex: "&lsquo;We have relocated&rsquo; (done) vs &lsquo;we will relocate&rsquo; (next) &mdash; a choice swaps the two." },
        { n: "Paraphrase mismatch.", d: "The correct answer rewords the talk; a trap reuses its exact words about a side point.", ex: "Talk: &lsquo;the flight is delayed&rsquo; &rarr; answer &lsquo;the departure is postponed&rsquo;, not the option echoing &lsquo;flight&rsquo;." }
      ]
    }
  ],

  /* ==================== READING (Parts 5-7) ==================== */
  rc: [
    {
      id: "rc-p5", no: "P5", title: "Incomplete Sentences", alias: "grammar & vocab", meta: "30 questions",
      blurb: "A single sentence with one blank; choose the word or phrase (A&ndash;D) that completes it. Pure grammar and vocabulary, no passage.",
      essence: "Sentence-level grammar (word form, tense, prepositions, conjunctions, pronouns) and <b>vocabulary/collocation</b>. The fastest points in Reading &mdash; speed here buys time for Part 7.",
      format: [
        { k: "Questions", v: "30, each a one-sentence item" },
        { k: "Choices", v: "A&ndash;D, a single word or short phrase" },
        { k: "Tests", v: "word form, tense, prepositions, conjunctions, collocation" },
        { k: "Pace", v: "aim ~20&ndash;30 seconds each" }
      ],
      tips: [
        { t: "<b>Look at the options first</b> to tell the question type.", ex: "Forms of one word (succeed / success / successful / successfully) = grammar; four different words = vocabulary." },
        { t: "For grammar items, find the <b>part of speech</b> the blank needs.", ex: "After &lsquo;a/an/the + adjective&rsquo; &rarr; a noun; before a verb &rarr; an adverb." },
        { t: "Use structural clues: <b>subject&ndash;verb agreement, tense markers, parallelism, prepositions</b>.", ex: "&lsquo;every / yesterday / since&rsquo; fix the tense; &lsquo;both&hellip; and&hellip;&rsquo; needs parallel forms." },
        { t: "For vocabulary items, test <b>collocation and meaning</b> in the whole sentence.", ex: "&lsquo;conduct&rsquo; research, &lsquo;meet&rsquo; a deadline, &lsquo;comply with&rsquo; rules." }
      ],
      traps: [
        { n: "Word-form trap.", d: "The right root word in the wrong form.", ex: "&lsquo;a successfully launch&rsquo; (adv) when a noun&rsquo;s slot needs &lsquo;success&rsquo;." },
        { n: "Tempting but ungrammatical.", d: "A word that fits the meaning but not the structure.", ex: "" },
        { n: "Preposition / phrasal-verb confusion.", d: "&lsquo;result in&rsquo; vs &lsquo;result from&rsquo;, &lsquo;depend on&rsquo;.", ex: "" },
        { n: "&lsquo;Sounds right&rsquo; without checking.", d: "Trust the grammar evidence, not your ear.", ex: "" }
      ]
    },
    {
      id: "rc-p6", no: "P6", title: "Text Completion", alias: "gaps in a passage", meta: "16 questions · 4 texts",
      blurb: "A short text (email, notice, article) with four blanks &mdash; words, grammar, and one <b>full-sentence</b> insertion. Choose A&ndash;D for each.",
      essence: "Part 5 skills <b>in context</b>: some blanks can only be solved by reading the whole passage &mdash; tense across sentences, cohesion, and an inserted sentence that must fit the logic before and after it.",
      format: [
        { k: "Questions", v: "16 &mdash; 4 texts, 4 blanks each" },
        { k: "Special", v: "one blank per text is a whole-sentence choice" },
        { k: "Tests", v: "grammar + vocabulary + cohesion across sentences" },
        { k: "Texts", v: "emails, memos, notices, short articles" }
      ],
      tips: [
        { t: "<b>Read the whole text</b>, not just the line with the blank &mdash; this is the key difference from Part 5.", ex: "" },
        { t: "For the <b>sentence-insertion</b>, check what comes before and after.", ex: "Look at pronouns, linkers and topic flow: does &lsquo;However&rsquo; / &lsquo;This&rsquo; fit here?" },
        { t: "Keep <b>tense and time consistent</b> across the passage.", ex: "An email about a past event keeps the past throughout." },
        { t: "Use cohesion devices to choose connectors.", ex: "Contrast &rarr; however / nevertheless; result &rarr; therefore; addition &rarr; moreover." }
      ],
      traps: [
        { n: "Locally fine, globally wrong.", d: "A choice that is grammatical in its own line but breaks the passage&rsquo;s logic.", ex: "" },
        { n: "Sentence-insertion that repeats or contradicts.", d: "It restates known info or clashes with the next line.", ex: "" },
        { n: "Context tense error.", d: "Right tense for the sentence alone, wrong for the passage&rsquo;s timeline.", ex: "" },
        { n: "Pronoun with no referent.", d: "An inserted sentence whose &lsquo;they / it / this&rsquo; points to nothing.", ex: "" }
      ]
    },
    {
      id: "rc-p7", no: "P7", title: "Reading Comprehension", alias: "single + multiple passages", meta: "54 questions",
      blurb: "Read texts &mdash; emails, ads, articles, forms, text-message chains, and linked sets of 2&ndash;3 documents &mdash; and answer questions: gist, detail, inference, vocab-in-context, NOT/true, intent and cross-document.",
      essence: "The decisive part: it tests <b>scanning, skimming, inference and synthesis under time pressure</b>. Most test-takers lose points here by running out of time, not by lacking the skill.",
      format: [
        { k: "Questions", v: "54 &mdash; single passages (29) + double/triple sets (25)" },
        { k: "Text types", v: "emails, adverts, articles, forms, chats, multi-document sets" },
        { k: "Question types", v: "gist, detail, inference, vocabulary-in-context, NOT, intent, sentence-insertion, cross-reference" },
        { k: "Pace", v: "leave ~50&ndash;55 min for RC; roughly 1 min per question" }
      ],
      tips: [
        { t: "<b>Read the questions first</b>, then scan the text for the answer&rsquo;s location.", ex: "Single-passage answers tend to follow the text order." },
        { t: "For <b>multiple passages, cross-reference</b> &mdash; the answer often needs info from two documents.", ex: "Doc 1 gives a price; Doc 2 gives a discount &rarr; combine them." },
        { t: "Locate by <b>paraphrase</b>, not the exact word; confirm with the line.", ex: "Question &lsquo;reduce costs&rsquo; &rarr; text &lsquo;cut spending&rsquo;." },
        { t: "<b>Manage time ruthlessly</b>: flag a hard question and move on; never sink 4 minutes into one item.", ex: "Do single passages first if multi-sets slow you down." }
      ],
      traps: [
        { n: "Paraphrase distractor.", d: "An option reuses the passage&rsquo;s words but distorts the meaning; the right one paraphrases.", ex: "" },
        { n: "NOT / EXCEPT questions.", d: "Invert your reading &mdash; tick the three that ARE stated; the leftover is the answer.", ex: "&lsquo;What is NOT mentioned as a benefit?&rsquo;" },
        { n: "Wrong document.", d: "True information, but found in a different document than the question is about.", ex: "" },
        { n: "Over-inference.", d: "A reasonable real-world conclusion the text never actually states.", ex: "" },
        { n: "Vocabulary-in-context.", d: "The common meaning of the word is the trap; the passage uses a secondary sense.", ex: "&lsquo;figure&rsquo; = number, not shape, in a report." },
        { n: "The time sink.", d: "One dense triple-passage set can eat the time you need for ten easier questions.", ex: "" }
      ]
    }
  ]
};

window.TOEIC = TOEIC;
