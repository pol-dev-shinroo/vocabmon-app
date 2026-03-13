export type VocabWord = {
  id: number;
  word: string;
  pos: string;
  definition: string;
  keywords?: string[];
  imageUrl?: string;
};

export const vocabData: VocabWord[] = [
  {
    id: 1,
    word: "attribute",
    pos: "verb",
    definition: "to say that something is because of someone or something",
    keywords: ["say", "because", "someone", "something"],
  },
  {
    id: 2,
    word: "proceed",
    pos: "verb",
    definition: "to continue to do something",
    keywords: ["continue", "something"],
  },
  {
    id: 3,
    word: "launch",
    pos: "verb",
    definition: "to begin something that requires much effort",
    keywords: ["begin", "requires", "effort"],
  },
  {
    id: 4,
    word: "fulfill",
    pos: "verb",
    definition:
      "to do what is required by something, such as a promise or a contract",
    keywords: ["required", "promise", "contract"],
  },
  {
    id: 5,
    word: "generate",
    pos: "verb",
    definition: "to produce something or cause something to be produced",
    keywords: ["produce", "cause", "produced"],
  },
  {
    id: 6,
    word: "undertake",
    pos: "verb",
    definition: "to begin or attempt something",
    keywords: ["begin", "attempt"],
  },
  {
    id: 7,
    word: "undergo",
    pos: "verb",
    definition: "to experience or endure something",
    keywords: ["experience", "endure"],
  },
  {
    id: 8,
    word: "assign",
    pos: "verb",
    definition:
      "to give someone a particular job or duty : to require someone to do a particular task",
    keywords: ["give", "job", "duty", "require", "task"],
  },
  {
    id: 9,
    word: "strain",
    pos: "verb",
    definition:
      "to injure a body part or muscle by too much tension, use, or effort / to try very hard to do or get something",
    keywords: ["injure", "muscle", "tension", "effort", "hard"],
  },
  {
    id: 10,
    word: "encounter",
    pos: "verb",
    definition: "to have or experience problems, difficulties, etc.",
    keywords: ["experience", "problems", "difficulties"],
  },
  {
    id: 11,
    word: "govern",
    pos: "verb",
    definition:
      "to officially control and lead a group of people : to make decisions about laws, taxes, social programs, etc., for a country, state, etc.",
    keywords: ["officially", "control", "lead", "decisions", "laws"],
  },
  {
    id: 12,
    word: "provide",
    pos: "verb",
    definition:
      "to make something available : to supply something that is wanted or needed",
    keywords: ["make", "available", "supply", "wanted", "needed"],
  },
  {
    id: 13,
    word: "conquer",
    pos: "verb",
    definition:
      "to take control of a country, city, etc. through the use of force",
    keywords: ["take", "control", "country", "city", "force"],
  },
  {
    id: 14,
    word: "maintain",
    pos: "verb",
    definition: "to cause something to exist or continue without changing",
    keywords: ["cause", "exist", "continue", "changing"],
  },
  {
    id: 15,
    word: "supply",
    pos: "verb",
    definition:
      "to make something available to be used : to provide someone or something with something that is needed or wanted",
    keywords: ["available", "provide", "needed", "wanted"],
  },
  {
    id: 16,
    word: "sway",
    pos: "verb",
    definition: "to move slowly back and forth",
    keywords: ["move", "slowly", "back", "forth"],
  },
  {
    id: 17,
    word: "vacant",
    pos: "adj",
    definition: "not filled, used, or lived in",
    keywords: ["filled", "used", "lived"],
  },
  {
    id: 18,
    word: "actual",
    pos: "adj",
    definition: "real and not merely possible or imagined : existing in fact",
    keywords: ["real", "possible", "imagined", "existing"],
  },
  {
    id: 19,
    word: "ridiculous",
    pos: "adj",
    definition: "extremely silly or unreasonable",
    keywords: ["extremely", "silly", "unreasonable"],
  },
  {
    id: 20,
    word: "ultimate",
    pos: "adj",
    definition:
      "happening or coming at the end of a process, series of events, etc.",
    keywords: ["happening", "coming", "process", "series", "events"],
  },
  {
    id: 21,
    word: "hospitable",
    pos: "adj",
    definition: "generous and friendly to guests or visitors",
    keywords: ["generous", "friendly", "guests", "visitors"],
  },
  {
    id: 22,
    word: "artificial",
    pos: "adj",
    definition:
      "not natural or real : made, produced, or done to seem like something natural",
    keywords: ["natural", "real", "made", "produced", "seem"],
  },
  {
    id: 23,
    word: "fierce",
    pos: "adj",
    definition: "① very violent ② eager to fight or kill",
    keywords: ["violent", "eager", "fight", "kill"],
  },
  {
    id: 24,
    word: "furious",
    pos: "adj",
    definition: "very angry",
    keywords: ["very", "angry"],
  },
  {
    id: 25,
    word: "formal",
    pos: "adj",
    definition: "requiring or using serious and proper clothes and manners",
    keywords: ["requiring", "using", "serious", "proper", "clothes", "manners"],
  },
  {
    id: 26,
    word: "oral",
    pos: "adj",
    definition: "of or relating to the mouth",
    keywords: ["relating", "mouth"],
  },
  {
    id: 27,
    word: "oblong",
    pos: "adj",
    definition:
      "① longer in one direction than in the other direction ② having four straight sides that meet at right angles having two opposite sides that are short and two opposite sides that are long",
    keywords: ["longer", "direction", "straight", "sides", "opposite", "short"],
  },
  {
    id: 28,
    word: "legal",
    pos: "adj",
    definition: "of or relating to the law",
    keywords: ["relating", "law"],
  },
  {
    id: 29,
    word: "sincere",
    pos: "adj",
    definition:
      "having or showing true feelings that are expressed in an honest way",
    keywords: ["showing", "true", "feelings", "expressed", "honest"],
  },
  {
    id: 30,
    word: "mental",
    pos: "adj",
    definition: "of or relating to the mind",
    keywords: ["relating", "mind"],
  },
  {
    id: 31,
    word: "visible",
    pos: "adj",
    definition: "able to be seen",
    keywords: ["able", "seen"],
  },
  {
    id: 32,
    word: "durable",
    pos: "adj",
    definition:
      "staying strong and in good condition over a long period of time",
    keywords: ["staying", "strong", "good", "condition", "period", "time"],
  },
  {
    id: 33,
    word: "genuine",
    pos: "adj",
    definition: "actual, real, or true : not false or fake",
    keywords: ["actual", "real", "true", "false", "fake"],
  },
  {
    id: 34,
    word: "fragrant",
    pos: "adj",
    definition: "having a pleasant and usually sweet smell",
    keywords: ["pleasant", "usually", "sweet", "smell"],
  },
  {
    id: 35,
    word: "content",
    pos: "adj",
    definition: "pleased and satisfied : not needing more",
    keywords: ["pleased", "satisfied", "needing"],
  },
  {
    id: 36,
    word: "barren",
    pos: "adj",
    definition: "having very few plants : not suitable for plants",
    keywords: ["having", "plants", "suitable"],
  },
  {
    id: 37,
    word: "abstract",
    pos: "adj",
    definition:
      "relating to or involving general ideas or qualities rather than specific people, objects, or actions",
    keywords: [
      "general",
      "ideas",
      "qualities",
      "specific",
      "people",
      "objects",
      "actions",
    ],
  },
  {
    id: 38,
    word: "contrary",
    pos: "adj",
    definition:
      "exactly opposite to something else : entirely different from something else",
    keywords: ["exactly", "opposite", "entirely", "different"],
  },
  {
    id: 39,
    word: "ignorant",
    pos: "adj",
    definition: "lacking knowledge or information",
    keywords: ["lacking", "knowledge", "information"],
  },
  {
    id: 40,
    word: "mutual",
    pos: "adj",
    definition: "shared between two or more people or groups",
    keywords: ["shared", "between", "people", "groups"],
  },
  {
    id: 41,
    word: "fertile",
    pos: "adj",
    definition:
      "producing many plants or crops : able to support the growth of many plants",
    keywords: ["producing", "plants", "crops", "support", "growth"],
  },
  {
    id: 42,
    word: "savage",
    pos: "adj",
    definition: "not under human control : wild",
    keywords: ["human", "control", "wild"],
  },
  {
    id: 43,
    word: "hostile",
    pos: "adj",
    definition: "not friendly : having or showing unfriendly feelings",
    keywords: ["friendly", "showing", "unfriendly", "feelings"],
  },
  {
    id: 44,
    word: "adequate",
    pos: "adj",
    definition: "enough for some need or requirement",
    keywords: ["enough", "need", "requirement"],
  },
  {
    id: 45,
    word: "concrete",
    pos: "adj",
    definition:
      "relating to or involving specific people, things, or actions rather than general ideas or qualities",
    keywords: [
      "specific",
      "people",
      "things",
      "actions",
      "general",
      "ideas",
      "qualities",
    ],
  },
  {
    id: 46,
    word: "financial",
    pos: "adj",
    definition: "relating to money",
    keywords: ["relating", "money"],
  },
  {
    id: 47,
    word: "nuclear",
    pos: "adj",
    definition:
      "of, relating to, producing, or using energy that is created when the nuclei of atoms are split apart or joined together",
    keywords: ["producing", "using", "energy", "created", "atoms", "split"],
  },
  {
    id: 48,
    word: "absurd",
    pos: "adj",
    definition:
      "extremely silly, foolish, or unreasonable : completely ridiculous",
    keywords: ["extremely", "silly", "foolish", "unreasonable", "ridiculous"],
  },
  {
    id: 49,
    word: "earnest",
    pos: "adj",
    definition: "serious and sincere : not lighthearted or playful",
    keywords: ["serious", "sincere", "lighthearted", "playful"],
  },
  {
    id: 50,
    word: "generous",
    pos: "adj",
    definition: "freely giving or sharing money and other valuable things",
    keywords: ["freely", "giving", "sharing", "money", "valuable"],
  },
];
