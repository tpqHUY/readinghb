/* ============================================================
   cases.js — content for every IELTS Academic Reading question type.
   Edit freely: add steps, traps, or patterns and the page rebuilds.
   Each pattern pair: { label, q: cue/question wording, p: passage wording, note }
   ============================================================ */

const CASES = [
  {
    id: "tfng",
    no: "01",
    title: "True / False / Not Given",
    alias: "TFNG · facts",
    order: "in order",
    orderClass: "seq",
    blurb: "You decide whether each statement agrees with, contradicts, or is absent from the passage. The whole game is False vs Not Given.",
    steps: [
      { t: "Read the statement and lock onto its <b>claim</b>, not its topic.", ex: "Underline the part that could be true or false — usually a detail, number, or qualifier." },
      { t: "Scan for the statement&rsquo;s <b>location</b> using paraphrased content words.", ex: "Answers run in order, so start after your last answer&rsquo;s line." },
      { t: "Read the licensing sentence (and the one before/after) <b>slowly</b>.", ex: "The verdict often turns on one qualifier — only, may, all, after." },
      { t: "Ask in this order: does the text <b>state the same thing</b> (True) or the <b>opposite</b> (False)?", ex: "" },
      { t: "If neither — the text is silent or only partly overlaps — answer <b>Not Given</b> and move on.", ex: "Do not hunt endlessly; absence is itself the answer." }
    ],
    traps: [
      { n: "False vs Not Given.", d: "False needs a <b>direct contradiction</b> in the text. If you are reasoning &lsquo;this is probably untrue&rsquo; from logic or world knowledge, it is Not Given.", ex: "Statement: &ldquo;X is the largest museum.&rdquo; Text mentions X but never compares sizes &rarr; Not Given, not False." },
      { n: "The extreme statement.", d: "Statements with <b>all / every / never / only / the most</b> are often False because the text hedges with some / many / certain / may.", ex: "Text: &ldquo;many species declined&rdquo; &rarr; statement &ldquo;all species declined&rdquo; is False." },
      { n: "The added detail.", d: "The statement adds a specific the text never gives — a place, date, cause, or purpose. Extra unsupported detail &rarr; <b>Not Given</b>.", ex: "Text: &ldquo;the method spread quickly.&rdquo; Statement: &ldquo;the method spread quickly <em>across Europe</em>&rdquo; &rarr; Not Given." },
      { n: "Half-true.", d: "Both halves of the statement must be supported. One unsupported or contradicted clause sinks the whole statement.", ex: "&ldquo;The bridge is the oldest <em>and</em> the longest&rdquo; — if only &lsquo;oldest&rsquo; is stated &rarr; not True." },
      { n: "Tense &amp; modality shift.", d: "A change in time (past vs present) or certainty (will vs may, cures vs may help) flips the truth value.", ex: "Text: &ldquo;the drug <em>may</em> relieve symptoms&rdquo; &rarr; statement &ldquo;the drug <em>cures</em> the disease&rdquo; is False." },
      { n: "Comparison reversal.", d: "The text compares A and B; the statement keeps the comparison but swaps the direction.", ex: "Text: &ldquo;B outperformed A&rdquo; &rarr; statement &ldquo;A is more effective than B&rdquo; is False." },
      { n: "Synonym-match relief.", d: "Finding paraphrased keywords feels like confirmation, but matching the <em>location</em> is not matching the <em>claim</em>. Read the proposition, not the topic.", ex: "" }
    ],
    patterns: [
      { label: "Negated antonym = False", q: "The reform was popular.", p: "The reform met with widespread resistance.", note: "Opposite meaning &rarr; False." },
      { label: "Silence = Not Given", q: "The author prefers method A to method B.", p: "Both methods are described; no preference is stated.", note: "No comparison made &rarr; Not Given." },
      { label: "Qualifier flip = False", q: "All migratory birds return to the same site.", p: "Most, but not all, return to their birthplace.", note: "all vs most &rarr; False." },
      { label: "Added origin = Not Given", q: "The technique was developed in Japan.", p: "The technique became popular in Japan.", note: "Where it became popular &ne; where it was developed &rarr; Not Given." },
      { label: "Certainty downgrade = False", q: "The findings prove the theory.", p: "The findings are consistent with the theory.", note: "consistent with &ne; prove &rarr; False." }
    ]
  },

  {
    id: "ynng",
    no: "02",
    title: "Yes / No / Not Given",
    alias: "YNNG · views & claims",
    order: "in order",
    orderClass: "seq",
    blurb: "The TFNG of opinions. You judge statements against the writer&rsquo;s views and claims, not against objective facts.",
    steps: [
      { t: "Identify <b>whose</b> opinion the statement is about — almost always the writer&rsquo;s.", ex: "" },
      { t: "Locate the writer&rsquo;s view via paraphrase, watching for <b>opinion verbs</b>.", ex: "argues, claims, doubts, concedes, dismisses, advocates." },
      { t: "Check whether the statement <b>agrees</b> (Yes) or <b>conflicts</b> (No) with that view.", ex: "" },
      { t: "If the writer expresses <b>no view</b> on it, answer <b>Not Given</b>.", ex: "Watch for views the writer reports but does not share." }
    ],
    traps: [
      { n: "Reported vs held view.", d: "&lsquo;Some scholars claim X&rsquo; is not the writer claiming X. If the writer doesn&rsquo;t endorse it, a statement about the writer&rsquo;s belief is <b>Not Given</b>.", ex: "" },
      { n: "Cited to refute.", d: "The writer often quotes a view <em>in order to reject it</em>. A statement crediting that view to the writer is <b>No</b>.", ex: "Text: &ldquo;It is often said that X — but this is mistaken.&rdquo; Statement: &ldquo;The writer believes X&rdquo; &rarr; No." },
      { n: "Strength of opinion.", d: "&lsquo;The writer is convinced&rsquo; vs the text&rsquo;s tentative &lsquo;the writer suspects / it seems&rsquo; — a mismatch in conviction is <b>No</b>.", ex: "" },
      { n: "Partial agreement.", d: "The writer accepts part of an idea but not all. A statement claiming full agreement is <b>No</b>.", ex: "&ldquo;While the goal is sound, the method is flawed&rdquo; &rarr; not full support." },
      { n: "Belief vs recommendation.", d: "Describing something is not advocating it. &lsquo;The writer thinks X should happen&rsquo; needs an actual recommendation in the text, else <b>Not Given</b>.", ex: "" },
      { n: "Fact dressed as opinion.", d: "Some statements describe a fact the writer never evaluates. No expressed stance &rarr; <b>Not Given</b>.", ex: "" }
    ],
    patterns: [
      { label: "Concession signals a real view", q: "The writer fully supports nuclear power.", p: "While acknowledging its risks, the author ultimately endorses it.", note: "Net stance = support &rarr; Yes." },
      { label: "Distancing language", q: "The writer believes the policy worked.", p: "Supporters of the policy claim it worked.", note: "Writer reports, not endorses &rarr; Not Given." },
      { label: "Evaluative adverb reveals stance", q: "The writer is critical of the plan.", p: "The plan, regrettably, ignores the poorest groups.", note: "regrettably / unfortunately = criticism &rarr; No to &lsquo;writer praises&rsquo;." },
      { label: "Modal of obligation = recommendation", q: "The writer thinks governments must act.", p: "Governments ought to intervene without further delay.", note: "ought to / must = the writer advocating &rarr; Yes." }
    ]
  },

  {
    id: "headings",
    no: "03",
    title: "Matching Headings",
    alias: "Paragraph main ideas",
    order: "not in order",
    orderClass: "scatter",
    blurb: "Match a heading to each paragraph. Headings test the main idea / gist — not whether a word appears in the paragraph.",
    steps: [
      { t: "Do this set <b>last</b> for the passage if possible — you&rsquo;ll know the paragraphs.", ex: "" },
      { t: "Read the <b>whole paragraph</b> for its central point; note the topic sentence but verify with the body.", ex: "Main idea often sits in sentence 1 or the last sentence." },
      { t: "Summarise the paragraph in <b>your own 4&ndash;5 words</b> before looking at the options.", ex: "This stops the heading list from biasing you." },
      { t: "Match your summary to the closest heading; <b>eliminate</b> headings that fit only a detail.", ex: "" },
      { t: "Cross off used headings; leave the <b>hardest paragraphs</b> until the option list is smaller.", ex: "There are always more headings than paragraphs." }
    ],
    traps: [
      { n: "Detail-not-gist heading.", d: "A heading that matches one sentence in the paragraph but not its overall point. Tempting because the words appear.", ex: "Para is about a discovery&rsquo;s impact; heading names a person mentioned once &rarr; wrong." },
      { n: "Example mistaken for the point.", d: "A paragraph uses an example to support a claim. A heading describing the <em>example</em> matches a detail, not the paragraph&rsquo;s argument.", ex: "" },
      { n: "Two plausible headings.", d: "Often two headings fit loosely. The right one covers the <em>whole</em> paragraph; the other covers only part.", ex: "" },
      { n: "Keyword overlap.", d: "A heading sharing a noun with the paragraph is bait. Ask what the paragraph is mainly <em>doing</em>, not which words it shares.", ex: "" },
      { n: "First-sentence hook.", d: "The opening line may be a question or a hook; the real point lands later, after a however / but / in fact.", ex: "&ldquo;It seems obvious that&hellip; In reality, however,&hellip;&rdquo; — the point is the second half." },
      { n: "Cascade error.", d: "Misassigning one paragraph forces others wrong. Verify each independently; don&rsquo;t chain guesses.", ex: "" }
    ],
    patterns: [
      { label: "Cause language &rarr; &lsquo;Reasons for&hellip;&rsquo;", q: "Heading: &lsquo;Reasons for a decline&rsquo;", p: "Paragraph explains why numbers fell: due to, as a result of, owing to.", note: "Match the rhetorical function, not a noun." },
      { label: "Pivot &rarr; problem/solution", q: "Heading: &lsquo;An unexpected solution&rsquo;", p: "Para opens with a problem, then pivots on however / instead to a fix.", note: "The pivot decides the heading." },
      { label: "Time sequence &rarr; development", q: "Heading: &lsquo;How the field evolved&rsquo;", p: "Para traces stages: initially&hellip; later&hellip; eventually&hellip;", note: "Chronology language = a development paragraph." },
      { label: "Opposing positions &rarr; debate", q: "Heading: &lsquo;Conflicting interpretations&rsquo;", p: "Para sets one view against another: some argue&hellip; others counter&hellip;", note: "Two camps presented = a &lsquo;differing views&rsquo; heading." }
    ]
  },

  {
    id: "info",
    no: "04",
    title: "Matching Information",
    alias: "Which paragraph contains&hellip;",
    order: "not in order",
    orderClass: "scatter",
    blurb: "Find which paragraph contains a specific piece of information (an example, a reason, a comparison). Information can be anywhere; paragraphs may be used more than once or not at all.",
    steps: [
      { t: "Read the prompt and note the <b>type</b> of information sought.", ex: "an example, a definition, a contrast, a cause, a prediction." },
      { t: "Scan paragraphs for that <b>function</b>, not just topic words.", ex: "&lsquo;An example of&rsquo; &rarr; look for for instance, such as, e.g." },
      { t: "Confirm the paragraph genuinely <b>contains</b> the information, not just the topic.", ex: "" },
      { t: "Do these <b>after</b> heading/global questions — they&rsquo;re slow and out of order.", ex: "Budget tightly; don&rsquo;t re-read whole paragraphs repeatedly." }
    ],
    traps: [
      { n: "Topic vs information.", d: "A paragraph about the topic may not contain the specific information described. Match the <em>thing asked for</em>, exactly.", ex: "Prompt wants &lsquo;a reason&rsquo;; the keyword paragraph only describes <em>what</em> happened, not <em>why</em>." },
      { n: "Keyword decoy paragraph.", d: "The prompt&rsquo;s keyword often sits in a paragraph that does NOT contain the asked information type. Don&rsquo;t stop at the word.", ex: "" },
      { n: "Signal-word reliance.", d: "Functions are often unsignalled — an &lsquo;example&rsquo; can be a named instance with no &lsquo;for example&rsquo;. Read for meaning.", ex: "&lsquo;Whales, for one, &hellip;&rsquo; or just &lsquo;The blue whale shows this&rsquo; = an example." },
      { n: "Re-use confusion.", d: "Unless told &lsquo;you may use any letter once&rsquo;, a paragraph can answer several prompts — don&rsquo;t cross paragraphs off.", ex: "" },
      { n: "Time sink.", d: "These don&rsquo;t follow passage order, so they reward broad familiarity. Hunting blindly burns your clock — note where info-types live as you read.", ex: "" }
    ],
    patterns: [
      { label: "Contrast info", q: "Prompt: &lsquo;a comparison between two periods&rsquo;", p: "Text: &lsquo;whereas in the 1970s &hellip;, by 2010 &hellip;&rsquo;", note: "whereas / by contrast = comparison." },
      { label: "Definition (not example)", q: "Prompt: &lsquo;a definition of a term&rsquo;", p: "Text: &lsquo;X, that is, the process by which &hellip;&rsquo;", note: "that is / refers to / is defined as = definition." },
      { label: "Cause / reason info", q: "Prompt: &lsquo;a reason for the change&rsquo;", p: "Text: &lsquo;this occurred because / owing to / stemmed from &hellip;&rsquo;", note: "because / owing to = a reason, not just an event." },
      { label: "Process / method info", q: "Prompt: &lsquo;a description of how it works&rsquo;", p: "Text: &lsquo;first &hellip;, the material is then &hellip;, finally &hellip;&rsquo;", note: "step language = a process description." }
    ]
  },

  {
    id: "features",
    no: "05",
    title: "Matching Features",
    alias: "Match items to a list",
    order: "loosely ordered",
    orderClass: "scatter",
    blurb: "Match statements to a set of options — people, theories, periods, places. Options can be used more than once or not at all.",
    steps: [
      { t: "Underline the <b>features</b> (the named people/categories) in the passage first.", ex: "Build a mini-map of where each option lives." },
      { t: "Take each statement and find which feature the text <b>links</b> it to.", ex: "" },
      { t: "Match on <b>meaning</b>, since the statement paraphrases what the text says about that feature.", ex: "" },
      { t: "Verify the <b>attribution</b> — that this view/trait belongs to that exact option.", ex: "Two researchers may hold contrasting views in adjacent lines." }
    ],
    traps: [
      { n: "Adjacent-name confusion.", d: "When two names sit close together, it&rsquo;s easy to attach a claim to the wrong one. Pin the <b>subject of the verb</b>.", ex: "&lsquo;Unlike Brown, Lee argued &hellip;&rsquo; — the claim is Lee&rsquo;s, not Brown&rsquo;s." },
      { n: "Contrast trap.", d: "&lsquo;Unlike X, Y believes&hellip;&rsquo; mentions X right before the view — but the view is Y&rsquo;s. The named contrast is a decoy.", ex: "" },
      { n: "Pronoun reference.", d: "After a name, the view continues under he / she / they / the latter. Lose track of the referent and you mis-assign.", ex: "&lsquo;Marsh &hellip; She later showed &hellip;&rsquo; — &lsquo;she&rsquo; = Marsh." },
      { n: "Shared trait.", d: "If a feature can be used more than once, don&rsquo;t assume one statement per option.", ex: "" },
      { n: "The decoy option.", d: "Some options are never used. Don&rsquo;t force a match just to use every letter.", ex: "" },
      { n: "Writer vs source.", d: "A trait may belong to the writer&rsquo;s own commentary, not any listed person. Check it&rsquo;s actually attributed to an option.", ex: "" }
    ],
    patterns: [
      { label: "Contrast separates two people", q: "Statement: &lsquo;believed climate was the main cause&rsquo;", p: "&lsquo;Whereas Patel stressed economics, Okoro pointed to climate.&rsquo;", note: "The claim belongs to Okoro." },
      { label: "Anaphora hides the subject", q: "Whose view is &lsquo;this&rsquo;?", p: "&lsquo;Marsh proposed the model. This was later disputed by Nadel.&rsquo;", note: "&lsquo;This&rsquo; = the model; the dispute is Nadel&rsquo;s." },
      { label: "Direct attribution marker", q: "Match a view to a person", p: "&lsquo;According to Reyes / In Reyes&rsquo;s view, &hellip;&rsquo;", note: "according to / in X&rsquo;s view = a clean attribution." },
      { label: "Reporting verb clusters a claim", q: "Find who made a claim", p: "&lsquo;Tan <em>argued / maintained / found</em> that &hellip;&rsquo;", note: "the reporting verb&rsquo;s subject owns the claim." }
    ]
  },

  {
    id: "endings",
    no: "06",
    title: "Matching Sentence Endings",
    alias: "Complete the sentence",
    order: "in order",
    orderClass: "seq",
    blurb: "Join each sentence beginning to the correct ending from a list. Both meaning and grammar must fit. More endings than beginnings.",
    steps: [
      { t: "Read the sentence <b>beginning</b> and predict what kind of ending it needs.", ex: "a reason? a result? a date? a noun phrase?" },
      { t: "Locate the matching content in the passage; the beginnings <b>run in order</b>.", ex: "" },
      { t: "Choose the ending that is both <b>true to the text and grammatically fits</b>.", ex: "Read the whole combined sentence aloud in your head." },
      { t: "Eliminate endings that are true but <b>don&rsquo;t connect</b> to this beginning.", ex: "" }
    ],
    traps: [
      { n: "Grammatically smooth, factually wrong.", d: "An ending can fit the grammar perfectly yet state something the text doesn&rsquo;t support. Meaning must match too.", ex: "" },
      { n: "True-but-unrelated ending.", d: "Several endings may be true statements from the passage; only one completes <em>this</em> beginning.", ex: "" },
      { n: "Fits more than one beginning.", d: "A tempting ending could close two different beginnings. Use the text to find which pairing it actually supports.", ex: "" },
      { n: "Grammar mismatch.", d: "Singular/plural, verb form, or a needed preposition can rule an ending out before meaning even matters.", ex: "Beginning ends &lsquo;&hellip;were&rsquo; &rarr; the ending must take a plural subject." },
      { n: "Order drift.", d: "Beginnings follow the passage. If your matches jump backwards, re-check.", ex: "" }
    ],
    patterns: [
      { label: "because &rarr; a reason", q: "&lsquo;The experiment failed because &hellip;&rsquo;", p: "needs a cause clause, not a noun phrase.", note: "because &rarr; reason ending only." },
      { label: "so / therefore &rarr; a result", q: "&lsquo;Funding was cut, so &hellip;&rsquo;", p: "needs a consequence.", note: "so / therefore &rarr; result ending." },
      { label: "comparative &rarr; comparison", q: "&lsquo;The new design is more efficient than &hellip;&rsquo;", p: "needs the second item being compared.", note: "more &hellip; than &rarr; an ending naming the other item." },
      { label: "which &rarr; a relative clause", q: "&lsquo;The data revealed a pattern, which &hellip;&rsquo;", p: "needs a verb phrase about the pattern.", note: "which = an ending describing the noun before it." }
    ]
  },

  {
    id: "mcq",
    no: "07",
    title: "Multiple Choice",
    alias: "MCQ · single & multi-answer",
    order: "in order",
    orderClass: "seq",
    blurb: "Choose A&ndash;D (or several from a longer list). The slowest, most distractor-heavy type — where band 8 is won or lost.",
    steps: [
      { t: "Read the <b>stem</b> first and turn it into a question in your head.", ex: "Cover the options so they don&rsquo;t bias your search." },
      { t: "Locate the relevant text; MCQs <b>run in order</b> through the passage.", ex: "" },
      { t: "Form your <b>own answer</b> from the text before reading the options.", ex: "" },
      { t: "Eliminate by <b>fault</b>: too extreme, partly false, out of scope, true-but-not-asked.", ex: "Name the flaw in each wrong option — it confirms the right one." },
      { t: "For &lsquo;choose TWO/THREE&rsquo;, treat each option as its own TFNG against the text.", ex: "" }
    ],
    traps: [
      { n: "True but doesn&rsquo;t answer the stem.", d: "An option can be a true statement from the passage yet not answer the question asked. Re-read the stem.", ex: "Stem asks the <em>main</em> reason; the option states a true but minor reason." },
      { n: "The verbatim lure.", d: "The option reusing the passage&rsquo;s exact striking words is often the trap; the correct one paraphrases.", ex: "" },
      { n: "Half-right.", d: "One clause supported, one not. Reject any option with an unsupported part.", ex: "" },
      { n: "Extreme wording.", d: "always / only / proves / never / impossible rarely survive against a hedged text.", ex: "" },
      { n: "Opposite-but-familiar.", d: "A distractor reverses the text&rsquo;s claim while reusing its vocabulary, so it reads as familiar and &lsquo;seen&rsquo;.", ex: "Text: &lsquo;rarely fails&rsquo; &rarr; trap option: &lsquo;often fails&rsquo;." },
      { n: "Distorted relationship.", d: "Right facts, wrong link — the option pairs two true details with a cause/sequence the text never states.", ex: "&lsquo;A caused B&rsquo; when the text only says A and B both occurred." },
      { n: "Attribution swap (for &lsquo;according to X&rsquo;).", d: "The option gives a real view but credits it to the wrong person or to the writer.", ex: "" }
    ],
    patterns: [
      { label: "Right answer paraphrases", q: "Stem asks the main reason for X.", p: "Text gives the reason in fresh words; the trap option quotes the passage but about a side point.", note: "Meaning-match beats word-match." },
      { label: "Scope check", q: "Option: &lsquo;the method always works.&rsquo;", p: "Text: &lsquo;the method usually succeeds.&rsquo;", note: "always vs usually &rarr; reject." },
      { label: "Negative stem", q: "Stem: &lsquo;Which is NOT mentioned?&rsquo;", p: "Three options appear in the text; one does not.", note: "Tick off the three that ARE stated; the leftover is the answer." },
      { label: "Purpose / gist stem", q: "Stem: &lsquo;The writer&rsquo;s main purpose is to&hellip;&rsquo;", p: "Whole paragraph builds one argument; options offer details + one overall aim.", note: "Pick the option covering the <em>whole</em> point, not a detail." }
    ]
  },

  {
    id: "sentence",
    no: "08",
    title: "Sentence Completion",
    alias: "Fill from the passage",
    order: "in order",
    orderClass: "seq",
    blurb: "Complete sentences using words taken from the passage, within a strict word limit (e.g. NO MORE THAN TWO WORDS).",
    steps: [
      { t: "Read the <b>word limit</b> and obey it absolutely.", ex: "&lsquo;ONE WORD ONLY&rsquo; means a two-word answer scores zero — even if correct in meaning." },
      { t: "Predict the <b>part of speech / type</b> the gap needs.", ex: "noun? a number? a material? a verb?" },
      { t: "Locate the paraphrased sentence and lift the <b>exact word(s)</b> from the text.", ex: "Spelling must be exact; copy carefully." },
      { t: "Re-read the completed sentence to confirm it&rsquo;s <b>grammatical and true</b>.", ex: "" }
    ],
    traps: [
      { n: "Word-limit violation.", d: "The single most common avoidable error. Hyphenated words usually count as one; a number written as figures counts as one word.", ex: "Limit &lsquo;TWO WORDS&rsquo;: &lsquo;a wooden frame&rsquo; (3) is wrong; &lsquo;wooden frame&rsquo; (2) is fine." },
      { n: "Nearby-noun decoy.", d: "The matched sentence often holds several nouns; only one fits the gap&rsquo;s grammar and meaning. Don&rsquo;t grab the first.", ex: "" },
      { n: "Answer sits a clause away.", d: "The lifted word can be before or after the matched keywords, not next to them. Read the whole sentence.", ex: "" },
      { n: "Form-change temptation.", d: "You normally copy words unchanged. If the grammar seems to need a changed form, the real answer is usually elsewhere — IELTS prefers exact lifts.", ex: "" },
      { n: "Own synonym.", d: "You must use words from the passage, not a synonym of your own that fits the meaning.", ex: "" },
      { n: "Spelling.", d: "A misspelled transferred word is marked wrong. Copy letter by letter.", ex: "" }
    ],
    patterns: [
      { label: "Gap signals the type", q: "&lsquo;The bridge is made of ______.&rsquo;", p: "Scan for a material noun near the paraphrase.", note: "Predict the slot before searching." },
      { label: "Paraphrased frame, lifted answer", q: "&lsquo;Costs rose because of ______.&rsquo;", p: "Text: &lsquo;the increase stemmed from rising fuel prices.&rsquo;", note: "Frame paraphrased; answer = &lsquo;fuel prices&rsquo;." },
      { label: "Collocation predicts the word", q: "&lsquo;Pollution is a major ______ of decline.&rsquo;", p: "Text: &lsquo;a leading cause of the decline&rsquo;", note: "&lsquo;a ___ of&rsquo; needs a noun &rarr; cause." },
      { label: "Number / date gap", q: "&lsquo;The temple was built in ______.&rsquo;", p: "Text: &lsquo;construction was completed in 1456.&rsquo;", note: "a date gap &rarr; scan for figures." }
    ]
  },

  {
    id: "summary",
    no: "09",
    title: "Summary / Note / Table / Flow-chart",
    alias: "Completion grids",
    order: "in order (per section)",
    orderClass: "seq",
    blurb: "Fill gaps in a condensed version of part of the passage — prose summary, notes, a table, or a flow-chart. Either lift words or pick from a box of options.",
    steps: [
      { t: "Check whether you <b>lift from the passage</b> or <b>choose from a list</b> — the rules differ.", ex: "A word box means no word limit issue, but more synonym distractors." },
      { t: "Identify which <b>part of the passage</b> the summary covers; it&rsquo;s usually one section.", ex: "Summaries rarely span the whole text." },
      { t: "Predict each gap&rsquo;s <b>word type</b> from the surrounding grammar.", ex: "" },
      { t: "For flow-charts, follow the <b>process order</b>; for tables, read column + row headers as the key.", ex: "" },
      { t: "If using a word box, do the <b>easy gaps first</b> to shrink the option pool.", ex: "" }
    ],
    traps: [
      { n: "Word-box synonyms.", d: "The box packs near-synonyms of the right word to mislead. Match the <b>precise</b> meaning the gap needs, not the general topic.", ex: "Box has &lsquo;rise / surge / shift&rsquo; — only one fits the exact degree the text states." },
      { n: "Leftover-option bias.", d: "There are more box options than gaps. Some are never used — don&rsquo;t force-fit every word.", ex: "" },
      { n: "Summary is paraphrased.", d: "The wording around the gap won&rsquo;t match the passage, so keyword-hunting fails. Track meaning.", ex: "" },
      { n: "Grammar mismatch.", d: "The lifted word must fit the summary&rsquo;s grammar — singular/plural, verb form, article.", ex: "" },
      { n: "Wrong section.", d: "Answers come from the relevant section only; a matching word elsewhere is a decoy.", ex: "" },
      { n: "Order assumption.", d: "Prose summaries usually follow text order; tables and flow-charts may not — locate each cell by its labels.", ex: "" }
    ],
    patterns: [
      { label: "Table: headers are the key", q: "Row &lsquo;Cost&rsquo;, Column &lsquo;2020&rsquo; &rarr; ?", p: "Find where the text states the 2020 cost.", note: "Intersect the two labels to locate the answer." },
      { label: "Flow-chart: process verbs", q: "&lsquo;The mixture is then ______.&rsquo;", p: "Text: &lsquo;next, the solution is heated.&rsquo;", note: "next / then / finally map the steps." },
      { label: "Note-form compression", q: "&lsquo;Decline: caused by ______&rsquo;", p: "Text: &lsquo;the fall was driven by habitat loss.&rsquo;", note: "notes drop grammar; supply the content noun &rarr; habitat loss." },
      { label: "Word box: part of speech", q: "&lsquo;a ______ increase in trade&rsquo;", p: "gap needs an adjective; box mixes nouns/verbs/adjectives.", note: "Form narrows the box before meaning does." }
    ]
  },

  {
    id: "diagram",
    no: "10",
    title: "Diagram Label Completion",
    alias: "Label the figure",
    order: "by diagram",
    orderClass: "scatter",
    blurb: "Label parts of a diagram (a machine, a process, an organism) with words from the passage, within a word limit.",
    steps: [
      { t: "Study the diagram and read the <b>labels already given</b> to orient yourself.", ex: "They anchor you to the right section of text." },
      { t: "Find the passage section that <b>describes the diagram</b> — usually one dense paragraph.", ex: "" },
      { t: "Use <b>spatial / positional language</b> in the text to map words to parts.", ex: "above, beneath, attached to, surrounds, at the base." },
      { t: "Lift the exact words within the <b>word limit</b> and check spelling.", ex: "" }
    ],
    traps: [
      { n: "Position words misread.", d: "Mixing up above/below or inner/outer assigns the right word to the wrong part.", ex: "&lsquo;The valve sits <em>beneath</em> the chamber&rsquo; — label the part below, not above." },
      { n: "Technical-noun distractors.", d: "The paragraph names several parts; only some are labelled. Match the <em>description</em>, not the first noun you see.", ex: "" },
      { n: "Part vs whole.", d: "A label points to one component, not the whole assembly. Make sure your word names the exact piece indicated.", ex: "" },
      { n: "Diagram order &ne; text order.", d: "The passage may describe parts in a different sequence than the diagram&rsquo;s layout. Locate by description, not by reading position.", ex: "" },
      { n: "Word limit &amp; spelling.", d: "Same discipline as sentence completion — exact words, exact spelling, within the cap.", ex: "" }
    ],
    patterns: [
      { label: "Spatial mapping", q: "Label the part &lsquo;at the top&rsquo;.", p: "Text: &lsquo;the uppermost chamber, known as the ______.&rsquo;", note: "uppermost = top of the diagram." },
      { label: "Function describes the part", q: "Label the component that filters water.", p: "Text: &lsquo;the membrane removes impurities.&rsquo;", note: "Match by function &rarr; membrane." },
      { label: "Material / composition", q: "Label what the casing is made of.", p: "Text: &lsquo;a protective shell of hardened keratin.&rsquo;", note: "&lsquo;made of&rsquo; &rarr; the material noun &rarr; keratin." },
      { label: "Connection language", q: "Label the link between two parts.", p: "Text: &lsquo;the rotor is joined to the shaft by a coupling.&rsquo;", note: "joined to / connected via &rarr; the connecting part." }
    ]
  }
];

/* Top-level `const` does not attach to window; expose it explicitly so main.js can read it. */
window.CASES = CASES;
