/* ============================================================
   speaking.js — IELTS Speaking content.
   SPEAKING = { criteria, principles, techniques, structures,
                practice, mistakes, parts[] }
   SLANG    = language bank groups (items {w,d,x}).
   Part shape: { id,no,title,alias,meta,blurb, steps[], blueprint[], pitfalls[] }
     steps     -> { t, ex }        (the Approach tab)
     blueprint -> { part, detail } (the Structure tab)
     pitfalls  -> { n, d, ex }     (the Pitfalls tab)
   technique -> { name, crit, ex, why }
   structure -> { name, tag, frame, ex[], use }
   drill     -> { tag, name, how, steps[], ex[] }
   ============================================================ */

const SPEAKING = {

  /* -------------------- how it is scored -------------------- */
  principles: [
    { n: "S-01", h: "It is a conversation", p: "The examiner is not testing what you know &mdash; ideas are never marked right or wrong. They are testing <b>how</b> you express them: your flow, your words, your grammar and your sound. Speak to communicate, not to impress." },
    { n: "S-02", h: "Four equal criteria", p: "Fluency &amp; Coherence, Lexical Resource, Grammatical Range &amp; Accuracy and Pronunciation each count for <b>25%</b>. You cannot hide a weak one &mdash; band 8 means hitting all four. Most learners neglect pronunciation; don&rsquo;t." },
    { n: "S-03", h: "Always extend", p: "A one-word answer starves three of the four criteria. Every answer should carry a <b>reason, an example or a detail</b>. The unspoken rule: say two to four sentences, even when the question feels small." },
    { n: "S-04", h: "Fluency beats perfection", p: "Natural speech with the odd slip scores higher than slow, &lsquo;perfect&rsquo; speech full of long pauses. Keep talking, self-correct lightly, and never freeze chasing one right word." }
  ],

  /* -------------------- the four criteria -------------------- */
  criteria: [
    {
      code: "FC", pct: "25%",
      name: "Fluency &amp; Coherence",
      intro: "Can you keep going at a natural pace, link ideas logically, and stay on topic without long hesitations?",
      b6: "Willing to speak at length but repetition, self-correction or hesitation is noticeable; over-uses simple connectives (and, but, because); coherence sometimes breaks.",
      b8: "Speaks fluently with only occasional repetition or self-correction; hesitates to find ideas, not words; develops topics coherently with a flexible range of cohesive devices."
    },
    {
      code: "LR", pct: "25%",
      name: "Lexical Resource",
      intro: "Range and <b>precision</b> of vocabulary, including collocation, idiom and topic-specific words &mdash; with paraphrase when a word escapes you.",
      b6: "Enough vocabulary to discuss topics at length; attempts paraphrase and less common words but with some inaccuracy in choice or collocation.",
      b8: "Wide resource used flexibly and precisely; skilful, natural collocation and some idiom; paraphrases effectively when a word is missing."
    },
    {
      code: "GRA", pct: "25%",
      name: "Grammatical Range &amp; Accuracy",
      intro: "A <b>variety</b> of structures &mdash; tenses, clauses, conditionals &mdash; produced accurately under the pressure of speech.",
      b6: "Mix of simple and complex forms but with limited flexibility; complex sentences carry frequent errors, though meaning is rarely lost.",
      b8: "Wide range of structures used flexibly; the majority of sentences are error-free; only occasional inappropriacies or non-systematic errors."
    },
    {
      code: "P", pct: "25%",
      name: "Pronunciation",
      intro: "Not accent &mdash; <b>clarity</b>. Word and sentence stress, intonation, chunking and connected speech that make you easy to follow.",
      b6: "Generally understood; uses some features of connected speech and stress, but not always effectively; some words or sounds reduce clarity.",
      b8: "Easy to understand throughout; wide range of pronunciation features (stress, rhythm, intonation, chunking) used well; accent does not affect clarity."
    }
  ],

  /* -------------------- high-score techniques -------------------- */
  techniques: [
    { name: "Extend with a reason and an example", crit: "FC", ex: ["Q: &lsquo;Do you like cooking?&rsquo; &rarr; &lsquo;I do, actually &mdash; mainly because it helps me unwind after work. Last night, for instance, I spent an hour making a curry from scratch and completely forgot about my emails.&rsquo;"], why: "The single biggest fluency move. Answer &rarr; reason (because/since) &rarr; example (for instance/the other day). It turns a one-line reply into a developed turn and feeds Fluency and Lexical Resource at once." },
    { name: "Buy thinking time gracefully", crit: "FC", ex: ["&lsquo;That&rsquo;s a really interesting question, I&rsquo;ve never thought about it&hellip;&rsquo;", "&lsquo;Well, it depends, but I suppose&hellip;&rsquo;", "&lsquo;Let me think about that for a second.&rsquo;"], why: "Native speakers hesitate too &mdash; but with phrases, not silence or &lsquo;errr&rsquo;. A short, fluent filler buys you two seconds to plan and keeps the rhythm going. Silence is what costs marks." },
    { name: "Paraphrase the question, don&rsquo;t echo it", crit: "FC · LR", ex: ["Q: &lsquo;Is it important to keep fit?&rsquo; &rarr; &lsquo;Staying in good shape definitely matters to me, and here&rsquo;s why&hellip;&rsquo;"], why: "Reusing the examiner&rsquo;s exact words is flat and wastes a chance to show range. Re-phrasing the key word (keep fit &rarr; stay in good shape) signals Lexical Resource from your very first breath." },
    { name: "Signpost your ideas", crit: "FC", ex: ["&lsquo;There are basically two reasons for this. Firstly&hellip; and on top of that&hellip;&rsquo;", "&lsquo;On the one hand&hellip; but on the other&hellip;&rsquo;"], why: "Signposts make your answer easy to follow &mdash; the core of Coherence. They also help <em>you</em> structure the answer as you speak, so you don&rsquo;t lose your thread halfway through." },
    { name: "Pull in topic-specific collocations", crit: "LR", ex: ["Education: &lsquo;a well-rounded education&rsquo;, &lsquo;hands-on experience&rsquo;.", "Environment: &lsquo;carbon footprint&rsquo;, &lsquo;a throwaway culture&rsquo;.", "Work: &lsquo;a steep learning curve&rsquo;, &lsquo;strike a work-life balance&rsquo;."], why: "Band 8 vocabulary is precise and natural, not rare and forced. Topic collocations show you can talk about a field the way a fluent speaker does &mdash; far more impressive than isolated &lsquo;big&rsquo; words." },
    { name: "Use idioms &mdash; sparingly and correctly", crit: "LR", ex: ["&lsquo;It&rsquo;s not really my cup of tea.&rsquo;", "&lsquo;I was over the moon when I heard.&rsquo;", "&lsquo;I do it once in a blue moon.&rsquo;"], why: "A couple of well-placed idioms lift Lexical Resource. The trap is over-stuffing or misusing them &mdash; one natural idiom beats five crammed in. If you&rsquo;re unsure of an idiom, leave it out." },
    { name: "Show off your tenses on purpose", crit: "GRA", ex: ["Past: &lsquo;When I was a kid, I used to&hellip;&rsquo; Present perfect: &lsquo;I&rsquo;ve recently started&hellip;&rsquo; Future: &lsquo;I&rsquo;m planning to&hellip;&rsquo;"], why: "Grammatical Range rewards variety. Deliberately move across time &mdash; a habit in the past, an experience up to now, a plan for the future &mdash; instead of staying in the present simple the whole test." },
    { name: "Build complex sentences with control", crit: "GRA", ex: ["Relative: &lsquo;&hellip;, which is something I&rsquo;ve always loved.&rsquo;", "Concession: &lsquo;Although it was tough, I stuck with it.&rsquo;", "Conditional: &lsquo;If I had more time, I&rsquo;d definitely&hellip;&rsquo;"], why: "Range and accuracy both score. Aim for a natural mix of short and complex sentences &mdash; not one tangled sentence to look advanced. A clear simple sentence beats a broken complex one." },
    { name: "Self-correct lightly, then move on", crit: "FC · GRA", ex: ["&lsquo;I goes &mdash; sorry, I <em>go</em> there every week.&rsquo;", "&lsquo;It was more cheaper &mdash; cheaper, I mean.&rsquo;"], why: "A quick, confident correction shows you monitor your own grammar (good for accuracy) without breaking flow. The mistake is dwelling on it or repeating the error three times while you panic." },
    { name: "Stress the words that carry meaning", crit: "P", ex: ["&lsquo;I <em>absolutely</em> love it&rsquo; &mdash; stress &lsquo;absolutely&rsquo; and &lsquo;love&rsquo;, not &lsquo;I&rsquo; and &lsquo;it&rsquo;.", "&lsquo;It wasn&rsquo;t the <em>price</em> &mdash; it was the <em>service</em>.&rsquo;"], why: "English is stress-timed. Hitting the content words (nouns, main verbs, adjectives) and reducing the small words is what makes you sound natural and clear &mdash; the heart of the Pronunciation score." },
    { name: "Chunk and pause for meaning", crit: "P · FC", ex: ["&lsquo;When I was younger / I lived by the sea / which I absolutely loved.&rsquo;"], why: "Pause at the edges of meaning groups, not randomly mid-phrase. Sensible chunking makes you easier to follow and gives you natural breathing points &mdash; pauses for thought stop sounding like hesitations." },
    { name: "Vary your intonation", crit: "P", ex: ["Rise then fall to sound engaged: &lsquo;It was&hellip; <em>incredible</em>.&rsquo;", "Lists rise then fall: &lsquo;food&uarr;, music&uarr;, the people&darr;.&rsquo;"], why: "A flat monotone reads as bored and is hard to follow, even when every word is correct. Moving your pitch &mdash; up for interest, down to finish &mdash; signals meaning and energy and lifts Pronunciation." }
  ],

  /* -------------------- power structures (sentence frames) -------------------- */
  structures: [
    { name: "Cleft for emphasis", tag: "any", frame: "What I really + [verb] is + [idea].  /  The thing that + [verb] is&hellip;", ex: ["What I really enjoy about it is the freedom it gives me.", "The thing that drew me to the job was the people."], use: "A high-value structure that front-loads emphasis and shows grammatical range. Great for opinions in Part 1 and 3." },
    { name: "Second conditional (hypothetical)", tag: "p3", frame: "If I + [past simple], I would / might + [verb].", ex: ["If I had more free time, I&rsquo;d probably travel a lot more.", "If the government invested in it, things might change quickly."], use: "The workhorse of Part 3 speculation. Use it whenever a question is hypothetical (&lsquo;What would happen if&hellip;?&rsquo;)." },
    { name: "Third conditional (past regret)", tag: "p2", frame: "If I had + [past participle], I would have + [past participle].", ex: ["If I&rsquo;d known earlier, I would have prepared much better.", "Looking back, if I hadn&rsquo;t taken that trip, I&rsquo;d have missed so much."], use: "Shows off a tricky tense accurately. Perfect for the Part 2 long turn when reflecting on a past event." },
    { name: "Concession + counter", tag: "p3", frame: "Although / While + [point], I still think + [your view].", ex: ["Although it&rsquo;s convenient, I still think it does more harm than good.", "While I see the appeal, I&rsquo;m not entirely convinced."], use: "Lets you acknowledge the other side before stating your view &mdash; a hallmark of a mature, balanced answer in Part 3." },
    { name: "Used to / would for past habits", tag: "p1", frame: "I used to + [verb]&hellip;  /  Every summer, we would + [verb].", ex: ["I used to play the piano when I was younger, but I&rsquo;ve fallen out of it.", "Every summer we&rsquo;d head to my grandparents&rsquo; place in the countryside."], use: "Instantly adds tense variety in Part 1. Reach for it whenever a question touches your childhood or the past." },
    { name: "Present perfect for experience", tag: "p1", frame: "I&rsquo;ve always + [verb]&hellip;  /  I&rsquo;ve recently started + [verb-ing].", ex: ["I&rsquo;ve always been really into photography.", "I&rsquo;ve recently got into cooking, which has been a lot of fun."], use: "Connects the past to now &mdash; a band-8 tense. Ideal for hobbies, interests and any &lsquo;how long&rsquo; question." },
    { name: "Relative clause to add detail", tag: "any", frame: "&hellip;, which / who / where + [extra detail].", ex: ["I grew up in a small town, which had its pros and cons.", "My closest friend, who I&rsquo;ve known since school, lives abroad now."], use: "An easy way to extend a sentence and add a complex clause without starting a new one. Sprinkle these throughout." },
    { name: "Degrees of certainty", tag: "p3", frame: "It&rsquo;s likely / bound to + [verb]&hellip;  /  There&rsquo;s a good chance (that)&hellip;", ex: ["Prices are bound to keep rising, I&rsquo;d say.", "There&rsquo;s a good chance things will look very different in ten years."], use: "Hedging language for Part 3 predictions. It sounds measured and academic, and avoids over-certain claims." },
    { name: "Generalising", tag: "p3", frame: "On the whole, people tend to + [verb].  /  By and large&hellip;", ex: ["On the whole, people tend to value convenience over cost these days.", "By and large, younger generations are more open to change."], use: "Part 3 often asks about &lsquo;people&rsquo; in general. These frames let you talk about society without over-claiming." },
    { name: "Comparatives for opinion", tag: "any", frame: "I&rsquo;d say A is far / much more + [adj] than B.", ex: ["I&rsquo;d say city life is far more stimulating than living in the countryside.", "Honestly, it&rsquo;s nowhere near as stressful as people make out."], use: "Comparison is a natural way to give a nuanced opinion and slip in intensifiers (far, much, nowhere near)." },
    { name: "Reacting / evaluative", tag: "any", frame: "I find it + [adjective].  /  It strikes me as + [adjective].", ex: ["I find it fascinating how quickly technology moves.", "It strikes me as a bit unfair, to be honest."], use: "A precise alternative to &lsquo;it is good/bad&rsquo;. Pairs well with strong adjectives for Lexical Resource." },
    { name: "Future plans &amp; intentions", tag: "p1", frame: "I&rsquo;m thinking of + [verb-ing].  /  I&rsquo;m planning to + [verb].", ex: ["I&rsquo;m thinking of taking up a new language this year.", "I&rsquo;m planning to move closer to the city at some point."], use: "Covers future tense variety for any &lsquo;future&rsquo; question in Part 1 without leaning on &lsquo;will&rsquo; alone." }
  ],

  /* -------------------- practice routine (how to train) -------------------- */
  practice: [
    { tag: "Daily · 10 min", name: "Record &amp; replay", how: "Answer a question out loud, record it on your phone, then listen back as if you were the examiner.", steps: ["Pick one question and speak for the right length (Part 1: 2&ndash;4 sentences; Part 2: 2 minutes).", "Listen back and mark every long pause, filler and repeated word.", "Re-record the same answer fixing one thing &mdash; usually fewer &lsquo;ums&rsquo; or more linking."], ex: ["Notice you say &lsquo;and then&hellip; and then&hellip;&rsquo; &mdash; replace with &lsquo;after that&rsquo;, &lsquo;eventually&rsquo;.", "Catch a flat monotone and redo it with stress on content words."] },
    { tag: "Daily · 10 min", name: "Shadowing", how: "Play a short clip of natural English (podcast, interview), then speak along a beat behind, copying the rhythm and intonation exactly.", steps: ["Choose 30&ndash;60 seconds of clear, natural speech.", "Listen once for meaning, then speak in sync, imitating stress and melody &mdash; not just the words.", "Repeat until your version sounds like the original&rsquo;s music."], ex: ["Copy how natives reduce small words: &lsquo;gonna&rsquo;, &lsquo;wanna&rsquo;, &lsquo;kind-of&rsquo;.", "Imitate the fall-rise on &lsquo;Well&hellip; it depends.&rsquo;"] },
    { tag: "Daily · 5 min", name: "The 1-minute monologue", how: "Open to a random noun and talk about it non-stop for sixty seconds &mdash; no planning.", steps: ["Set a 60-second timer.", "Speak without stopping; if you stall, use a filler and keep going.", "The goal is flow, not perfection &mdash; fluency is a muscle you build by talking."], ex: ["Topic &lsquo;a chair&rsquo; &rarr; describe it, where you&rsquo;d find it, a memory linked to one.", "Topic &lsquo;rain&rsquo; &rarr; feelings, a story, an opinion about weather."] },
    { tag: "2&ndash;3× / week", name: "Timed cue-card (Part 2)", how: "Treat it like the real test: 1 minute to make notes, then talk for up to 2 minutes.", steps: ["Pick a cue card and start a 1-minute prep timer; jot 4&ndash;5 keywords, not sentences.", "Speak for the full 2 minutes &mdash; train yourself not to dry up at 45 seconds.", "Record it and check you covered all four bullet points and extended the last one."], ex: ["Cue: &lsquo;Describe a journey you remember&rsquo; &rarr; notes: where / who / why memorable / feeling.", "If you finish early, add a &lsquo;Looking back&hellip;&rsquo; reflection to fill the time."] },
    { tag: "Daily · 10 min", name: "Build topic vocabulary banks", how: "Collect collocations and ideas by theme so you&rsquo;re never hunting for words mid-answer.", steps: ["Pick a common topic (technology, health, education, environment, travel).", "Write 6&ndash;8 collocations and one strong opinion for it.", "Use the Language bank below and drill it as flashcards (spaced repetition is on)."], ex: ["Health &rarr; &lsquo;lead a sedentary lifestyle&rsquo;, &lsquo;boost your immune system&rsquo;.", "Tech &rarr; &lsquo;a digital detox&rsquo;, &lsquo;screen time&rsquo;, &lsquo;stay connected&rsquo;."] },
    { tag: "Every answer", name: "The &lsquo;Why? Example?&rsquo; push", how: "Train one reflex until it&rsquo;s automatic: after any answer, silently ask &lsquo;why?&rsquo; and &lsquo;for example?&rsquo; and say the answer.", steps: ["Give your first reaction to a question.", "Immediately add &lsquo;&hellip;because&hellip;&rsquo; (the reason).", "Then add &lsquo;&hellip;for instance&hellip;&rsquo; (the example). Now you&rsquo;ve tripled the answer."], ex: ["&lsquo;I prefer mornings&rsquo; &rarr; &lsquo;&hellip;because I&rsquo;m sharper then &mdash; for example, I always study before noon.&rsquo;"] },
    { tag: "Weekly · 15 min", name: "Self-scored mock", how: "Do a full part under exam conditions and score yourself against the four criteria honestly.", steps: ["Record a full Part 1, 2 or 3 with no pausing.", "Listen back and give yourself a band 1&ndash;9 on each criterion using the descriptors above.", "Pick the single weakest criterion and design next week&rsquo;s practice around it."], ex: ["Weak Pronunciation? &rarr; a week of shadowing.", "Weak Grammar? &rarr; a week forcing one complex structure per answer."] },
    { tag: "Daily · 5 min", name: "Problem-sound drill", how: "Target the specific sounds your first language makes hard, with minimal pairs.", steps: ["Find your trouble sounds (common ones: /θ/ think, /ð/ this, final consonants, /v/ vs /w/).", "Drill minimal pairs slowly, then in a sentence at speed.", "Record and compare to a dictionary&rsquo;s audio."], ex: ["&lsquo;think / sink&rsquo;, &lsquo;three / tree&rsquo;.", "&lsquo;vest / west&rsquo;, &lsquo;ship / chip&rsquo;."] },
    { tag: "Mindset", name: "Speak English daily &mdash; to yourself", how: "Fluency comes from hours of talking, not from reading about talking. Narrate your day in English.", steps: ["Describe what you&rsquo;re doing as you do it (&lsquo;I&rsquo;m making coffee because&hellip;&rsquo;).", "Give yourself opinions on the news, films, anything &mdash; out loud.", "Find a partner or language exchange for at least one real conversation a week."], ex: ["Cooking &rarr; narrate the steps and why you like the dish.", "Commuting &rarr; plan your weekend out loud in full sentences."] }
  ],

  /* -------------------- common mistakes -------------------- */
  mistakes: [
    { n: "One-word answers.", d: "&lsquo;Yes&rsquo; or &lsquo;Not really&rsquo; with nothing after it gives the examiner nothing to score. Always add a reason or example, even when the question feels trivial.", ex: ["Q: &lsquo;Do you like sport?&rsquo; &rarr; not just &lsquo;Yes&rsquo;, but &lsquo;Yes, I&rsquo;m a big football fan &mdash; I play five-a-side every Sunday.&rsquo;"] },
    { n: "Memorised speeches.", d: "Examiners are trained to spot rehearsed scripts, and they stop counting them. Your fluency collapses the moment they ask a follow-up. Learn structures and vocabulary, not whole answers.", ex: ["A perfectly fluent 200-word intro followed by &lsquo;errr&hellip;&rsquo; on the next question is a dead giveaway."] },
    { n: "Going off-topic.", d: "Drifting away from the actual question hurts Coherence. Answer what was asked first, then develop &mdash; don&rsquo;t deliver a pre-packed monologue that ignores the prompt.", ex: ["Q about <em>your city</em> answered with a memorised speech about <em>your country</em>."] },
    { n: "Speaking too fast to &lsquo;sound fluent&rsquo;.", d: "Rushing blurs your pronunciation and triggers more mistakes. Fluency is steadiness, not speed. A calm, well-chunked pace is clearer and scores higher.", ex: ["Slow down at the start of Part 2 &mdash; nerves make everyone speed up."] },
    { n: "Freezing in silence.", d: "Long silent gaps are the worst thing for Fluency. If you&rsquo;re thinking, fill the gap with a phrase, not silence.", ex: ["Use &lsquo;That&rsquo;s a tough one, let me think&hellip;&rsquo; instead of three seconds of nothing."] },
    { n: "Vague, overused words.", d: "&lsquo;Very&rsquo;, &lsquo;good&rsquo;, &lsquo;nice&rsquo;, &lsquo;a lot&rsquo;, &lsquo;things&rsquo; cap your Lexical Resource. Swap in precise words and strong adjectives.", ex: ["&lsquo;very good&rsquo; &rarr; &lsquo;excellent / fantastic&rsquo;; &lsquo;very tired&rsquo; &rarr; &lsquo;exhausted&rsquo;; &lsquo;things&rsquo; &rarr; name them."] },
    { n: "Flat, monotone delivery.", d: "Even flawless words sound robotic without intonation, and a monotone is hard to follow. Move your pitch and stress the key words.", ex: ["Compare a flat &lsquo;it was good&rsquo; with an animated &lsquo;it was <em>really</em> good&rsquo;."] },
    { n: "Big words used wrongly.", d: "Cramming in rare or academic words you can&rsquo;t use naturally backfires &mdash; wrong collocation lowers Lexical Resource. Precision beats rarity.", ex: ["&lsquo;I do exercise to ameliorate my body&rsquo; &mdash; wrong word; &lsquo;improve my fitness&rsquo; is better."] },
    { n: "Not answering Part 3 directly.", d: "Part 3 wants your <em>opinion</em> and reasoning, not a description. State your view, then justify it.", ex: ["Q: &lsquo;Should museums be free?&rsquo; &rarr; give a yes/no stance first, then explain &mdash; don&rsquo;t just describe museums."] },
    { n: "Translating from your first language.", d: "Word-for-word translation produces unnatural phrasing and odd collocations. Think in English chunks you&rsquo;ve practised, not in your L1.", ex: ["Many L1-to-English literal phrases sound &lsquo;off&rsquo; even when grammatical."] },
    { n: "The same linker every time.", d: "&lsquo;And then&hellip; and then&hellip; and then&rsquo; signals a band-6 ceiling. Vary your cohesion the way you would in writing.", ex: ["Swap repeated &lsquo;and then&rsquo; for &lsquo;after that&rsquo;, &lsquo;eventually&rsquo;, &lsquo;the next thing I knew&rsquo;."] }
  ],

  /* ==================== THE THREE PARTS ==================== */
  parts: [
    {
      id: "p1", no: "S·1", title: "Introduction &amp; interview", alias: "Part 1 · familiar topics", meta: "4&ndash;5 minutes",
      blurb: "The examiner asks short questions on familiar topics &mdash; home, work or study, hobbies, daily routine. It&rsquo;s a warm-up: keep answers natural, two to four sentences, and don&rsquo;t over-think them.",
      steps: [
        { t: "Answer <b>directly</b>, then add one or two sentences &mdash; never a single word.", ex: "Q: &lsquo;Do you work or study?&rsquo; &rarr; &lsquo;I&rsquo;m working at the moment, as a graphic designer &mdash; I&rsquo;ve been doing it for about three years now.&rsquo;" },
        { t: "Use the <b>reason + example</b> reflex on almost every answer.", ex: "&lsquo;&hellip;because&hellip;&rsquo; then &lsquo;&hellip;for example&hellip;&rsquo;." },
        { t: "Mix your <b>tenses</b> &mdash; these questions invite past, present and future.", ex: "&lsquo;I used to&hellip;&rsquo;, &lsquo;these days I&hellip;&rsquo;, &lsquo;I&rsquo;m hoping to&hellip;&rsquo;." },
        { t: "Stay relaxed and conversational &mdash; this part sets your confidence for the rest.", ex: "" }
      ],
      blueprint: [
        { part: "Direct answer", detail: "Respond to the actual question in the first few words &mdash; yes/no/it depends, plus the key fact." },
        { part: "Reason", detail: "Add <b>why</b> with because / since / the main reason is&hellip;" },
        { part: "Detail or example", detail: "Extend with a specific example, a preference, or a small story &mdash; the part that shows real vocabulary." },
        { part: "(Optional) round off", detail: "A short closing thought keeps it from sounding cut off &mdash; &lsquo;&hellip;so yeah, I really enjoy it.&rsquo;" }
      ],
      pitfalls: [
        { n: "Treating it as small talk.", d: "It&rsquo;s scored from the first word. Don&rsquo;t give lazy one-liners just because the topic is easy.", ex: ["&lsquo;Where are you from?&rsquo; deserves a real answer, not just the place name."] },
        { n: "Over-long answers.", d: "Part 1 wants concise, developed replies &mdash; not a 90-second monologue per question. Save the long turn for Part 2.", ex: [""] },
        { n: "Reciting rehearsed intros.", d: "A memorised &lsquo;Let me tell you about my hometown&rsquo; speech sounds robotic and the examiner discounts it.", ex: [""] }
      ]
    },
    {
      id: "p2", no: "S·2", title: "The long turn", alias: "Part 2 · the cue card", meta: "1 min prep · 1&ndash;2 min talk",
      blurb: "You get a card with a topic and prompts, one minute to prepare with paper, then you speak alone for up to two minutes. The skill is talking at length without drying up &mdash; structure beats inspiration.",
      steps: [
        { t: "In the prep minute, write <b>keywords, not sentences</b> &mdash; one per bullet plus ideas.", ex: "For each prompt jot 2&ndash;3 trigger words; you&rsquo;ll speak from these, not read them." },
        { t: "Plan to <b>cover all the bullet points</b>, then dwell longest on the last one.", ex: "The final bullet (often &lsquo;and explain why&hellip;&rsquo;) is where you extend." },
        { t: "Open with a clear <b>framing sentence</b> and use the past where the topic allows.", ex: "&lsquo;I&rsquo;d like to talk about&hellip;&rsquo; then narrate with past and present perfect." },
        { t: "If you run out, <b>reflect</b>: how you felt, what you learned, whether you&rsquo;d do it again.", ex: "&lsquo;Looking back, what stayed with me was&hellip;&rsquo;" }
      ],
      blueprint: [
        { part: "Frame it", detail: "One sentence naming what you&rsquo;ll describe &mdash; &lsquo;I&rsquo;d like to talk about the time I&hellip;&rsquo;" },
        { part: "Cover the bullets", detail: "Walk through who / what / where / when in order, adding detail and feelings as you go." },
        { part: "Develop the last prompt", detail: "Spend the most time on the &lsquo;explain why&rsquo; bullet &mdash; reasons, significance, emotions." },
        { part: "Reflect to close", detail: "Round off with a looking-back thought so you fill the full two minutes naturally." }
      ],
      pitfalls: [
        { n: "Drying up at 45 seconds.", d: "Stopping early is the classic Part 2 failure. Keep extending with feelings, details and reflection until the examiner stops you.", ex: ["Train this with the timed cue-card drill until 2 minutes feels comfortable."] },
        { n: "Reading your notes aloud.", d: "Notes are triggers, not a script. Reading kills fluency and intonation. Glance, then speak.", ex: [""] },
        { n: "Ignoring a bullet point.", d: "Skipping a prompt weakens Coherence. Use the bullets as a built-in structure so you cover them all.", ex: ["If the card says &lsquo;and explain why it was important&rsquo;, you must answer the why."] },
        { n: "A flat list with no story.", d: "Facts with no narrative or feeling sound dull. Turn the description into a little story with a past tense and emotion.", ex: ["&lsquo;It was nerve-racking at first, but by the end I felt amazing.&rsquo;"] }
      ]
    },
    {
      id: "p3", no: "S·3", title: "The discussion", alias: "Part 3 · abstract questions", meta: "4&ndash;5 minutes",
      blurb: "A two-way discussion of abstract ideas linked to the Part 2 topic &mdash; society, the future, advantages and trade-offs. This is where band 7+ is won: opinions, reasons, examples, speculation and balance.",
      steps: [
        { t: "Give a <b>clear position</b> first, then justify it.", ex: "&lsquo;On the whole, yes &mdash; and the main reason is&hellip;&rsquo;" },
        { t: "Develop with <b>reason &rarr; example &rarr; consequence</b>, like a mini essay.", ex: "Point, then &lsquo;for instance&rsquo;, then &lsquo;which means&hellip;&rsquo;." },
        { t: "Speculate and generalise with <b>hedging language</b>.", ex: "&lsquo;It&rsquo;s likely that&hellip;&rsquo;, &lsquo;people tend to&hellip;&rsquo;, &lsquo;there&rsquo;s a good chance&hellip;&rsquo;." },
        { t: "Show <b>balance</b> &mdash; concede the other side, then return to your view.", ex: "&lsquo;Although some would argue&hellip;, I still think&hellip;&rsquo;" }
      ],
      blueprint: [
        { part: "Position", detail: "Answer the question directly with your stance &mdash; yes / no / it depends, and on what." },
        { part: "Explain", detail: "Give the reasoning: because / since / the main reason is &mdash; develop one idea fully rather than listing five." },
        { part: "Exemplify", detail: "Anchor it with an example, a comparison, or a &lsquo;what would happen if&rsquo; speculation." },
        { part: "Balance &amp; conclude", detail: "Acknowledge the counter-view, then restate where you land. Range and coherence both score here." }
      ],
      pitfalls: [
        { n: "Describing instead of arguing.", d: "Part 3 wants evaluation and opinion, not a description of the topic. Take a stance and defend it.", ex: ["&lsquo;Why do people travel?&rsquo; &rarr; give reasons and analysis, not a list of destinations."] },
        { n: "Sitting on the fence.", d: "&lsquo;It has good and bad sides&rsquo; with no real position is weak. Commit to a view, even a qualified one.", ex: ["&lsquo;It depends, but on balance I&rsquo;d say&hellip;&rsquo; is a strong, nuanced commitment."] },
        { n: "Listing without depth.", d: "Naming five quick reasons scores worse than developing two fully with examples and consequences.", ex: [""] },
        { n: "Over-certain claims.", d: "Absolute statements (&lsquo;everyone always&hellip;&rsquo;) sound naive. Hedge with &lsquo;tend to&rsquo;, &lsquo;in many cases&rsquo;, &lsquo;it&rsquo;s likely&rsquo;.", ex: ["&lsquo;Everyone hates their job&rsquo; &rarr; &lsquo;A lot of people seem to feel stuck in their jobs.&rsquo;"] }
      ]
    }
  ]
};

/* ==================== LANGUAGE BANK ====================
   tag: p1 (interview) | p2 (long turn) | p3 (discussion) | all (any part) */
const SLANG = [
  {
    g: "Buying time &amp; fillers", sense: "stay fluent while you think (any part)", tag: "all",
    items: [
      { w: "That&rsquo;s an interesting question", d: "buys a moment to plan before a Part 3 answer", x: "That&rsquo;s an interesting question &mdash; I&rsquo;ve never really thought about it." },
      { w: "Let me think for a second", d: "signals you are thinking, not stuck, without dead silence", x: "Let me think for a second&hellip; I suppose the main reason is cost." },
      { w: "Well, it depends", d: "natural opener that earns thinking time and sets up nuance", x: "Well, it depends &mdash; for some people it&rsquo;s great, for others not so much." },
      { w: "Off the top of my head", d: "introduce a quick, unprepared answer", x: "Off the top of my head, I&rsquo;d say convenience is the biggest factor." },
      { w: "How can I put this", d: "buys time while you search for the right wording", x: "How can I put this&hellip; it&rsquo;s a bit of a double-edged sword." },
      { w: "The thing is", d: "flags that the real point is coming", x: "The thing is, most people simply don&rsquo;t have the time." }
    ]
  },
  {
    g: "Giving an opinion", sense: "state your view clearly (Part 3)", tag: "p3",
    items: [
      { w: "If you ask me", d: "casual, natural way to introduce a personal opinion", x: "If you ask me, social media does more harm than good." },
      { w: "I&rsquo;d say (that)", d: "soft, fluent way to commit to a view", x: "I&rsquo;d say education is by far the most important factor." },
      { w: "Personally", d: "signal a personal stance to open an answer", x: "Personally, I think working from home suits most people." },
      { w: "As far as I&rsquo;m concerned", d: "emphatic way to mark a firm personal opinion", x: "As far as I&rsquo;m concerned, it&rsquo;s the government&rsquo;s responsibility." },
      { w: "I&rsquo;m a firm believer in", d: "strong, confident statement of a value or view", x: "I&rsquo;m a firm believer in learning by doing." },
      { w: "I tend to think", d: "soften an opinion so it sounds measured, not dogmatic", x: "I tend to think people worry about it more than they need to." }
    ]
  },
  {
    g: "Agreeing &amp; disagreeing", sense: "respond to a view (Part 3)", tag: "p3",
    items: [
      { w: "I couldn&rsquo;t agree more", d: "emphatic agreement; stronger than &lsquo;I agree&rsquo;", x: "I couldn&rsquo;t agree more &mdash; it&rsquo;s exactly what I was thinking." },
      { w: "That&rsquo;s a fair point, but", d: "concede before disagreeing &mdash; sounds balanced", x: "That&rsquo;s a fair point, but I still think the benefits win out." },
      { w: "I see what you mean, however", d: "acknowledge then push back politely", x: "I see what you mean, however the evidence suggests otherwise." },
      { w: "I&rsquo;m not so sure about that", d: "disagree gently without being blunt", x: "I&rsquo;m not so sure about that, to be honest." },
      { w: "It&rsquo;s not as simple as that", d: "challenge an over-simple claim and add nuance", x: "It&rsquo;s not as simple as that &mdash; there are trade-offs either way." },
      { w: "up to a point", d: "agree partially, leaving room to qualify", x: "I agree up to a point, but it has its downsides too." }
    ]
  },
  {
    g: "Degrees of certainty", sense: "speculate &amp; predict (Part 3)", tag: "p3",
    items: [
      { w: "It&rsquo;s bound to", d: "express near-certainty about the future", x: "Prices are bound to keep rising over the next few years." },
      { w: "There&rsquo;s a good chance (that)", d: "state a strong probability", x: "There&rsquo;s a good chance remote work will become the norm." },
      { w: "It&rsquo;s highly unlikely", d: "express strong doubt about something happening", x: "It&rsquo;s highly unlikely things will go back to how they were." },
      { w: "I suppose / I imagine", d: "soft speculation when you&rsquo;re unsure", x: "I imagine most people would prefer the convenience." },
      { w: "presumably", d: "draw a likely inference; sounds analytical", x: "Presumably, that&rsquo;s why younger people are leaving the area." },
      { w: "in all likelihood", d: "formal hedge for a confident prediction", x: "In all likelihood, technology will solve part of the problem." }
    ]
  },
  {
    g: "Linking &amp; sequencing", sense: "join ideas naturally (any part)", tag: "all",
    items: [
      { w: "on top of that", d: "add a further point; more natural than &lsquo;moreover&rsquo; in speech", x: "It&rsquo;s cheap, and on top of that it&rsquo;s really convenient." },
      { w: "the thing is", d: "introduce the key point or a complication", x: "The thing is, not everyone can afford it." },
      { w: "what&rsquo;s more", d: "spoken linker for an extra, stronger point", x: "It saves time, and what&rsquo;s more, it&rsquo;s better for the planet." },
      { w: "having said that", d: "signal a contrast with what you just said", x: "I love the city. Having said that, it can get exhausting." },
      { w: "eventually", d: "mark the final stage of a sequence (better than &lsquo;and then&rsquo;)", x: "We got lost, walked for hours, and eventually found the place." },
      { w: "as a result", d: "introduce a consequence in a clear chain", x: "I started exercising, and as a result I sleep far better now." }
    ]
  },
  {
    g: "Giving examples", sense: "illustrate a point (any part)", tag: "all",
    items: [
      { w: "for instance", d: "introduce a specific example; varies from &lsquo;for example&rsquo;", x: "Take my brother, for instance &mdash; he works entirely from home." },
      { w: "take &hellip; for example", d: "spotlight one case to prove a general point", x: "Take big cities, for example &mdash; the cost of living is huge." },
      { w: "a good example (of this) would be", d: "set up a clear illustration", x: "A good example would be how quickly phones replaced cameras." },
      { w: "let&rsquo;s say", d: "introduce a hypothetical example", x: "Let&rsquo;s say you move abroad &mdash; you&rsquo;d have to start from scratch." },
      { w: "in my case", d: "give a personal example to support a claim", x: "In my case, learning a language opened a lot of doors." },
      { w: "I remember when", d: "lead into a short personal anecdote (great for Part 2)", x: "I remember when I first tried it &mdash; I was terrible at it." }
    ]
  },
  {
    g: "Likes, dislikes &amp; preferences", sense: "talk about what you enjoy (Part 1)", tag: "p1",
    items: [
      { w: "I&rsquo;m really into", d: "express strong enjoyment of a hobby or topic", x: "I&rsquo;m really into hiking &mdash; I go most weekends." },
      { w: "I can&rsquo;t stand", d: "express strong dislike; vivid and natural", x: "I can&rsquo;t stand being stuck in traffic." },
      { w: "it&rsquo;s not really my cup of tea", d: "say you&rsquo;re not keen on something, idiomatically", x: "Opera&rsquo;s not really my cup of tea, to be honest." },
      { w: "I&rsquo;d much rather", d: "state a clear preference between options", x: "I&rsquo;d much rather read a book than watch TV." },
      { w: "I&rsquo;ve grown to love", d: "describe a preference that developed over time", x: "I&rsquo;ve grown to love cooking since I moved out." },
      { w: "I&rsquo;m a big fan of", d: "express enthusiasm for something", x: "I&rsquo;m a big fan of live music &mdash; there&rsquo;s nothing like it." }
    ]
  },
  {
    g: "Past &amp; habits", sense: "talk about before (Part 1 &amp; 2)", tag: "p1",
    items: [
      { w: "I used to", d: "describe a past habit that has stopped", x: "I used to collect stamps when I was a kid." },
      { w: "back when I was", d: "frame a memory in a past period", x: "Back when I was at school, we barely used computers." },
      { w: "I&rsquo;ve always", d: "present perfect for a lifelong trait or habit", x: "I&rsquo;ve always been a bit of a night owl." },
      { w: "it brings back memories", d: "react to a nostalgic topic naturally", x: "That song really brings back memories of my teens." },
      { w: "if I remember rightly", d: "hedge a memory you&rsquo;re not 100% sure of", x: "If I remember rightly, it was about ten years ago." },
      { w: "at the time", d: "anchor a feeling or fact to a past moment", x: "At the time, I had no idea how much it would matter." }
    ]
  },
  {
    g: "Narrating the long turn", sense: "tell the story (Part 2)", tag: "p2",
    items: [
      { w: "I&rsquo;d like to talk about", d: "the standard, clean way to frame your Part 2 topic", x: "I&rsquo;d like to talk about a trip that really stuck with me." },
      { w: "what stood out was", d: "highlight the memorable detail of an experience", x: "What stood out was how friendly everyone was." },
      { w: "the reason it was so memorable", d: "set up the &lsquo;why&rsquo; bullet point", x: "The reason it was so memorable is that I&rsquo;d never done anything like it." },
      { w: "to set the scene", d: "introduce background before the main event", x: "To set the scene, it was the middle of winter and freezing." },
      { w: "looking back", d: "reflect to round off and fill the full two minutes", x: "Looking back, it taught me to be more independent." },
      { w: "all in all", d: "wrap up the long turn with an overall impression", x: "All in all, it was one of the best decisions I&rsquo;ve made." }
    ]
  },
  {
    g: "Comparing &amp; contrasting", sense: "weigh two things (Part 3)", tag: "p3",
    items: [
      { w: "whereas", d: "contrast two ideas in one sentence", x: "City life is fast-paced, whereas the countryside is calmer." },
      { w: "compared to", d: "set one thing against another", x: "Compared to ten years ago, everything is far more digital." },
      { w: "by contrast", d: "open a sentence marking a clear difference", x: "Older generations saved more. By contrast, many young people spend freely." },
      { w: "nowhere near as &hellip; as", d: "emphasise a big gap between two things", x: "It&rsquo;s nowhere near as expensive as people assume." },
      { w: "the flip side", d: "introduce the opposite angle or downside", x: "The flip side is that it can be quite isolating." },
      { w: "there&rsquo;s a trade-off between", d: "frame a balanced comparison of pros and cons", x: "There&rsquo;s a trade-off between convenience and privacy." }
    ]
  },
  {
    g: "Reacting &amp; emphasising", sense: "add colour &amp; stress (any part)", tag: "all",
    items: [
      { w: "to be honest", d: "soften or emphasise a frank opinion", x: "To be honest, I&rsquo;ve never really enjoyed it." },
      { w: "absolutely / definitely", d: "strong agreement or emphasis on an adjective", x: "It was absolutely freezing that day." },
      { w: "what really gets me is", d: "emphatic way to introduce a strong feeling", x: "What really gets me is how wasteful it all is." },
      { w: "believe it or not", d: "flag a surprising fact and add interest", x: "Believe it or not, I&rsquo;d never travelled before then." },
      { w: "genuinely", d: "stress sincerity; a natural intensifier", x: "I was genuinely amazed by how good it was." },
      { w: "more than anything", d: "single out the strongest reason or feeling", x: "More than anything, it gave me confidence." }
    ]
  }
];

window.SPEAKING = SPEAKING;
window.SLANG = SLANG;
