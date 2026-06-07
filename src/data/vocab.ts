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
  { id: 1, word: "stern", pos: "adj", definition: "(adj) very serious especially in an unfriendly way", sentence: "Journalists received a stern warning not to go anywhere near the battleship." },
  { id: 2, word: "ambiguous", pos: "adj", definition: "(adj) able to be understood in more than one way : having more than one possible meaning", sentence: "We were confused by the ambiguous wording of the message." },
  { id: 3, word: "transient", pos: "adj", definition: "(adj) not lasting long", sentence: "Youthful beauty is transient." },
  { id: 4, word: "dominant", pos: "adj", definition: "(adj) more important, powerful, or successful than most or all others", sentence: "The university plays a dominant role in the local economy." },
  { id: 5, word: "unprecedented", pos: "adj", definition: "(adj) not done or experienced before", sentence: "The team has enjoyed unprecedented success this year." },
  { id: 6, word: "akin", pos: "adj", definition: "(adj) similar or related", sentence: "The two languages are closely akin to one another." },
  { id: 7, word: "frugal", pos: "adj", definition: "(adj) careful about spending money or using things when you do not need to : using money or supplies in a very careful way", sentence: "She's very frugal with her money." },
  { id: 8, word: "prudent", pos: "adj", definition: "(adj) having or showing careful good judgment", sentence: "He always listened to her prudent advice." },
  { id: 9, word: "incredulous", pos: "adj", definition: "(adj) not able or willing to believe something : feeling or showing a lack of belief", sentence: "Many people were incredulous that such a small fire could have caused so much damage." },
  { id: 10, word: "ironic", pos: "adj", definition: "(adj) using words that mean the opposite of what you really think especially in order to be funny", sentence: "She has an ironic sense of humor." },
  { id: 11, word: "satirical", pos: "adj", definition: "(adj) using humor to show that someone or something is foolish, weak, bad, etc. : humor that shows the weaknesses or bad qualities of a person, government, society, etc.", sentence: "The historical piece delivers a striking satirical message." },
  { id: 12, word: "skeptical", pos: "adj", definition: "(adj) having or expressing doubt about something", sentence: "When I said I'd finished my homework early, Mom looked skeptical." },
  { id: 13, word: "audible", pos: "adj", definition: "(adj) heard or able to be heard", sentence: "Her voice was barely audible over the noise." },
  { id: 14, word: "edible", pos: "adj", definition: "(adj) suitable or safe to eat", sentence: "All of the decorations on the gingerbread house were edible." },
  { id: 15, word: "perpetual", pos: "adj", definition: "(adj) continuing forever or for a very long time without stopping", sentence: "The region is in a state of perpetual war." },
  { id: 16, word: "staple", pos: "adj", definition: "(adj) used, needed, or enjoyed constantly by many people", sentence: "That's a staple plot in mystery novels." },
  { id: 17, word: "spontaneous", pos: "adj", definition: "(adj) done or said in a natural and often sudden way and without a lot of thought or planning", sentence: "His jokes seemed spontaneous, but were in fact carefully prepared beforehand." },
  { id: 18, word: "reckless", pos: "adj", definition: "(adj) not showing proper concern about the possible bad results of your actions", sentence: "She has gotten two tickets for reckless driving." },
  { id: 19, word: "scanty", pos: "adj", definition: "(adj) very small in size or amount", sentence: "The cheerleaders wore scanty outfits." },
  { id: 20, word: "immense", pos: "adj", definition: "(adj) very great in size or amount", sentence: "He inherited an immense fortune." },
  { id: 21, word: "wretched", pos: "adj", definition: "(adj) very unhappy, ill, etc.", sentence: "I don't know what's wrong with her, but she looks wretched." },
  { id: 22, word: "extravagant", pos: "adj", definition: "(adj) more than is usual, necessary, or proper", sentence: "The company has been making extravagant claims about the drug's effectiveness." },
  { id: 23, word: "Antarctic", pos: "adj", definition: "(adj) Antarctica and the ocean around it", sentence: "The group is involved in Antarctic exploration." },
  { id: 24, word: "feudal", pos: "adj", definition: "(adj) relating to a social system that existed in Europe during the Middle Ages in which people worked and fought for nobles who gave them protection and the use of land in return", sentence: "Peasants made up the greatest portion in the feudal system." },
  { id: 25, word: "tranquil", pos: "adj", definition: "(adj) quiet and peaceful", sentence: "She stared at the tranquil surface of the water." },
  { id: 26, word: "inherent", pos: "adj", definition: "(adj) belonging to the basic nature of someone or something", sentence: "She believes that goodness is inherent in all people." },
  { id: 27, word: "manual", pos: "adj", definition: "(adj) doing or involving hard physical work", sentence: "She spent the summer doing manual labor on her uncle's farm." },
  { id: 28, word: "cynical", pos: "adj", definition: "(adj) believing that people are generally selfish and dishonest", sentence: "Cynical people say there is no such thing as true love." },
  { id: 29, word: "fragile", pos: "adj", definition: "(adj) easily broken or damaged", sentence: "The glass dish is very fragile." },
  { id: 30, word: "elastic", pos: "adj", definition: "(adj) able to return to an original shape or size after being stretched, squeezed, etc.", sentence: "A lot of sportswear is made of very elastic material." },
  { id: 31, word: "plausible", pos: "adj", definition: "(adj) possibly true : believable or realistic", sentence: "I thought her explanation was completely plausible." },
  { id: 32, word: "conservative", pos: "adj", definition: "(adj) believing in the value of established and traditional practices in politics and society : relating to or supporting political conservatism", sentence: "Older people tend to be more conservative and a bit suspicious of anything new." },
  { id: 33, word: "static", pos: "adj", definition: "(adj) showing little or no change, action, or progress", sentence: "The computer program can turn static images into movies." },
  { id: 34, word: "manifest", pos: "adj", definition: "(adj) able to be seen : clearly shown or visible", sentence: "His love for literature is manifest in his large library." },
  { id: 35, word: "legitimate", pos: "adj", definition: "(adj) allowed according to rules or laws", sentence: "Who is the legitimate heir to the throne?" },
  { id: 36, word: "virtuous", pos: "adj", definition: "(adj) morally good : having or showing virtue", sentence: "She felt that she had made a virtuous decision by donating the money to charity." },
  { id: 37, word: "obsolete", pos: "adj", definition: "(adj) no longer used because something newer exists", sentence: "The system was made obsolete by their invention." },
  { id: 38, word: "relevant", pos: "adj", definition: "(adj) relating to a subject in an appropriate way", sentence: "Her comments were not relevant to the discussion." },
  { id: 39, word: "notorious", pos: "adj", definition: "(adj) well-known or famous especially for something bad", sentence: "The coach is notorious for his violent outbursts." },
  { id: 40, word: "strenuous", pos: "adj", definition: "(adj) requiring or showing great energy and effort", sentence: "Avoid all strenuous exercise until the sprain heals." },
  { id: 41, word: "solemn", pos: "adj", definition: "(adj) very serious or formal in manner, behavior, or expression", sentence: "He recited the poem in a solemn voice." },
  { id: 42, word: "intricate", pos: "adj", definition: "(adj) having many parts", sentence: "The movie has an intricate plot." },
  { id: 43, word: "pessimistic", pos: "adj", definition: "(adj) having or showing a lack of hope for the future : expecting bad things to happen", sentence: "Most doctors were pessimistic that a cure could be found." },
  { id: 44, word: "tedious", pos: "adj", definition: "(adj) boring and too slow or long", sentence: "He made a tedious 45-minute speech." },
  { id: 45, word: "aggressive", pos: "adj", definition: "(adj) ready and willing to fight, argue, etc. : feeling or showing aggression", sentence: "He started to get aggressive and began to shout." },
  { id: 46, word: "compulsory", pos: "adj", definition: "(adj) required by a law or rule", sentence: "Attendance is compulsory for all students." },
  { id: 47, word: "radical", pos: "adj", definition: "(adj) very new and different from what is traditional or ordinary", sentence: "The computer has introduced radical innovations." },
  { id: 48, word: "eccentric", pos: "adj", definition: "(adj) tending to act in strange or unusual ways", sentence: "She had an eccentric habit of collecting stray cats." },
  { id: 49, word: "crucial", pos: "adj", definition: "(adj) extremely important", sentence: "It is crucial that the report should be on time." },
  { id: 50, word: "respectable", pos: "adj", definition: "(adj) considered to be good, correct, or acceptable : decent or correct in character, behavior, or appearance", sentence: "His parents are poor but respectable people." }
];
