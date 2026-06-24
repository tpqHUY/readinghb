/* ============================================================
   models.js — annotated band-8 model answers.
   In each paragraph string, an annotated span is written as
     [[N|highlighted text]]
   where N is the 1-based index into that model's `notes` array.
   Each note: { crit: "TR"|"TA"|"CC"|"LR"|"GRA", t: explanation }
   ============================================================ */

const WMODELS = [
  {
    id: "t1-line", task: "Task 1", type: "Line graph", band: "Band 8",
    prompt: "The graph below shows the consumption of three types of fast food in Britain from 1970 to 1990 (grams per person per week). Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    paras: [
      "The line graph illustrates [[1|how much of three kinds of fast food - hamburgers, fish and chips, and pizza - was eaten in Britain]] over a twenty-year period from 1970 to 1990, measured in grams consumed per person each week.",
      "[[2|Overall, the consumption of hamburgers and pizza rose markedly across the period, whereas that of fish and chips fell]]; by 1990 hamburgers had become the most popular of the three.",
      "In 1970, [[3|fish and chips was by far the most popular]] dish, eaten at around 300 grams per person weekly - roughly twice the figure for hamburgers, which stood at just over 100 grams. Over the following two decades, however, its consumption [[4|declined steadily]], dipping to approximately 200 grams by 1990.",
      "Hamburgers and pizza followed the opposite pattern. Hamburger consumption climbed consistently, overtaking fish and chips at around 1985 [[5|before reaching a peak of roughly 500 grams]] in 1990. Pizza, [[6|though consistently the least eaten of the three]], also more than doubled, rising from about 20 to over 80 grams per week."
    ],
    notes: [
      { crit: "TR", t: "Paraphrases the prompt ('consumption of three types of fast food' becomes 'how much ... was eaten') and names the units and time frame." },
      { crit: "TA", t: "A clear overview of the two biggest trends, placed early and containing no specific figures." },
      { crit: "LR", t: "A superlative comparison ('by far the most popular') used precisely to rank the data." },
      { crit: "LR", t: "Verb + adverb ('declined steadily') reports the trend with both range and accuracy." },
      { crit: "GRA", t: "A participle clause ('before reaching a peak...') packs extra detail into one varied sentence." },
      { crit: "GRA", t: "A concessive 'though' clause embeds a comparison without starting a new sentence." }
    ]
  },

  {
    id: "t1-process", task: "Task 1", type: "Process diagram", band: "Band 8",
    prompt: "The diagram below shows how bricks are manufactured for the building industry. Summarise the information by selecting and reporting the main features.",
    paras: [
      "The diagram illustrates [[1|the various stages involved in the industrial production of bricks]], from the extraction of raw clay to the delivery of the finished product.",
      "[[2|Overall, brick-making is a linear process made up of seven main stages, beginning with the digging of clay and ending with packaging and dispatch]].",
      "To begin with, [[3|clay is dug from the ground using a large digger]] and passed through a metal grid onto a roller, which breaks it up. [[4|Sand and water are then added]] so that the mixture can be shaped into bricks, either by a wire cutter or in a mould.",
      "[[5|Once they have been formed]], the bricks are placed in a drying oven for one to two days. [[6|They are subsequently fired in a kiln, first at a moderate and then at a high temperature]], before being left to cool. Finally, the finished bricks are packaged and delivered to customers."
    ],
    notes: [
      { crit: "TR", t: "Paraphrases 'how bricks are manufactured' and frames the scope - from the first stage to the last." },
      { crit: "TA", t: "The overview states the number of stages and where the process begins and ends, with no detail and no data." },
      { crit: "LR", t: "The present passive ('is dug') is the correct, timeless register for describing a process." },
      { crit: "CC", t: "'then' sequences the stages cleanly, avoiding a string of 'and then ... and then'." },
      { crit: "GRA", t: "A time clause ('Once they have been formed') varies the sentence openings." },
      { crit: "LR", t: "'subsequently' and 'fired in a kiln' show precise sequencing and accurate topic vocabulary." }
    ]
  },

  {
    id: "t2-opinion", task: "Task 2", type: "Opinion essay", band: "Band 8",
    prompt: "Some people believe that children should be required to learn a foreign language at primary school. To what extent do you agree or disagree?",
    paras: [
      "[[1|It is sometimes argued that young children should be obliged to study a foreign language from their very first years of schooling]]. [[2|I strongly agree with this view]], chiefly because early exposure makes language learning easier and broadens children's cultural awareness.",
      "The most compelling reason is that [[3|young children acquire languages far more readily than adults do]]. Their brains are especially receptive to unfamiliar sounds and patterns, [[4|which means that skills learned early tend to become permanent]]. In Finland, for instance, pupils who begin English in primary school routinely achieve fluency by their teens - an outcome rarely reached by those who start later.",
      "[[5|A further benefit is that learning another language fosters cultural understanding]]. By engaging with foreign words and customs, children come to see the world from more than one perspective, which can make them more tolerant, open-minded adults. [[6|Although some argue that young learners are already overburdened]], a well-designed, playful language lesson adds variety rather than pressure.",
      "[[7|In conclusion, I firmly believe that introducing foreign languages at primary level is beneficial]], as it takes advantage of children's natural aptitude and nurtures a broader cultural awareness."
    ],
    notes: [
      { crit: "TR", t: "Paraphrases the prompt ('required to learn a foreign language at primary school') rather than copying it." },
      { crit: "TR", t: "States a clear, unambiguous position - the thesis - in the introduction, with a brief outline of the reasons." },
      { crit: "TR", t: "A topic sentence that states the paragraph's single main idea up front." },
      { crit: "GRA", t: "A relative clause ('which means that...') links cause and effect within one complex sentence." },
      { crit: "CC", t: "'A further benefit' connects this paragraph to the previous one naturally, without a mechanical linker." },
      { crit: "TR", t: "Concedes the opposing view briefly, then refutes it - a band-8 move that shows balance while keeping the position." },
      { crit: "TR", t: "Restates the position and summarises the two reasons, introducing no new ideas." }
    ]
  },

  {
    id: "t2-discussion", task: "Task 2", type: "Discussion + opinion", band: "Band 8",
    prompt: "Some people believe that university students should pay the full cost of their studies, while others think higher education should be free. Discuss both views and give your own opinion.",
    paras: [
      "[[1|There is ongoing debate over whether students should bear the full cost of their university education or whether it should be funded by the state]]. While both positions have merit, [[2|I believe that higher education should remain free, or at least heavily subsidised]].",
      "[[3|Those who favour full tuition fees argue that it is a matter of fairness]]. Since graduates personally benefit from higher lifetime earnings, [[4|it seems reasonable that they, rather than taxpayers, should fund their own degrees]]. Charging fees also gives universities the resources they need to maintain high standards.",
      "[[5|However, I find the case for free education more persuasive]]. [[6|If access to university depended on the ability to pay, talented students from poorer families would be excluded]], depriving society of their potential. Furthermore, an educated population benefits everyone through innovation and economic growth, which suggests that the cost is a worthwhile public investment.",
      "[[7|In conclusion, although charging fees can be justified on grounds of fairness, the wider social benefits of free education are, in my view, more important]]."
    ],
    notes: [
      { crit: "TR", t: "Paraphrases both of the views set out in the prompt." },
      { crit: "TR", t: "States the writer's own opinion in the introduction - the part of a discussion task most often forgotten." },
      { crit: "CC", t: "A topic sentence signalling that this paragraph presents the first view, fairly." },
      { crit: "LR", t: "Hedging ('it seems reasonable') keeps the claim measured and academic." },
      { crit: "CC", t: "'However' pivots to the second view and signals the writer's own stance." },
      { crit: "GRA", t: "A second-conditional sentence ('If access ... depended ... would be excluded') handles a hypothetical accurately." },
      { crit: "TR", t: "Summarises both views and restates the writer's opinion clearly - no new ideas." }
    ]
  }
];

window.WMODELS = WMODELS;
