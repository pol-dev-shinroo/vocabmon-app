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
  { id: 1, word: "consequence", pos: "noun", definition: "(noun) something that happens as a result of a particular action or set of conditions", sentence: "The slightest error can have serious consequences." },
  { id: 2, word: "plague", pos: "noun", definition: "(noun) a disease that causes death and that spreads quickly to a large number of people", sentence: "Thousands of people died during the plague." },
  { id: 3, word: "prey", pos: "noun", definition: "(noun) an animal that is hunted or killed by another animal for food", sentence: "The bird circled above looking for prey." },
  { id: 4, word: "physician", pos: "noun", definition: "(noun) a medical doctor", sentence: "A physician is a doctor who treats people with medicine." },
  { id: 5, word: "mercy", pos: "noun", definition: "(noun) kind or forgiving treatment of someone who could be treated harshly", sentence: "She fell to her knees and asked for mercy." },
  { id: 6, word: "fatigue", pos: "noun", definition: "(noun) the state of being very tired : extreme weariness", sentence: "We were overcome by fatigue after the long journey." },
  { id: 7, word: "affection", pos: "noun", definition: "(noun) a feeling of liking and caring for someone or something", sentence: "She has deep affection for her parents." },
  { id: 8, word: "fraction", pos: "noun", definition: "(noun) ① a number (such as 1/2 or 3/4) which indicates that one number is being divided by another ② a part or amount of something", sentence: "We've described only a small fraction of the available options." },
  { id: 9, word: "district", pos: "noun", definition: "(noun) an area or section of a country, city, or town such as an area established by a government for official government business", sentence: "Six police officers are in charge of the district." },
  { id: 10, word: "faculty", pos: "noun", definition: "(noun) the group of teachers in a school or college", sentence: "She's a member of the Harvard faculty." },
  { id: 11, word: "luxury", pos: "noun", definition: "(noun) a condition or situation of great comfort, ease, and wealth", sentence: "Eating dinner at the fancy restaurant was a luxury for our family." },
  { id: 12, word: "minimum", pos: "noun", definition: "(noun) the lowest number or amount that is possible or allowed", sentence: "I will need a minimum of three weeks to finish my report." },
  { id: 13, word: "sermon", pos: "noun", definition: "(noun) a speech about a moral or religious subject that is usually given by a religious leader", sentence: "He preached a sermon on the importance of kindness." },
  { id: 14, word: "core", pos: "noun", definition: "(noun) the central part of something", sentence: "The core of his lecture has to do with the improvement of quality." },
  { id: 15, word: "vice", pos: "noun", definition: "(noun) bad or immoral behavior or habits", sentence: "Gambling and drug abuse are vices." },
  { id: 16, word: "impact", pos: "noun", definition: "(noun) a powerful or major influence or effect / the act or force of one thing hitting another", sentence: "The book had a huge impact when it first came out." },
  { id: 17, word: "charity", pos: "noun", definition: "(noun) the act of giving money, food, or other kinds of help to people who are poor, sick, etc.", sentence: "The holidays are a time for charity and good will." },
  { id: 18, word: "defect", pos: "noun", definition: "(noun) a problem or fault that makes someone or something not perfect", sentence: "This small defect greatly reduces the diamond's value." },
  { id: 19, word: "virtue", pos: "noun", definition: "(noun) morally good behavior or character", sentence: "I urge you all to lead lives of virtue." },
  { id: 20, word: "cliff", pos: "noun", definition: "(noun) a high, steep surface of rock, earth, or ice", sentence: "Standing at the edge of the cliff, we watched the waves crash on the shore far below." },
  { id: 21, word: "peninsula", pos: "noun", definition: "(piece of land that is almost entirely surrounded by water and is attached to a larger land area", sentence: "They built their house on a narrow peninsula." },
  { id: 22, word: "specimen", pos: "noun", definition: "(noun) something such as an animal or plant collected as an example of a particular kind of thing", sentence: "The doctor took a specimen of my blood." },
  { id: 23, word: "mass", pos: "noun", definition: "(noun) a usually large amount of a substance that has no particular shape", sentence: "The slush froze into an icy mass." },
  { id: 24, word: "inhabitant", pos: "noun", definition: "(noun) a person or animal that lives in a particular place", sentence: "The city has more than a million inhabitants." },
  { id: 25, word: "scenery", pos: "noun", definition: "(noun) a view of natural features such as mountains, hills, valleys, etc that is pleasing to look at", sentence: "We went for a drive to enjoy the scenery." },
  { id: 26, word: "vogue", pos: "noun", definition: "(noun) something such as a way of dressing or behaving that is fashionable or popular in a particular time and place", sentence: "Short skirts are in vogue right now." },
  { id: 27, word: "dialect", pos: "noun", definition: "(noun) a form of a language that is spoken in a particular area and that uses some of its own words, grammar, and pronunciations", sentence: "They speak a southern dialect of French." },
  { id: 28, word: "merit", pos: "noun", definition: "(noun) a good quality or feature that deserves to be praised", sentence: "The great merit of this plan is its simplicity." },
  { id: 29, word: "ritual", pos: "noun", definition: "(noun) a formal ceremony or series of acts that is always performed in the same way", sentence: "The priest will perform the ritual." },
  { id: 30, word: "theme", pos: "noun", definition: "(noun) the main subject that is being discussed or described in a piece of writing, a movie, etc.", sentence: "A constant theme in his novels is religion." },
  { id: 31, word: "interval", pos: "noun", definition: "(noun) a period of time between events", sentence: "There might be long intervals during which nothing happens." },
  { id: 32, word: "emigrant", pos: "noun", definition: "(noun) a person who leaves a country or region to live in another one", sentence: "Millions of European emigrants came to America in the 19th century." },
  { id: 33, word: "destination", pos: "noun", definition: "(noun) a place to which a person is going or something is being sent", sentence: "After stopping for lunch, we continued on toward our destination." },
  { id: 34, word: "grief", pos: "noun", definition: "(noun) deep sadness caused especially by someone's death", sentence: "He has been unable to recover from his grief at his son's death." },
  { id: 35, word: "reception", pos: "noun", definition: "(noun) the kind of welcome that someone or something is given", sentence: "The performers did not get the warm reception they had hoped for." },
  { id: 36, word: "extent", pos: "noun", definition: "(noun) the range, distance, or space that is covered or affected by something or included in something", sentence: "She tried to determine the extent of the damage." },
  { id: 37, word: "resume", pos: "verb", definition: "(verb) to begin again after stopping", sentence: "The game resumed after the rain stopped." },
  { id: 38, word: "sustain", pos: "verb", definition: "(verb) to provide what is needed for something or someone to exist, continue, etc.", sentence: "There is not enough oxygen to sustain life at very high altitudes." },
  { id: 39, word: "paralyze", pos: "verb", definition: "(verb) to make a person or animal unable to move or feel all or part of the body", sentence: "The accident paralyzed him from the neck down." },
  { id: 40, word: "linger", pos: "verb", definition: "(verb) to stay somewhere beyond the usual or expected time", sentence: "The tourists didn't linger very long." },
  { id: 41, word: "stammer", pos: "verb", definition: "(verb) to speak with many pauses and repetitions because you have a speech problem or because you are very nervous, frightened, etc.", sentence: "He stammers when he's nervous." },
  { id: 42, word: "exceed", pos: "verb", definition: "(verb) to be greater or more than something", sentence: "The cost must not exceed 10 dollars." },
  { id: 43, word: "detect", pos: "verb", definition: "(verb) to discover or notice the presence of something that is hidden or hard to see, hear, taste, etc.", sentence: "The test is used to detect the presence of alcohol in the blood." },
  { id: 44, word: "misuse", pos: "verb", definition: "(verb) to use something incorrectly", sentence: "She's charged with misusing company funds." },
  { id: 45, word: "resolve", pos: "verb", definition: "(verb) to find an answer or solution to something", sentence: "The brothers finally resolved their conflict." },
  { id: 46, word: "surpass", pos: "verb", definition: "(verb) to be better or greater than someone or something", sentence: "She soon surpassed her teacher in skill and proficiency." },
  { id: 47, word: "wither", pos: "verb", definition: "(verb) to become dry and weak", sentence: "The plants withered and died." },
  { id: 48, word: "refine", pos: "verb", definition: "(verb) to remove the unwanted substances in something / to improve something by making small changes", sentence: "The inventor of the machine spent years refining the design." },
  { id: 49, word: "transplant", pos: "verb", definition: "(verb) to remove a plant from the ground or from a pot and move it to another place", sentence: "The bush was transplanted to a different part of the garden." },
  { id: 50, word: "console", pos: "verb", definition: "(verb) to try to make someone feel less sadness or disappointment", sentence: "She consoled him after his wife died." }
];
