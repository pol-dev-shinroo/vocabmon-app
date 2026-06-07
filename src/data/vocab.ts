export type VocabWord = {
  id: number;
  word: string;
  pos: string;
  definition: string;
  sentence?: string;
  keywords?: string[];
  imageUrl?: string;
};

export const vocabData: VocabWord[] = [
  { id: 1, word: "adequate", pos: "adj", definition: "(adj) enough for some need or requirement", sentence: "Be sure to allow adequate time for the drive to the airport." },
  { id: 2, word: "profound", pos: "adj", definition: "(adj) having or showing great knowledge or understanding", sentence: "His knowledge of history is profound." },
  { id: 3, word: "primitive", pos: "adj", definition: "(adj) of, belonging to, or seeming to come from an early time in the very ancient past", sentence: "The tools used by the primitive men were made of stones." },
  { id: 4, word: "precise", pos: "adj", definition: "(adj) very accurate and exact", sentence: "Be sure to take precise measurements before you cut the cloth." },
  { id: 5, word: "keen", pos: "adj", definition: "(adj) having or showing an ability to think clearly and to understand what is not obvious or simple about something", sentence: "She's a very keen observer of the political world." },
  { id: 6, word: "sacred", pos: "adj", definition: "(adj) worthy of religious worship : very holy", sentence: "The burial site is sacred ground." },
  { id: 7, word: "peculiar", pos: "adj", definition: "(adj) not usual or normal", sentence: "It seems peculiar that he would leave town and not tell anybody." },
  { id: 8, word: "noble", pos: "adj", definition: "(adj) having, showing, or coming from personal qualities that people admire (such as honesty, generosity, courage, etc.)", sentence: "He made a noble effort." },
  { id: 9, word: "mutual", pos: "adj", definition: "(adj) shared between two or more people or groups", sentence: "We met through a mutual friend." },
  { id: 10, word: "fundamental", pos: "adj", definition: "(adj) forming or relating to the most important part of something", sentence: "The constitution ensures our fundamental rights." },
  { id: 11, word: "absolute", pos: "adj", definition: "(adj) complete and total", sentence: "He swore an absolute oath to the king." },
  { id: 12, word: "internal", pos: "adj", definition: "(adj) existing or occurring within an organization", sentence: "The company launched an internal investigation into the scandal." },
  { id: 13, word: "parallel", pos: "adj", definition: "(adj) very similar and often happening at the same time", sentence: "They have parallel careers." },
  { id: 14, word: "concrete", pos: "adj", definition: "(adj) relating to or involving specific people, things, or actions rather than general ideas or qualities", sentence: "It's helpful to have concrete examples of how words are used in context." },
  { id: 15, word: "tense", pos: "adj", definition: "(adj) nervous and not able to relax", sentence: "I could feel my body get tense." },
  { id: 16, word: "rigid", pos: "adj", definition: "(adj) not able to be bent easily : stiff", sentence: "The building has a rigid framework." },
  { id: 17, word: "radical", pos: "adj", definition: "(adj) having extreme political or social views that are not shared by most people", sentence: "She was known as a radical in her college days." },
  { id: 18, word: "steep", pos: "adj", definition: "(adj) almost straight up and down : rising or falling very sharply", sentence: "The stairs were very steep." },
  { id: 19, word: "random", pos: "adj", definition: "(adj) chosen, done, etc., without a particular plan or pattern", sentence: "We tasted the wines in random order." },
  { id: 20, word: "neutral", pos: "adj", definition: "(adj) not supporting either side of an argument, fight, war, etc.", sentence: "He remained neutral while his brothers argued." },
  { id: 21, word: "subtle", pos: "adj", definition: "(adj) hard to notice or see", sentence: "There is a subtle difference in meaning between the words." },
  { id: 22, word: "solemn", pos: "adj", definition: "(adj) very serious or formal in manner, behavior, or expression", sentence: "A solemn crowd gathered around the grave." },
  { id: 23, word: "rational", pos: "adj", definition: "(adj) based on facts or reason and not on emotions or feelings", sentence: "He's asking you to look at both sides of the case and come to a rational decision." },
  { id: 24, word: "shallow", pos: "adj", definition: "(adj) not having much depth", sentence: "The lake is quite shallow." },
  { id: 25, word: "horizontal", pos: "adj", definition: "(adj) positioned from side to side rather than up and down", sentence: "We painted horizontal lines on the wall." },
  { id: 26, word: "intermediate", pos: "adj", definition: "(adj) occurring in the middle of a process or series", sentence: "These fossils represent an intermediate stage in the evolution of the species." },
  { id: 27, word: "supreme", pos: "adj", definition: "(adj) highest in rank or authority", sentence: "The Pope is the supreme leader of the Roman Catholic Church." },
  { id: 28, word: "delicate", pos: "adj", definition: "(adj) easily broken or damaged", sentence: "The cups are made of delicate porcelain." },
  { id: 29, word: "deliberate", pos: "adj", definition: "(adj) done or said in a way that is planned or intended", sentence: "He made a deliberate attempt to ruin her." },
  { id: 30, word: "absurd", pos: "adj", definition: "(adj) completely stupid or unreasonable", sentence: "It's absurd to believe that the earth is flat." },
  { id: 31, word: "bare", pos: "adj", definition: "(adj) not covered by leaves, grass, trees, or plants", sentence: "The winter landscape was bare." },
  { id: 32, word: "approximate", pos: "adj", definition: "(adj) almost correct or exact", sentence: "The approximate time of the accident was 5:00 p.m." },
  { id: 33, word: "immune", pos: "adj", definition: "(adj) not capable of being affected by a disease", sentence: "Most people are immune to the disease." },
  { id: 34, word: "objective", pos: "adj", definition: "(adj) based on facts rather than feelings or opinions", sentence: "We need someone outside the company to give us an objective analysis." },
  { id: 35, word: "obscure", pos: "adj", definition: "(adj) not well-known : not known to most people", sentence: "The movie is full of obscure references that only pop culture enthusiasts will understand." },
  { id: 36, word: "valid", pos: "adj", definition: "(adj) fair or reasonable", sentence: "There is no valid reason for you to stay." },
  { id: 37, word: "intact", pos: "adj", definition: "(adj) not broken or damaged : having every part", sentence: "The house survived the war intact." },
  { id: 38, word: "partial", pos: "adj", definition: "(adj) not complete or total", sentence: "These plants prefer partial shade." },
  { id: 39, word: "subjective", pos: "adj", definition: "(adj) based on feelings or opinions rather than facts", sentence: "The judge's decision was highly subjective." },
  { id: 40, word: "spontaneous", pos: "adj", definition: "(adj) done or said in a natural and often sudden way and without a lot of thought or planning", sentence: "He made a spontaneous decision to buy a new car." },
  { id: 41, word: "arbitrary", pos: "adj", definition: "(adj) not planned or chosen for a particular reason : not based on reason or evidence", sentence: "I don't know why I chose that one; it was a completely arbitrary decision." },
  { id: 42, word: "prominent", pos: "adj", definition: "(adj) important and well-known", sentence: "He quickly became a prominent member of the community." },
  { id: 43, word: "raw", pos: "adj", definition: "(adj) not cooked", sentence: "Raw meat must be kept separate from cooked meat." },
  { id: 44, word: "dense", pos: "adj", definition: "(adj) having parts that are close together", sentence: "As we drove further into the jungle, the vegetation became more dense." },
  { id: 45, word: "crude", pos: "adj", definition: "(adj) very simple and basic : made or done in a way that does not show a lot of skill", sentence: "They built a crude shelter out of branches." },
  { id: 46, word: "exotic", pos: "adj", definition: "(adj) very different, strange, or unusual", sentence: "She's known for her exotic tastes." },
  { id: 47, word: "implicit", pos: "adj", definition: "(adj) understood though not clearly or directly stated", sentence: "The agreement is implicit in the contract." },
  { id: 48, word: "vain", pos: "adj", definition: "(adj) having no success : not producing a desired result", sentence: "We made a vain attempt to fix the engine." },
  { id: 49, word: "alien", pos: "adj", definition: "(adj) from another country", sentence: "He is an alien resident of the United States." },
  { id: 50, word: "coarse", pos: "adj", definition: "(adj) having a rough quality", sentence: "The fabric is coarse and uncomfortable." }
];
