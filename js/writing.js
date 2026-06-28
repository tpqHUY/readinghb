/* ============================================================
   writing.js — IELTS Academic Writing content.
   WRITING = { criteria, techniques, mistakes, t1[], t2[] }
   WLANG   = language bank groups (items enriched to {w,d,x}).
   Case shape: { id,no,title,alias,meta,blurb, steps[], blueprint[], pitfalls[] }
     steps     -> { t, ex }       (the Approach tab)
     blueprint -> { part, detail } (the Structure tab)
     pitfalls  -> { n, d, ex }     (the Pitfalls tab)
   ============================================================ */

const WRITING = {

  /* -------------------- the four criteria -------------------- */
  criteria: [
    {
      code: "TA / TR", pct: "25% each task",
      name: "Task Achievement / Response",
      intro: "Did you answer the <b>whole</b> task — with a clear position or overview and relevant, developed support?",
      b6: "Addresses the task but may miss a part; Task 1 overview is unclear or absent; Task 2 position wavers and support stays general.",
      b8: "Covers every part fully; Task 1 opens with a clear overview of the key features (accurate data); Task 2 holds one clear position and develops each idea relevantly."
    },
    {
      code: "CC", pct: "25%",
      name: "Coherence & Cohesion",
      intro: "Is it logically organised, with clear paragraphs and <b>natural</b> linking?",
      b6: "Organised overall, but linking is mechanical or occasionally faulty; paragraphing is not always logical; referencing can be unclear.",
      b8: "Logically sequenced with one central idea per paragraph; cohesion is smooth and unobtrusive; reference and substitution (this, such, the latter) used well."
    },
    {
      code: "LR", pct: "25%",
      name: "Lexical Resource",
      intro: "Range, <b>precision</b> and collocation of vocabulary — with few errors.",
      b6: "Adequate range; noticeable errors in word choice, collocation or spelling that do not block meaning.",
      b8: "Wide, precise vocabulary used flexibly; skilful, natural collocation; only rare, minor slips."
    },
    {
      code: "GRA", pct: "25%",
      name: "Grammatical Range & Accuracy",
      intro: "A <b>variety</b> of sentence structures, used accurately.",
      b6: "A mix of simple and complex forms, but complex sentences carry frequent errors; punctuation lapses.",
      b8: "A wide range of structures; the majority of sentences are error-free; punctuation is well controlled."
    }
  ],

  /* -------------------- high-score techniques -------------------- */
  techniques: [
    { name: "Paraphrase the prompt", crit: "TR · LR", ex: "Prompt: &lsquo;children should learn a second language at primary school&rsquo; &rarr; &lsquo;young learners ought to begin a foreign language in their early years&rsquo;.", why: "Open without copying the question word-for-word. It signals lexical range from line one &mdash; but keep the meaning intact; a distorted paraphrase changes the task." },
    { name: "State an overview / thesis early", crit: "TR", ex: "T1: &lsquo;Overall, all four sectors grew, with energy rising the most.&rsquo; T2: &lsquo;This essay argues that the benefits clearly outweigh the drawbacks.&rsquo;", why: "Examiners look for it explicitly. A Task 1 with no overview is capped around band 5; a Task 2 with no clear position loses Task Response." },
    { name: "Lead every paragraph with a topic sentence", crit: "CC", ex: "&lsquo;The most striking change is the shift towards renewable energy.&rsquo;", why: "Makes your plan visible at a glance and forces one idea per paragraph &mdash; the backbone of Coherence." },
    { name: "Develop with Point &rarr; Explain &rarr; Example", crit: "TR", ex: "Point: cars cause congestion. Explain: more vehicles than roads can hold. Example: peak-hour gridlock in major cities.", why: "Band 8 needs ideas that are extended, not listed. Two developed ideas beat five bald assertions." },
    { name: "Vary cohesion beyond Firstly/Secondly", crit: "CC", ex: "Reference back instead of relinking: &lsquo;This trend&hellip;&rsquo;, &lsquo;Such measures&hellip;&rsquo;, &lsquo;The former&hellip;&rsquo;.", why: "A connector on every sentence reads mechanically and lowers Coherence. Natural, embedded cohesion scores higher than signpost-stacking." },
    { name: "Use complex structures with control", crit: "GRA", ex: "Concession: &lsquo;Although wages rose, spending fell.&rsquo; Relative: &lsquo;a policy that targets emissions&rsquo;. Conditional: &lsquo;If trends continue, &hellip;&rsquo;.", why: "Range and accuracy both score. Aim for a mix of simple and complex sentences &mdash; not one long tangled sentence to look advanced." },
    { name: "Describe data precisely (Task 1)", crit: "LR · TA", ex: "Verb + adverb: &lsquo;rose sharply&rsquo;; noun phrase: &lsquo;a sharp rise&rsquo;; approximation: &lsquo;just under a third&rsquo;.", why: "Precise figures and varied trend language carry both accuracy and range in the report." },
    { name: "Hedge claims (Task 2)", crit: "TR · LR", ex: "&lsquo;may&rsquo;, &lsquo;tends to&rsquo;, &lsquo;in many cases&rsquo;, &lsquo;is likely to&rsquo; instead of &lsquo;always&rsquo; / &lsquo;proves&rsquo;.", why: "Academic writing avoids absolutes. Measured claims read as more precise and are easier to defend." },
    { name: "Nominalise to sound academic", crit: "LR · GRA", ex: "&lsquo;The government decided to invest, and this helped the economy grow&rsquo; &rarr; &lsquo;The government&rsquo;s decision to invest fuelled economic growth.&rsquo;", why: "Turning verbs and clauses into noun phrases (decide &rarr; decision, grow &rarr; growth) is the single most academic move in English. It tightens sentences and lifts both Lexis and Grammar." },
    { name: "Reference back instead of repeating", crit: "CC", ex: "&lsquo;This shift&rsquo;, &lsquo;such measures&rsquo;, &lsquo;the former / the latter&rsquo;, &lsquo;doing so&rsquo; &mdash; to point at an earlier idea without naming it again.", why: "Pronouns and substitution are cohesion the examiner can&rsquo;t see joining the dots &mdash; the smoothest kind. Repeating the same noun phrase reads as a band-6 habit." },
    { name: "Concede, then refute", crit: "TR", ex: "&lsquo;Admittedly, stricter laws may limit freedom; nevertheless, the gain in public safety outweighs this cost.&rsquo;", why: "Acknowledging the other side before knocking it down shows a mature, balanced argument &mdash; and keeps your own position dominant. A one-sided essay reads as naive." },
    { name: "Front your sentences differently", crit: "GRA · CC", ex: "Adverbial: &lsquo;In recent decades, &hellip;&rsquo; Participle: &lsquo;Faced with rising costs, firms &hellip;&rsquo; Prepositional: &lsquo;Despite the risks, &hellip;&rsquo;", why: "Starting every sentence with the subject is monotonous. Varying the opening proves grammatical range and improves flow &mdash; just keep the comma and the structure accurate." },
    { name: "Make examples specific", crit: "TR", ex: "Vague: &lsquo;Some countries have done this.&rsquo; Specific: &lsquo;Countries such as Sweden have cut emissions by taxing carbon heavily.&rsquo;", why: "A concrete, plausible example develops an idea far more than another general sentence. You don&rsquo;t need real statistics &mdash; you need a believable, relevant instance." },
    { name: "Plan before you write", crit: "TR · CC", ex: "2 min: decide your position, pick two ideas, jot a one-line example for each, then write.", why: "An unplanned essay drifts off-topic and repeats itself &mdash; the two costliest coherence faults. Thirty seconds choosing your two ideas saves the whole essay." }
  ],

  /* -------------------- common mistakes -------------------- */
  mistakes: [
    { n: "No overview (Task 1).", d: "Skipping the overview caps Task 1 at band 5&ndash;6. Always state the 2&ndash;4 biggest features in one sentence.", ex: "Begin the overview with &lsquo;Overall&rsquo; or &lsquo;In general&rsquo; &mdash; and put <em>no specific numbers</em> in it." },
    { n: "Reporting every data point.", d: "Listing each figure with no grouping or trend kills Coherence. Select, group, and compare &mdash; you can&rsquo;t report everything.", ex: "" },
    { n: "Opinion or reasons in Task 1.", d: "Task 1 is purely factual. Don&rsquo;t explain <em>why</em> a trend happened or give your view &mdash; it is off-task.", ex: "" },
    { n: "Memorised templates.", d: "Examiners detect and discount memorised filler (&lsquo;In this day and age&hellip;&rsquo;). It lowers your Task Response score.", ex: "" },
    { n: "No clear position (Task 2).", d: "Sitting on the fence, or shifting your stance, loses Task Response. State your position in the intro and hold it to the end.", ex: "" },
    { n: "Not answering the exact question.", d: "Answering a similar-but-different question, or ignoring one half of a two-part prompt, is the costliest error of all.", ex: "&lsquo;Do advantages outweigh disadvantages?&rsquo; needs a verdict, not just a list of each." },
    { n: "Listing instead of developing.", d: "Many undeveloped points score worse than two well-explained ones. Depth beats breadth in Task 2.", ex: "" },
    { n: "Overusing linkers.", d: "Moreover / Furthermore / In addition on every sentence reads mechanically and lowers Coherence. Link ideas, not every line.", ex: "" },
    { n: "Informal tone.", d: "Avoid contractions (don&rsquo;t, can&rsquo;t), slang, and addressing the reader as &lsquo;you&rsquo;. Keep a neutral, academic register.", ex: "" },
    { n: "Under- or over-length.", d: "Below 150 (T1) / 250 (T2) words is penalised; padding with repetition hurts too. Develop, don&rsquo;t pad.", ex: "" }
  ],

  /* -------------------- power structures (sentence frames) -------------------- */
  structures: [
    { name: "Concession (complex)", tag: "t2", frame: "Although / While + [opposing point], + [your stronger point].", ex: ["Although renewable energy is costly to set up, it pays for itself within a decade.", "While critics highlight the risks, the long-term gains are hard to ignore."], use: "The cleanest way to handle the other side of an argument in one accurate sentence. A staple of band-7+ Task 2 writing." },
    { name: "Cause &amp; effect chain", tag: "t2", frame: "[Cause], which / and this + [effect]; as a result, + [consequence].", ex: ["Cities keep expanding, which puts pressure on housing; as a result, prices soar.", "Automation removes routine jobs, and this forces workers to retrain."], use: "Shows you can trace a logical chain &mdash; essential for problem/solution and cause essays." },
    { name: "Nominalised subject", tag: "both", frame: "The + [noun phrase] + [verb] + [object].", ex: ["The introduction of the policy reduced unemployment sharply.", "A sharp rise in fuel prices triggered a fall in car ownership."], use: "Compresses a whole clause into a noun phrase &mdash; the most academic structure in English. Works for both the report and the essay." },
    { name: "Conditional argument", tag: "t2", frame: "If + [present], + [future] .  /  Unless + [present], + [future].", ex: ["If governments fail to act, the problem will only worsen.", "Unless emissions are cut, sea levels will continue to rise."], use: "Projects a consequence to justify a recommendation &mdash; ideal for conclusions and solutions." },
    { name: "Comparative emphasis", tag: "both", frame: "[A] is far / considerably more + [adj] than [B].", ex: ["Investing in prevention is far more effective than treating illness later.", "The first option is considerably cheaper than the alternatives."], use: "A precise way to weigh two things in Task 2, or compare data in Task 1, with an intensifier for force." },
    { name: "Fronted adverbial", tag: "both", frame: "In + [period] / Over + [time], + [subject] + [verb].", ex: ["Over the following decade, car ownership more than doubled.", "In stark contrast, rural areas saw a steady decline."], use: "Varies sentence openings and proves grammatical range &mdash; especially useful for sequencing data in Task 1." },
    { name: "Relative clause to define", tag: "both", frame: "[Noun], which / that + [extra information], + [verb].", ex: ["The scheme, which targets low-income families, has proved popular.", "Policies that ignore the root cause rarely succeed."], use: "Adds detail and complexity without a new sentence. Use defining clauses to narrow, non-defining to add an aside." },
    { name: "Cleft for emphasis", tag: "t2", frame: "It is + [X] that + [verb] .  /  What + [clause] is + [X].", ex: ["It is education, rather than punishment, that reduces crime in the long run.", "What many people overlook is the cost to the environment."], use: "Spotlights the key idea of a paragraph. Use sparingly &mdash; one cleft per essay is striking; three is a tic." }
  ],

  /* -------------------- practice routine (how to train) -------------------- */
  practice: [
    { tag: "Per essay", name: "Plan, then write to time", how: "Always practise under the real clock &mdash; 20 minutes Task 1, 40 minutes Task 2, including planning.", steps: ["Spend 3&ndash;5 minutes choosing a position and two ideas with one example each.", "Write straight through without stopping to perfect sentences.", "Leave 2 minutes at the end to check articles, tenses and word count."], ex: ["A timed essay teaches pacing far better than an unlimited one.", "Planning kills the two biggest faults: drifting off-topic and repeating yourself."] },
    { tag: "After writing", name: "Self-correct against the four criteria", how: "Mark your own work like an examiner before you ever look at a model answer.", steps: ["Read once for Task Response: did you answer the <em>whole</em> question and hold a position?", "Read again for Coherence: one idea per paragraph, clear linking?", "Underline weak vocabulary and every grammar slip; rewrite three sentences better."], ex: ["Highlight every &lsquo;Firstly / Moreover&rsquo; &mdash; if they&rsquo;re on every line, vary them.", "Circle vague words (&lsquo;good&rsquo;, &lsquo;a lot&rsquo;) and upgrade each one."] },
    { tag: "Weekly", name: "Reverse-engineer a model", how: "Take a band-9 sample and study <em>how</em> it works, not just what it says.", steps: ["Label each paragraph&rsquo;s job (overview, body 1, &hellip;).", "Highlight the cohesive devices and complex structures it uses.", "Steal the structures &mdash; not the content &mdash; and reuse them on a new prompt."], ex: ["Notice how the model paraphrases the prompt without distorting it.", "Copy its concession-then-refute move into your next essay."] },
    { tag: "Daily · 10 min", name: "Paraphrase drill", how: "Train the skill that opens every essay: re-saying a prompt without copying it.", steps: ["Take any Task 2 statement.", "Rewrite it three ways, changing the word class and synonyms but not the meaning.", "Check you haven&rsquo;t accidentally narrowed or changed the claim."], ex: ["&lsquo;Children should learn a second language early&rsquo; &rarr; &lsquo;Young learners ought to start a foreign language in their early years.&rsquo;"] },
    { tag: "Daily · 10 min", name: "Sentence-upgrade reps", how: "Take a plain sentence and rebuild it using one target structure from the bank above.", steps: ["Write a simple version of an idea.", "Rewrite it as a nominalised, conditional, or concession sentence.", "Keep the version that is both accurate and natural &mdash; not just longer."], ex: ["&lsquo;Cars cause pollution and this is bad&rsquo; &rarr; &lsquo;The rise in car use has worsened urban air quality.&rsquo;"] },
    { tag: "Ongoing", name: "Build topic idea banks", how: "Collect arguments, examples and collocations by theme so you never stall for ideas.", steps: ["Pick a common Task 2 theme (technology, environment, education, crime).", "Note two arguments for and two against, with a concrete example for each.", "Drill the matching phrases in the Language bank below as flashcards."], ex: ["Environment &rarr; &lsquo;carbon footprint&rsquo;, &lsquo;renewable sources&rsquo;, &lsquo;a throwaway culture&rsquo;.", "Education &rarr; &lsquo;a well-rounded education&rsquo;, &lsquo;vocational training&rsquo;."] },
    { tag: "Weekly", name: "Error log", how: "Keep a running list of your repeat mistakes and review it before each practice essay.", steps: ["After marking, write each recurring error and its fix in one line.", "Re-read the log before you write next time.", "Retire an error once it hasn&rsquo;t appeared for three essays."], ex: ["&lsquo;Missing article before singular nouns&rsquo; &rarr; check every &lsquo;the/a&rsquo;.", "&lsquo;Comma splice&rsquo; &rarr; split into two sentences or add a linker."] }
  ],

  /* ==================== TASK 1 ==================== */
  t1: [
    {
      id: "line", no: "T1·1", title: "Line graph", alias: "trends over time", meta: "data over time",
      blurb: "One or more lines tracking values across time. The examiner wants trends and turning points, grouped &mdash; not a reading of every year.",
      steps: [
        { t: "Read the <b>axes, units and time frame</b> before anything else.", ex: "Note what is measured (%, millions) and the start/end dates." },
        { t: "Find the <b>overall movement</b> of each line and the biggest changes.", ex: "Rising? Falling? A peak or trough? Which line is highest/lowest overall?" },
        { t: "<b>Group</b> lines that behave alike for the body paragraphs.", ex: "e.g. two that rise vs two that fall." },
        { t: "Select <b>turning points and extremes</b> to support with data; ignore the rest.", ex: "" }
      ],
      blueprint: [
        { part: "Introduction", detail: "<b>Paraphrase</b> the graph description: what it shows, the units, and the period covered. One sentence." },
        { part: "Overview", detail: "State the <b>2&ndash;4 biggest features</b> (overall trend, highest/lowest, largest change). <b>No specific numbers.</b>" },
        { part: "Body 1", detail: "Describe the first group of lines in detail, with <b>key figures and dates</b> (peaks, troughs, crossovers)." },
        { part: "Body 2", detail: "Describe the remaining line(s) / the contrasting group, again with supporting data." }
      ],
      pitfalls: [
        { n: "Year-by-year narration.", d: "Don&rsquo;t describe every point on the line. Report the trend and only the figures that matter (start, end, peak, turning point).", ex: "" },
        { n: "Wrong tense.", d: "Match tense to the time frame: past for past dates, present/future for projections (&lsquo;is expected to&rsquo;).", ex: "" },
        { n: "Overview buried or missing.", d: "Put the overview right after the intro, and keep numbers out of it.", ex: "" },
        { n: "No grouping.", d: "Describing all four lines separately wastes words and loses coherence. Group by behaviour.", ex: "" }
      ]
    },
    {
      id: "bar", no: "T1·2", title: "Bar / column chart", alias: "comparison", meta: "compare categories",
      blurb: "Bars compare categories (and sometimes change over time). The skill is comparison: highest, lowest, and the notable gaps.",
      steps: [
        { t: "Decide whether bars show <b>categories</b>, <b>change over time</b>, or both.", ex: "Grouped bars over years = both &rarr; describe trend AND comparison." },
        { t: "Spot the <b>highest and lowest</b> and the <b>biggest gaps</b>.", ex: "" },
        { t: "<b>Group</b> categories that pattern together for the body.", ex: "" },
        { t: "Pick a few precise figures to anchor each comparison.", ex: "" }
      ],
      blueprint: [
        { part: "Introduction", detail: "Paraphrase what the chart compares, the units and (if any) the time frame." },
        { part: "Overview", detail: "Name the <b>largest and smallest</b> categories and any overall pattern. No detailed numbers." },
        { part: "Body 1", detail: "Compare the leading group of categories with supporting figures and comparative language." },
        { part: "Body 2", detail: "Compare the remaining categories / the smaller group, with data." }
      ],
      pitfalls: [
        { n: "Listing without comparing.", d: "Bars exist to be compared. Use comparatives (higher than, twice as many as, the least), not a flat list of values.", ex: "" },
        { n: "Missing the time dimension.", d: "If bars span years, you must report change over time as well as category comparison.", ex: "" },
        { n: "Repeating the same comparison.", d: "Vary the structures: &lsquo;A is higher than B&rsquo;, &lsquo;B is followed by C&rsquo;, &lsquo;the gap between&hellip;&rsquo;.", ex: "" }
      ]
    },
    {
      id: "pie", no: "T1·3", title: "Pie chart(s)", alias: "proportions", meta: "compare proportions",
      blurb: "Pies show proportions of a whole. With two or more pies, the task is usually how those proportions change.",
      steps: [
        { t: "Read what the whole represents and the <b>units</b> (always check % vs raw).", ex: "" },
        { t: "Rank the segments: <b>largest to smallest</b>.", ex: "" },
        { t: "With multiple pies, find the segments that <b>change most</b> between them.", ex: "" },
        { t: "Use proportion language to plan comparisons.", ex: "a third, a quarter, the majority, a small fraction." }
      ],
      blueprint: [
        { part: "Introduction", detail: "Paraphrase what each pie represents and the basis (proportion of what, when)." },
        { part: "Overview", detail: "State the <b>dominant segment(s)</b> and, across pies, the <b>biggest shift</b>. No exact figures." },
        { part: "Body 1", detail: "Describe the largest segments (and their change) with proportions." },
        { part: "Body 2", detail: "Describe the smaller segments / remaining changes." }
      ],
      pitfalls: [
        { n: "Confusing % with amounts.", d: "A bigger slice is a bigger <em>proportion</em>, not necessarily a bigger amount unless totals are given.", ex: "" },
        { n: "Describing pies in isolation.", d: "With two pies, the marks are in the <em>comparison</em> &mdash; what grew, what shrank.", ex: "" },
        { n: "Repeating &lsquo;percent&rsquo; every time.", d: "Vary with proportion phrases: a fifth, nearly half, the largest share.", ex: "" }
      ]
    },
    {
      id: "table", no: "T1·4", title: "Table", alias: "raw figures", meta: "select & group",
      blurb: "Tables hand you raw numbers with no shape. Your job is to impose one: select the extremes and group, rather than transcribe cells.",
      steps: [
        { t: "Scan rows and columns for the <b>highest, lowest and biggest changes</b>.", ex: "" },
        { t: "Decide the clearest <b>grouping</b> &mdash; usually by row or by column.", ex: "" },
        { t: "Select only the figures that reveal a pattern.", ex: "A table can have 30 numbers; you report maybe 8." },
        { t: "Plan comparisons across the chosen groups.", ex: "" }
      ],
      blueprint: [
        { part: "Introduction", detail: "Paraphrase what the table shows, the categories and the units/time." },
        { part: "Overview", detail: "Name the overall highest/lowest and the clearest pattern across the table. No long number lists." },
        { part: "Body 1", detail: "Describe one group (e.g. the top category across years) with figures." },
        { part: "Body 2", detail: "Describe the contrasting group with figures." }
      ],
      pitfalls: [
        { n: "Transcribing the table.", d: "Repeating every cell in prose is the classic table trap. Select and group; leave most numbers out.", ex: "" },
        { n: "No pattern imposed.", d: "Tables have no built-in trend &mdash; you must find and state one in the overview.", ex: "" },
        { n: "Inconsistent units.", d: "Check each column&rsquo;s unit; mixing them produces inaccurate comparisons.", ex: "" }
      ]
    },
    {
      id: "process", no: "T1·5", title: "Process diagram", alias: "how something works", meta: "stages in sequence",
      blurb: "A sequence of stages (natural or manufactured). It is described in the present passive, in order &mdash; not as data.",
      steps: [
        { t: "Count the <b>stages</b> and find the start and end (or whether it is a <b>cycle</b>).", ex: "" },
        { t: "Note whether the process is <b>natural or man-made</b>, linear or cyclical.", ex: "" },
        { t: "Plan to use the <b>present passive</b> and clear sequencers.", ex: "is collected, is then heated, is finally packaged." },
        { t: "Group the stages into two halves for the body paragraphs.", ex: "" }
      ],
      blueprint: [
        { part: "Introduction", detail: "Paraphrase what the process shows and (in a clause) how many stages it has." },
        { part: "Overview", detail: "State the <b>number of stages</b> and where it <b>begins and ends</b> (or that it is a continuous cycle). No data." },
        { part: "Body 1", detail: "Describe the first half of the stages <b>in order</b>, present passive + sequencers." },
        { part: "Body 2", detail: "Describe the remaining stages through to the end." }
      ],
      pitfalls: [
        { n: "Past tense.", d: "Processes are timeless: use the <b>present passive</b> (&lsquo;the beans are roasted&rsquo;), not the past.", ex: "" },
        { n: "Inventing data or reasons.", d: "There are no figures and no &lsquo;why&rsquo;. Just describe what happens, in sequence.", ex: "" },
        { n: "Weak sequencing.", d: "Vary the order markers: after this, once X is complete, at the final stage &mdash; not &lsquo;then&hellip; then&hellip; then&rsquo;.", ex: "" }
      ]
    },
    {
      id: "map", no: "T1·6", title: "Map", alias: "changes over time", meta: "describe change",
      blurb: "Usually two maps of the same place at different times. The marks are in the changes: what was added, removed, or replaced.",
      steps: [
        { t: "Compare the two maps and list <b>what changed</b> (added, removed, replaced, expanded).", ex: "" },
        { t: "Note what <b>stayed the same</b> &mdash; worth a mention.", ex: "" },
        { t: "Plan <b>location language</b> and the right tense.", ex: "to the north of, adjacent to, on the outskirts; past or present perfect." },
        { t: "Group changes by area (e.g. north vs south) for the body.", ex: "" }
      ],
      blueprint: [
        { part: "Introduction", detail: "Paraphrase what the maps show and the two dates." },
        { part: "Overview", detail: "State the <b>overall transformation</b> (e.g. from rural to residential) and the biggest changes. No detail." },
        { part: "Body 1", detail: "Describe changes in one area with location language and change verbs." },
        { part: "Body 2", detail: "Describe changes in the remaining area / what was preserved." }
      ],
      pitfalls: [
        { n: "Wrong tense for change.", d: "Use the <b>past</b> or <b>present perfect</b> passive: &lsquo;was replaced by&rsquo;, &lsquo;has been converted into&rsquo;.", ex: "" },
        { n: "No compass / location language.", d: "Anchor every change in space: in the north-east, beside the river, where the woods once stood.", ex: "" },
        { n: "Listing both maps separately.", d: "Describe the <em>change</em> from one to the other, not each map on its own.", ex: "" }
      ]
    }
  ],

  /* ==================== TASK 2 ==================== */
  t2: [
    {
      id: "opinion", no: "T2·1", title: "Opinion (agree / disagree)", alias: "to what extent do you agree?", meta: "take one position",
      blurb: "You are asked how far you agree with a statement. Decide your position and defend it consistently &mdash; the whole essay backs one side.",
      steps: [
        { t: "Decide your <b>degree</b>: fully agree, mostly, or disagree. State it as your thesis.", ex: "Avoid &lsquo;partly agree&rsquo; unless you can structure it clearly." },
        { t: "Generate <b>two distinct reasons</b> for your side.", ex: "" },
        { t: "Plan one reason per body paragraph, each with an example.", ex: "" },
        { t: "Keep the same position from intro to conclusion.", ex: "" }
      ],
      blueprint: [
        { part: "Introduction", detail: "Paraphrase the statement, then give your <b>thesis</b> (your position) and a one-line outline." },
        { part: "Body 1", detail: "First reason &mdash; topic sentence, <b>explain</b>, then a specific <b>example</b>." },
        { part: "Body 2", detail: "Second reason &mdash; developed the same way. (Or concede the other side, then refute it.)" },
        { part: "Conclusion", detail: "Restate your position and summarise the two reasons. <b>No new ideas.</b>" }
      ],
      pitfalls: [
        { n: "Hidden position.", d: "If the reader can&rsquo;t state your view after the intro, you lose Task Response. Make the thesis explicit.", ex: "" },
        { n: "Arguing both sides equally.", d: "This is not a discussion essay. Spend the essay supporting <em>your</em> side (a brief concession is fine).", ex: "" },
        { n: "Drifting position.", d: "Don&rsquo;t agree in body 1 and disagree in body 2. Consistency is marked.", ex: "" }
      ]
    },
    {
      id: "discussion", no: "T2·2", title: "Discuss both views + opinion", alias: "discuss both views and give your own", meta: "two views + your view",
      blurb: "You must present both sides fairly AND give your own opinion. The most common slip is forgetting your own view.",
      steps: [
        { t: "Identify the <b>two views</b> in the prompt.", ex: "" },
        { t: "Decide <b>your own opinion</b> &mdash; state it in the intro and conclusion.", ex: "" },
        { t: "Give each view its own paragraph, explained <b>fairly</b> with an example.", ex: "" },
        { t: "Make the view you agree with the stronger / fuller one.", ex: "" }
      ],
      blueprint: [
        { part: "Introduction", detail: "Paraphrase both views, then state <b>your own opinion</b>." },
        { part: "Body 1", detail: "View one &mdash; explain it fairly with reasons and an example (even if you disagree)." },
        { part: "Body 2", detail: "View two &mdash; explain it; make clear which side <b>you</b> favour and why." },
        { part: "Conclusion", detail: "Summarise both views and <b>restate your opinion</b> clearly." }
      ],
      pitfalls: [
        { n: "No personal opinion.", d: "&lsquo;Give your own opinion&rsquo; is part of the task. Omitting it caps Task Response &mdash; state it in intro and conclusion.", ex: "" },
        { n: "One view ignored.", d: "Both views must be discussed properly. A token sentence for one side is not enough.", ex: "" },
        { n: "Opinion contradicts the bodies.", d: "Your stated view should match the side you argued more strongly.", ex: "" }
      ]
    },
    {
      id: "advdis", no: "T2·3", title: "Advantages & disadvantages", alias: "do the advantages outweigh?", meta: "weigh both, then judge",
      blurb: "Lay out advantages and disadvantages. If asked whether advantages outweigh, you must deliver a clear verdict.",
      steps: [
        { t: "Check the exact question: <b>list both</b>, or judge whether one <b>outweighs</b>?", ex: "If &lsquo;outweigh&rsquo;, your thesis must answer it." },
        { t: "Plan the strongest advantage(s) and disadvantage(s).", ex: "" },
        { t: "If judging, decide your verdict and weight the essay towards it.", ex: "" },
        { t: "Develop each point, don&rsquo;t just name it.", ex: "" }
      ],
      blueprint: [
        { part: "Introduction", detail: "Paraphrase the topic; if asked to judge, state your <b>verdict</b> (which side outweighs)." },
        { part: "Body 1", detail: "The main advantage(s) &mdash; explained with an example." },
        { part: "Body 2", detail: "The main disadvantage(s) &mdash; explained with an example." },
        { part: "Conclusion", detail: "Restate the verdict (or summarise the balance). No new points." }
      ],
      pitfalls: [
        { n: "No verdict.", d: "If the prompt says &lsquo;do the advantages outweigh the disadvantages?&rsquo;, a balanced list with no answer loses Task Response.", ex: "" },
        { n: "Equal weight when judging.", d: "If you judge advantages win, give them the stronger, fuller treatment.", ex: "" },
        { n: "Naming without developing.", d: "&lsquo;It is cheaper and faster and easier&rsquo; is a list. Pick fewer points and explain them.", ex: "" }
      ]
    },
    {
      id: "probsol", no: "T2·4", title: "Problem / cause &amp; solution", alias: "causes and solutions", meta: "match solutions to causes",
      blurb: "Identify causes (or problems) and propose realistic solutions. The key is that each solution clearly answers a stated cause.",
      steps: [
        { t: "Separate what the prompt asks: <b>causes</b>, <b>problems</b>, <b>solutions</b>, or a mix.", ex: "&lsquo;causes and solutions&rsquo; = one paragraph each." },
        { t: "Choose <b>one or two clear causes</b> you can explain.", ex: "" },
        { t: "Propose a <b>matching solution</b> for each cause.", ex: "Solution should directly address that cause." },
        { t: "Make solutions realistic and explained, not vague slogans.", ex: "" }
      ],
      blueprint: [
        { part: "Introduction", detail: "Paraphrase the problem and outline that you will give its causes and solutions." },
        { part: "Body 1", detail: "Main cause(s) / problem(s) &mdash; explained with an example." },
        { part: "Body 2", detail: "Solution(s) that <b>directly address</b> those causes, explained with how they help." },
        { part: "Conclusion", detail: "Summarise the link between cause and solution. No new ideas." }
      ],
      pitfalls: [
        { n: "Solutions don&rsquo;t match causes.", d: "If you name a cause in body 1, your solution in body 2 must target <em>that</em> cause, not a different one.", ex: "" },
        { n: "Vague solutions.", d: "&lsquo;The government should do something&rsquo; scores nothing. Say what, and how it works.", ex: "" },
        { n: "Confusing causes with problems.", d: "Read carefully: a cause is <em>why</em>; a problem is the harmful <em>effect</em>. Answer what is asked.", ex: "" }
      ]
    },
    {
      id: "twopart", no: "T2·5", title: "Two-part question", alias: "direct questions", meta: "answer both questions",
      blurb: "The prompt asks two direct questions. You must answer <b>both</b> &mdash; usually one per body paragraph.",
      steps: [
        { t: "Underline the <b>two distinct questions</b>.", ex: "Often: &lsquo;Why is this? + What can be done?&rsquo; or &lsquo;cause? + is it positive?&rsquo;" },
        { t: "Plan a direct answer to each.", ex: "" },
        { t: "Give each question its own body paragraph.", ex: "" },
        { t: "Develop each answer with a reason and example.", ex: "" }
      ],
      blueprint: [
        { part: "Introduction", detail: "Paraphrase the topic and signal that you will answer <b>both</b> questions." },
        { part: "Body 1", detail: "Answer the first question &mdash; explained with an example." },
        { part: "Body 2", detail: "Answer the second question &mdash; developed fully." },
        { part: "Conclusion", detail: "Summarise both answers. No new ideas." }
      ],
      pitfalls: [
        { n: "Answering only one part.", d: "Both questions carry marks. Missing one is a heavy Task Response penalty.", ex: "" },
        { n: "No clear answer.", d: "Describing the topic is not answering the question. Give a direct response to each.", ex: "" },
        { n: "Unbalanced parts.", d: "Don&rsquo;t spend three paragraphs on question one and a line on question two.", ex: "" }
      ]
    },
    {
      id: "posneg", no: "T2·6", title: "Positive or negative development", alias: "is this a positive or negative trend?", meta: "evaluate, don't describe",
      blurb: "You must evaluate a trend as positive, negative (or mixed) and justify it &mdash; not merely describe the trend.",
      steps: [
        { t: "Decide your evaluation: positive, negative, or balanced &mdash; state it as your thesis.", ex: "" },
        { t: "Find <b>reasons</b> that justify your judgement.", ex: "" },
        { t: "Plan one reason per body paragraph with an example.", ex: "" },
        { t: "Keep evaluating, not describing, throughout.", ex: "" }
      ],
      blueprint: [
        { part: "Introduction", detail: "Paraphrase the trend and state your <b>evaluation</b> (positive / negative / mixed)." },
        { part: "Body 1", detail: "First reason for your judgement &mdash; explained with an example." },
        { part: "Body 2", detail: "Second reason &mdash; developed. (Or one upside and one downside if &lsquo;mixed&rsquo;.)" },
        { part: "Conclusion", detail: "Restate your evaluation and the main reasons." }
      ],
      pitfalls: [
        { n: "Describing instead of judging.", d: "Explaining what the trend <em>is</em> answers the wrong task. You must say whether it is good or bad, and why.", ex: "" },
        { n: "No stance.", d: "&lsquo;It has positives and negatives&rsquo; with no overall judgement weakens Task Response. Commit to a position.", ex: "" },
        { n: "Unsupported value words.", d: "&lsquo;This is terrible&rsquo; needs a reason and example, not just a label.", ex: "" }
      ]
    }
  ]
};

/* ==================== LANGUAGE BANK ====================
   tag: t1 (report) | t2 (essay) | both
   items enriched to { w, d, x } by the build step. */
const WLANG = [
 {
  "g": "Upward trend",
  "sense": "describe a rise (Task 1)",
  "tag": "t1",
  "items": [
   {
    "w": "increase",
    "d": "neutral verb for any rise; the safest all-purpose choice",
    "x": "The number of visitors increased from 2 million to 5 million over the decade."
   },
   {
    "w": "rise",
    "d": "common neutral synonym for increase; works as verb or noun",
    "x": "Sales rose steadily throughout the first half of the year."
   },
   {
    "w": "grow",
    "d": "use for gradual expansion, especially populations or economies",
    "x": "The urban population grew significantly between 2000 and 2020."
   },
   {
    "w": "climb",
    "d": "for a gradual, continuous rise; slightly more vivid than 'rise'",
    "x": "Average temperatures climbed slowly across the period shown."
   },
   {
    "w": "surge",
    "d": "for a sudden, large rise; stronger than 'increase'",
    "x": "Demand for electric cars surged after 2015."
   },
   {
    "w": "soar",
    "d": "for a very steep rise; stronger than 'increase'",
    "x": "House prices soared dramatically in the final five years."
   },
   {
    "w": "rocket",
    "d": "for an extremely rapid, dramatic rise; informal but vivid",
    "x": "Internet usage rocketed from 10 to 80 percent within a decade."
   },
   {
    "w": "go up",
    "d": "informal phrasal verb; avoid overuse in formal Task 1 writing",
    "x": "Prices went up sharply during the period."
   },
   {
    "w": "an upward trend",
    "d": "noun phrase to summarise an overall rising pattern",
    "x": "Overall, the data shows an upward trend in renewable energy use."
   },
   {
    "w": "reach a peak",
    "d": "for the highest point before a figure falls or levels off",
    "x": "Visitor numbers reached a peak of 5 million in 2010."
   },
   {
    "w": "peak at",
    "d": "use with the exact figure of the highest point",
    "x": "Sales peaked at 80,000 units before declining."
   },
   {
    "w": "hit a high",
    "d": "informal way to mark a maximum value; pair with a figure",
    "x": "Unemployment hit a high of 12 percent in 2009."
   }
  ]
 },
 {
  "g": "Downward trend",
  "sense": "describe a fall (Task 1)",
  "tag": "t1",
  "items": [
   {
    "w": "decrease",
    "d": "neutral verb for any fall; the safest all-purpose choice",
    "x": "The number of farms decreased from 500 to 200 over the period."
   },
   {
    "w": "fall",
    "d": "common neutral synonym for decrease; works as verb or noun",
    "x": "Birth rates fell steadily after 1990."
   },
   {
    "w": "decline",
    "d": "slightly formal; good for gradual, sustained falls",
    "x": "Manufacturing output declined gradually throughout the decade."
   },
   {
    "w": "drop",
    "d": "for a clear, often sudden fall; works as verb or noun",
    "x": "Car sales dropped sharply during the recession."
   },
   {
    "w": "plummet",
    "d": "for a very steep, sudden fall; stronger than 'decrease'",
    "x": "Share prices plummeted in the final quarter."
   },
   {
    "w": "plunge",
    "d": "for a dramatic, rapid fall; similar to 'plummet'",
    "x": "Tourist numbers plunged after the new tax was introduced."
   },
   {
    "w": "dip",
    "d": "for a small, often temporary fall before recovery",
    "x": "Sales dipped slightly in March before rising again."
   },
   {
    "w": "go down",
    "d": "informal phrasal verb; avoid overuse in formal Task 1 writing",
    "x": "Prices went down a little towards the end of the year."
   },
   {
    "w": "a downward trend",
    "d": "noun phrase to summarise an overall falling pattern",
    "x": "The chart reveals a clear downward trend in coal consumption."
   },
   {
    "w": "hit a low",
    "d": "informal way to mark a minimum value; pair with a figure",
    "x": "Production hit a low of 5,000 units in 2008."
   },
   {
    "w": "bottom out",
    "d": "for reaching the lowest point before recovering",
    "x": "Prices bottomed out in 2012 and then began to recover."
   },
   {
    "w": "fall to a low of",
    "d": "use with the exact figure of the lowest point",
    "x": "The figure fell to a low of 2 percent in 2015."
   }
  ]
 },
 {
  "g": "Stability & fluctuation",
  "sense": "no change or up-and-down (Task 1)",
  "tag": "t1",
  "items": [
   {
    "w": "remain stable",
    "d": "for figures that stay broadly the same over time",
    "x": "Inflation remained stable at around 2 percent throughout the period."
   },
   {
    "w": "level off",
    "d": "for a figure that stops rising or falling and flattens",
    "x": "After rising sharply, prices levelled off in 2010."
   },
   {
    "w": "plateau",
    "d": "verb or noun for a flat phase after change; formal",
    "x": "Sales plateaued at 50,000 units for three years."
   },
   {
    "w": "stay constant",
    "d": "for values that do not change at all",
    "x": "The percentage of rural workers stayed constant over the decade."
   },
   {
    "w": "remain unchanged",
    "d": "formal way to say a figure did not move",
    "x": "The proportion of women in the workforce remained unchanged."
   },
   {
    "w": "hold steady",
    "d": "for a figure that stays level despite expectations of change",
    "x": "Oil prices held steady at 60 dollars per barrel."
   },
   {
    "w": "fluctuate",
    "d": "for figures that rise and fall irregularly over time",
    "x": "Tourist numbers fluctuated between 2 and 4 million each year."
   },
   {
    "w": "show fluctuation",
    "d": "noun phrase to summarise an irregular up-and-down pattern",
    "x": "The graph shows considerable fluctuation in monthly rainfall."
   },
   {
    "w": "even out",
    "d": "for differences that become smaller and more equal over time",
    "x": "By 2020, the gap between the two regions had evened out."
   }
  ]
 },
 {
  "g": "Degree & speed of change",
  "sense": "how big or fast a change is (Task 1)",
  "tag": "t1",
  "items": [
   {
    "w": "sharply",
    "d": "adverb for a large, sudden change; pair with rise or fall",
    "x": "Unemployment rose sharply between 2008 and 2009."
   },
   {
    "w": "dramatically",
    "d": "adverb for a very large, striking change",
    "x": "Car ownership increased dramatically over the twenty-year period."
   },
   {
    "w": "rapidly",
    "d": "adverb stressing speed rather than size of change",
    "x": "The population grew rapidly during the early 2000s."
   },
   {
    "w": "steadily",
    "d": "adverb for a constant, even change without sudden jumps",
    "x": "Income levels rose steadily throughout the decade."
   },
   {
    "w": "gradually",
    "d": "adverb for a slow, continuous change",
    "x": "The temperature gradually increased over the summer months."
   },
   {
    "w": "slightly",
    "d": "adverb for a very small change; pair with rise or fall",
    "x": "Sales fell slightly in the final quarter."
   },
   {
    "w": "marginally",
    "d": "adverb for a tiny, almost negligible change; formal",
    "x": "Prices rose only marginally compared with the previous year."
   },
   {
    "w": "a sharp rise",
    "d": "noun phrase for a large, sudden increase",
    "x": "There was a sharp rise in fuel costs after 2010."
   },
   {
    "w": "a steady increase",
    "d": "noun phrase for a constant, even rise over time",
    "x": "The data shows a steady increase in life expectancy."
   },
   {
    "w": "a slight dip",
    "d": "noun phrase for a small, often temporary fall",
    "x": "There was a slight dip in attendance in winter."
   },
   {
    "w": "a dramatic fall",
    "d": "noun phrase for a very large, striking decrease",
    "x": "The chart records a dramatic fall in newspaper sales."
   }
  ]
 },
 {
  "g": "Approximating figures",
  "sense": "round or hedge a number (Task 1)",
  "tag": "t1",
  "items": [
   {
    "w": "approximately",
    "d": "formal hedge before a rounded figure; very common in Task 1",
    "x": "Approximately 40 percent of households owned a computer in 2005."
   },
   {
    "w": "roughly",
    "d": "less formal synonym for approximately; use before a figure",
    "x": "Roughly half of the respondents preferred public transport."
   },
   {
    "w": "just under",
    "d": "for a figure slightly below a round number",
    "x": "Just under 30 percent of the energy came from renewables."
   },
   {
    "w": "just over",
    "d": "for a figure slightly above a round number",
    "x": "Just over 60 percent of students passed the exam."
   },
   {
    "w": "nearly",
    "d": "for a figure approaching but below a round number",
    "x": "Nearly 70 percent of the city was residential by 2010."
   },
   {
    "w": "around",
    "d": "common informal hedge meaning approximately; use before a figure",
    "x": "Around 5 million tourists visited the region each year."
   },
   {
    "w": "well over",
    "d": "for a figure clearly above a round number",
    "x": "Well over half of the population lived in cities by 2020."
   },
   {
    "w": "a little under",
    "d": "for a figure slightly below a round number; softer than 'just under'",
    "x": "A little under a quarter of workers were employed in farming."
   },
   {
    "w": "in the region of",
    "d": "formal phrase before an approximate large figure",
    "x": "Spending stood in the region of 2 billion dollars."
   },
   {
    "w": "almost",
    "d": "for a figure very close to but below a round number",
    "x": "Almost 90 percent of homes had internet access by 2018."
   }
  ]
 },
 {
  "g": "Compare & contrast data",
  "sense": "set figures against each other (Task 1)",
  "tag": "t1",
  "items": [
   {
    "w": "whereas",
    "d": "formal linker contrasting two figures in one sentence",
    "x": "Men spent 3 hours online, whereas women spent only 2."
   },
   {
    "w": "while",
    "d": "linker for contrast or simultaneous facts; flexible position",
    "x": "While exports rose, imports fell over the same period."
   },
   {
    "w": "compared with",
    "d": "set one figure against another; also 'compared to'",
    "x": "Spending on health was high compared with that on defence."
   },
   {
    "w": "in contrast",
    "d": "sentence opener marking a clear difference from the previous point",
    "x": "Rural areas declined. In contrast, cities expanded rapidly."
   },
   {
    "w": "the highest",
    "d": "superlative to identify the largest figure in a set",
    "x": "China recorded the highest level of emissions in 2020."
   },
   {
    "w": "the lowest",
    "d": "superlative to identify the smallest figure in a set",
    "x": "Spain had the lowest unemployment rate of the four countries."
   },
   {
    "w": "twice as many as",
    "d": "for a figure double another; multiple comparison",
    "x": "There were twice as many cars as bicycles in the city."
   },
   {
    "w": "the same as",
    "d": "for two figures that are equal",
    "x": "Spending in 2010 was the same as in 2005."
   },
   {
    "w": "by far the largest",
    "d": "emphatic superlative stressing a big lead over others",
    "x": "Oil was by far the largest source of energy in 1990."
   },
   {
    "w": "considerably more than",
    "d": "for a figure clearly higher than another; formal",
    "x": "The city produced considerably more waste than the countryside."
   }
  ]
 },
 {
  "g": "Proportions",
  "sense": "describe parts of a whole (Task 1)",
  "tag": "t1",
  "items": [
   {
    "w": "a third",
    "d": "fraction for roughly 33 percent; common in pie-chart reports",
    "x": "A third of the workforce was employed in the service sector."
   },
   {
    "w": "a quarter",
    "d": "fraction for roughly 25 percent of a whole",
    "x": "A quarter of all electricity came from nuclear power."
   },
   {
    "w": "the majority",
    "d": "for more than half of a group; followed by 'of'",
    "x": "The majority of respondents supported the new policy."
   },
   {
    "w": "a small fraction",
    "d": "for a very small part of the whole",
    "x": "Only a small fraction of waste was recycled in 2000."
   },
   {
    "w": "nearly half",
    "d": "for a proportion approaching but below 50 percent",
    "x": "Nearly half of the households relied on gas heating."
   },
   {
    "w": "the largest share",
    "d": "for the biggest portion of a total; common in charts",
    "x": "Housing accounted for the largest share of monthly spending."
   },
   {
    "w": "a significant proportion",
    "d": "for a notably large part of the whole; formal",
    "x": "A significant proportion of the budget went on education."
   },
   {
    "w": "one in five",
    "d": "for a 20 percent proportion; vivid alternative to a percentage",
    "x": "One in five adults reported working from home."
   }
  ]
 },
 {
  "g": "Describe a process",
  "sense": "sequence the stages (Task 1)",
  "tag": "t1",
  "items": [
   {
    "w": "first",
    "d": "marks the opening stage of a process or sequence",
    "x": "First, the raw materials are collected and sorted."
   },
   {
    "w": "next",
    "d": "links to the following stage in a sequence",
    "x": "Next, the mixture is heated to a high temperature."
   },
   {
    "w": "then",
    "d": "common connector moving to the subsequent step",
    "x": "The beans are dried and then roasted in large ovens."
   },
   {
    "w": "after that",
    "d": "sentence opener for the stage following the previous one",
    "x": "After that, the liquid is filtered to remove impurities."
   },
   {
    "w": "subsequently",
    "d": "formal connector for a later stage; smarter than 'then'",
    "x": "The product is cooled and subsequently packaged for delivery."
   },
   {
    "w": "finally",
    "d": "marks the last stage of a process",
    "x": "Finally, the finished goods are transported to retailers."
   },
   {
    "w": "is followed by",
    "d": "passive link showing one stage leads to the next",
    "x": "The mixing stage is followed by a period of fermentation."
   },
   {
    "w": "at this stage",
    "d": "refers to the current step while describing it",
    "x": "At this stage, the metal is shaped using heavy machinery."
   },
   {
    "w": "once this is complete",
    "d": "marks the end of one stage before the next begins",
    "x": "Once this is complete, the bottles are sealed and labelled."
   },
   {
    "w": "the process begins with",
    "d": "useful opener for the first stage of a process diagram",
    "x": "The process begins with the harvesting of sugar cane."
   },
   {
    "w": "in the final stage",
    "d": "introduces the last step; alternative to 'finally'",
    "x": "In the final stage, the paper is cut and stored."
   }
  ]
 },
 {
  "g": "Map changes",
  "sense": "describe what changed (Task 1)",
  "tag": "t1",
  "items": [
   {
    "w": "was replaced by",
    "d": "passive past for one feature swapped for another on a map",
    "x": "The small forest in the west was replaced by a large car park."
   },
   {
    "w": "was converted into",
    "d": "passive past when a structure changed use rather than being removed",
    "x": "The old factory was converted into a block of luxury apartments."
   },
   {
    "w": "was demolished",
    "d": "passive past for a building that was knocked down and removed",
    "x": "The row of cottages near the river was demolished in 2005."
   },
   {
    "w": "was constructed",
    "d": "passive past for a new building or structure that was built",
    "x": "A new hospital was constructed on the site of the former school."
   },
   {
    "w": "has been transformed",
    "d": "present perfect passive for a dramatic, lasting overall change",
    "x": "Over twenty years, the rural village has been transformed into a busy town."
   },
   {
    "w": "to the north of",
    "d": "locate a feature using compass direction on a map",
    "x": "A shopping centre now stands to the north of the railway station."
   },
   {
    "w": "adjacent to",
    "d": "formal phrase meaning next to; place features beside each other",
    "x": "A car park was built adjacent to the newly opened supermarket."
   },
   {
    "w": "on the outskirts",
    "d": "describe features located at the edge of a town or city",
    "x": "Several houses were constructed on the outskirts of the town."
   },
   {
    "w": "underwent significant change",
    "d": "summarise that an area changed considerably overall",
    "x": "The eastern part of the area underwent significant change between 1990 and 2010."
   },
   {
    "w": "remained unchanged",
    "d": "note a feature that stayed the same across the period",
    "x": "The river and the main road remained unchanged throughout the period."
   }
  ]
 },
 {
  "g": "Frame an opinion",
  "sense": "state your view (Task 2)",
  "tag": "t2",
  "items": [
   {
    "w": "in my view",
    "d": "introduce your personal opinion; common and safe in Task 2",
    "x": "In my view, governments should invest far more heavily in public transport."
   },
   {
    "w": "I would argue that",
    "d": "state a position you intend to support with reasons",
    "x": "I would argue that the benefits of this policy clearly outweigh its costs."
   },
   {
    "w": "it seems to me that",
    "d": "offer a slightly tentative personal opinion; polite and measured",
    "x": "It seems to me that stricter laws alone cannot solve this problem."
   },
   {
    "w": "I am convinced that",
    "d": "express a strong, confident opinion you firmly hold",
    "x": "I am convinced that early education shapes a child's future success."
   },
   {
    "w": "from my perspective",
    "d": "signal a personal viewpoint; useful to vary your opinion phrases",
    "x": "From my perspective, technology has done more good than harm to society."
   },
   {
    "w": "I firmly believe that",
    "d": "state a strong opinion emphatically; good for the thesis statement",
    "x": "I firmly believe that universities should make tuition free for all students."
   },
   {
    "w": "to my mind",
    "d": "introduce a personal opinion; a formal alternative to in my view",
    "x": "To my mind, working from home improves both productivity and well-being."
   }
  ]
 },
 {
  "g": "Report other views",
  "sense": "present positions you discuss (Task 2)",
  "tag": "t2",
  "items": [
   {
    "w": "it is often argued that",
    "d": "introduce a common opposing view without claiming it yourself",
    "x": "It is often argued that strict rules limit individual freedom unnecessarily."
   },
   {
    "w": "proponents claim that",
    "d": "present the supporters' position before you evaluate it",
    "x": "Proponents claim that nuclear power offers a clean and reliable energy source."
   },
   {
    "w": "critics contend that",
    "d": "present the opposing side's argument formally and neutrally",
    "x": "Critics contend that such schemes waste money without reducing real poverty."
   },
   {
    "w": "some maintain that",
    "d": "attribute a view to an unnamed group you will discuss",
    "x": "Some maintain that exams are the fairest way to assess students."
   },
   {
    "w": "it is widely believed that",
    "d": "introduce a popular assumption you may later challenge",
    "x": "It is widely believed that money cannot buy lasting happiness."
   },
   {
    "w": "advocates of this view",
    "d": "refer back to supporters of a position already mentioned",
    "x": "Advocates of this view point to falling crime rates as proof."
   },
   {
    "w": "opponents argue that",
    "d": "present the counter-position clearly before responding to it",
    "x": "Opponents argue that the policy unfairly burdens low-income families."
   }
  ]
 },
 {
  "g": "Concede & counter",
  "sense": "acknowledge then push back (Task 2)",
  "tag": "t2",
  "items": [
   {
    "w": "although",
    "d": "concede a point at the start of a sentence before countering",
    "x": "Although cars offer convenience, they are a major source of pollution."
   },
   {
    "w": "while it is true that",
    "d": "acknowledge an opposing point before raising your objection",
    "x": "While it is true that tourism creates jobs, it can damage local culture."
   },
   {
    "w": "admittedly",
    "d": "concede a valid point briefly before pushing back; formal",
    "x": "Admittedly, online learning lacks face-to-face contact, yet it reaches far more people."
   },
   {
    "w": "even so",
    "d": "counter a point you just conceded; signals you stand firm",
    "x": "The plan is expensive; even so, the long-term benefits justify the cost."
   },
   {
    "w": "nonetheless",
    "d": "to counter a point you just conceded; formal",
    "x": "Critics raise valid concerns; nonetheless, the policy remains the best option available."
   },
   {
    "w": "that said",
    "d": "introduce a contrasting point after conceding something; slightly informal",
    "x": "Social media connects people instantly. That said, it can also fuel loneliness."
   },
   {
    "w": "despite this",
    "d": "counter a preceding concession; links back to a conceded point",
    "x": "The risks are real. Despite this, the potential rewards are too great to ignore."
   },
   {
    "w": "granted",
    "d": "concede a point quickly before countering it; concise and formal",
    "x": "Granted, fast food is cheap, but its health costs are considerable."
   },
   {
    "w": "on the other hand",
    "d": "present the opposing side; balance two views in discussion essays",
    "x": "Cities offer many jobs. On the other hand, they are crowded and stressful."
   }
  ]
 },
 {
  "g": "Cause & effect",
  "sense": "link reasons and results (Task 2)",
  "tag": "t2",
  "items": [
   {
    "w": "as a result",
    "d": "introduce a consequence of a stated cause; very common linker",
    "x": "Many factories closed, and as a result unemployment rose sharply in the region."
   },
   {
    "w": "consequently",
    "d": "formal linker introducing a logical result of the previous point",
    "x": "Fuel prices increased; consequently, more commuters switched to public transport."
   },
   {
    "w": "this leads to",
    "d": "connect a cause to its outcome within or across sentences",
    "x": "Poor diet and inactivity combine, and this leads to rising obesity rates."
   },
   {
    "w": "owing to",
    "d": "formal phrase introducing the cause; followed by a noun phrase",
    "x": "Owing to rapid urbanisation, many cities now face severe housing shortages."
   },
   {
    "w": "stem from",
    "d": "show that a problem originates from a particular cause",
    "x": "Many social problems stem from a lack of affordable education and jobs."
   },
   {
    "w": "give rise to",
    "d": "formal way to say a cause produces an effect or problem",
    "x": "Rapid technological change can give rise to widespread job insecurity."
   },
   {
    "w": "one major cause is",
    "d": "introduce a key reason when analysing the causes of something",
    "x": "One major cause is the excessive use of private cars in city centres."
   },
   {
    "w": "for this reason",
    "d": "draw a conclusion or action from a cause just explained",
    "x": "Resources are limited; for this reason, recycling should be made compulsory."
   },
   {
    "w": "thereby",
    "d": "formal linker showing a result of the action just described",
    "x": "Governments could tax sugary drinks, thereby reducing consumption and improving public health."
   }
  ]
 },
 {
  "g": "Add & exemplify",
  "sense": "extend and illustrate a point (Task 2)",
  "tag": "t2",
  "items": [
   {
    "w": "furthermore",
    "d": "add a further supporting point; formal sentence-initial linker",
    "x": "Public transport reduces traffic. Furthermore, it lowers harmful emissions in busy cities."
   },
   {
    "w": "moreover",
    "d": "add an extra, often stronger point; formal and academic",
    "x": "The scheme saves money. Moreover, it creates new jobs in local communities."
   },
   {
    "w": "in addition",
    "d": "introduce an additional point of equal weight; common and safe",
    "x": "Exercise improves physical health. In addition, it greatly reduces stress and anxiety."
   },
   {
    "w": "for instance",
    "d": "introduce a specific example to support a general claim",
    "x": "Many countries promote cycling; for instance, the Netherlands has extensive bike lanes."
   },
   {
    "w": "a clear example of this",
    "d": "introduce a strong illustration of the point just made",
    "x": "A clear example of this is the rapid growth of online shopping during recent years."
   },
   {
    "w": "to illustrate",
    "d": "signal that an example or explanation will follow; formal",
    "x": "To illustrate, students who read daily tend to write far more fluently."
   },
   {
    "w": "such as",
    "d": "introduce examples within a sentence; followed by a noun",
    "x": "Renewable sources such as solar and wind power are becoming increasingly affordable."
   },
   {
    "w": "a case in point",
    "d": "present an example that perfectly proves your argument",
    "x": "Some cities have banned cars downtown; London is a case in point."
   }
  ]
 },
 {
  "g": "Conclude",
  "sense": "close the essay (Task 2)",
  "tag": "t2",
  "items": [
   {
    "w": "in conclusion",
    "d": "open the final paragraph; the most common conclusion signpost",
    "x": "In conclusion, the advantages of renewable energy clearly outweigh its drawbacks."
   },
   {
    "w": "to sum up",
    "d": "open a concluding paragraph; slightly less formal than in conclusion",
    "x": "To sum up, education remains the most effective tool for reducing inequality."
   },
   {
    "w": "on balance",
    "d": "conclude after weighing both sides; signals a measured judgement",
    "x": "On balance, the benefits of globalisation outweigh its negative effects."
   },
   {
    "w": "overall",
    "d": "summarise your overall position in the conclusion or Task 1 overview",
    "x": "Overall, I believe technology has improved education far more than it has harmed it."
   },
   {
    "w": "taking everything into account",
    "d": "conclude after considering all arguments; emphasises a balanced view",
    "x": "Taking everything into account, stricter regulation seems the wisest course of action."
   },
   {
    "w": "the evidence suggests that",
    "d": "draw a reasoned conclusion from the points you have made",
    "x": "The evidence suggests that investment in prevention saves money in the long run."
   },
   {
    "w": "ultimately",
    "d": "introduce a final, decisive judgement in your conclusion",
    "x": "Ultimately, the responsibility for protecting the environment lies with every individual."
   }
  ]
 }
];

window.WRITING = WRITING;
window.WLANG = WLANG;
