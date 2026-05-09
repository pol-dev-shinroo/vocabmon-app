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
  { id: 1, word: "polar", pos: "adj", definition: "(adj) of or relating to the North or South Pole or the region around it", sentence: "That explorer has led many polar expeditions." },
  { id: 2, word: "obese", pos: "adj", definition: "(adj) very fat", sentence: "Obese people are more at risk from heart disease." },
  { id: 3, word: "deserted", pos: "adj", definition: "(adj) having no people or things in it", sentence: "These resort towns are largely deserted in winter." },
  { id: 4, word: "liberal", pos: "adj", definition: "(adj) generous to others", sentence: "She has always been liberal with her donations." },
  { id: 5, word: "crude", pos: "adj", definition: "(adj) very simple and basic : made or done in a way that does not show a lot of skill", sentence: "They built a crude shelter out of branches." },
  { id: 6, word: "virtual", pos: "adj", definition: "(adj) very close to being something without actually being it", sentence: "The country is ruled by a virtual dictator." },
  { id: 7, word: "spellbound", pos: "adj", definition: "(adj) giving all of your attention and interest to something or someone", sentence: "The children were spellbound by the puppet show." },
  { id: 8, word: "favorable", pos: "adj", definition: "(adj) showing approval", sentence: "The new play got many favorable reviews." },
  { id: 9, word: "cautious", pos: "adj", definition: "(adj) careful about avoiding danger or risk", sentence: "You cannot be overly cautious when you're driving in snow." },
  { id: 10, word: "stale", pos: "adj", definition: "(adj) no longer good or appealing", sentence: "The cake has turned stale already." },
  { id: 11, word: "ingenious", pos: "adj", definition: "(adj) very smart or clever", sentence: "The book has an ingenious plot." },
  { id: 12, word: "consistent", pos: "adj", definition: "(adj) always acting or behaving in the same way", sentence: "Data from recent experiments show consistent results." },
  { id: 13, word: "swift", pos: "adj", definition: "(adj) happening or done quickly or immediately", sentence: "Be swift to hear, slow to speak." },
  { id: 14, word: "remarkable", pos: "adj", definition: "(adj) unusual or surprising", sentence: "Competing in the Olympics is a remarkable achievement." },
  { id: 15, word: "instructive", pos: "adj", definition: "(adj) providing knowledge or information", sentence: "It was very instructive to watch the doctors work." },
  { id: 16, word: "customary", pos: "adj", definition: "(adj) usually done in a particular situation or at a particular place or time", sentence: "It is customary to hold the door open for someone who is entering a building behind you." },
  { id: 17, word: "transparent", pos: "adj", definition: "(adj) able to be seen through", sentence: "The water was so transparent that I could see the fish clearly." },
  { id: 18, word: "faulty", pos: "adj", definition: "(adj) having a mistake, fault, or weakness", sentence: "The report is based on faulty statistics." },
  { id: 19, word: "hoarse", pos: "adj", definition: "(adj) having a harsh or rough sound or voice", sentence: "She could only speak in a hoarse whisper." },
  { id: 20, word: "apparent", pos: "adj", definition: "(adj) easy to see or understand", sentence: "The other team's superiority was apparent in the first half of the game." },
  { id: 21, word: "era", pos: "noun", definition: "(noun) a period of time that is associated with a particular quality, event, person, etc.", sentence: "The Christian Era is dated from the birth of Jesus." },
  { id: 22, word: "epoch", pos: "noun", definition: "(noun) a period of time that is very important in history", sentence: "The development of the steam engine marked an important epoch in the history of industry." },
  { id: 23, word: "heredity", pos: "noun", definition: "(noun) the natural process by which physical and mental qualities are passed from a parent to a child", sentence: "The color of a person's hair is determined by heredity." },
  { id: 24, word: "aptitude", pos: "noun", definition: "(noun) a natural ability to do something or to learn something", sentence: "Anyone who can speak five languages obviously has a great natural aptitude for learning languages." },
  { id: 25, word: "expedition", pos: "noun", definition: "(noun) a journey especially by a group of people for a specific purpose such as to explore a distant place or to do research", sentence: "The scientists made an expedition to Alaska to study the animals in the area." },
  { id: 26, word: "famine", pos: "noun", definition: "(noun) a situation in which many people do not have enough food to eat", sentence: "The famine affected half the continent." },
  { id: 27, word: "instinct", pos: "noun", definition: "(noun) a way of behaving, thinking, or feeling that is not learned : a natural desire or tendency that makes you want to act in a particular way", sentence: "Cats possess a natural hunting instinct." },
  { id: 28, word: "reservoir", pos: "noun", definition: "(noun) a usually artificial lake that is used to store a large supply of water for use in people's homes, in businesses, etc.", sentence: "Most of the city's water comes from this reservoir." },
  { id: 29, word: "despair", pos: "noun", definition: "(noun) the feeling of no longer having any hope", sentence: "His despair nearly drove him mad." },
  { id: 30, word: "impulse", pos: "noun", definition: "(noun) a sudden strong desire to do something", sentence: "He has to learn to control his impulses." },
  { id: 31, word: "avalanche", pos: "noun", definition: "(noun) a large amount of snow and ice or of dirt and rocks that slides suddenly down the side of a mountain", sentence: "Three skiers were killed in an avalanche." },
  { id: 32, word: "authority", pos: "noun", definition: "(noun) the power to give orders or make decisions : the power or right to direct or control someone or something", sentence: "Only department managers have the authority to change the schedule." },
  { id: 33, word: "bias", pos: "noun", definition: "(noun) a tendency to believe that some people, ideas, etc., are better than others that usually results in treating some people unfairly", sentence: "He showed a bias toward a few workers in particular." },
  { id: 34, word: "currency", pos: "noun", definition: "(noun) the money that a country uses", sentence: "A new currency has been introduced in the foreign exchange market." },
  { id: 35, word: "altitude", pos: "noun", definition: "(noun) the height of something such as an airplane above the level of the sea", sentence: "We're now flying at an altitude of 10,000 feet." },
  { id: 36, word: "alien", pos: "noun", definition: "(noun) a person who was born in a different country and is not a citizen of the country in which he or she now lives", sentence: "The movie was about aliens that tried to take over the earth." },
  { id: 37, word: "counsel", pos: "noun", definition: "(noun) advice given to someone", sentence: "I won't join the team without your counsel." },
  { id: 38, word: "paradox", pos: "noun", definition: "(noun) something such as a situation that is made up of two opposite things and that seems impossible but is actually true or possible", sentence: "It is a paradox that computers need maintenance so often, since they are meant to save people time." },
  { id: 39, word: "trait", pos: "noun", definition: "(noun) a quality that makes one person or thing different from another", sentence: "Humility is an admirable trait." },
  { id: 40, word: "candidate", pos: "noun", definition: "(noun) a person who is trying to be elected", sentence: "Three candidates are competing for the job." },
  { id: 41, word: "epidemic", pos: "noun", definition: "(noun) an occurrence in which a disease spreads very quickly and affects a large number of people", sentence: "A cholera epidemic is sweeping through the region." },
  { id: 42, word: "illusion", pos: "noun", definition: "(noun) something that looks or seems different from what it is", sentence: "The video game is designed to give the illusion that you are in control of an airplane." },
  { id: 43, word: "revolution", pos: "noun", definition: "(noun) the usually violent attempt by many people to end the rule of one government and start a new one", sentence: "Do you know when the French Revolution occurred?" },
  { id: 44, word: "dynasty", pos: "noun", definition: "(noun) a family of rulers who rule over a country for a long period of time", sentence: "The Yi dynasty ruled Korea for about 500 years." },
  { id: 45, word: "anguish", pos: "noun", definition: "(noun) extreme suffering, grief, or pain", sentence: "He experienced the anguish of divorce after 10 years of marriage." },
  { id: 46, word: "disgrace", pos: "noun", definition: "(noun) the condition of feeling ashamed or of losing or becoming unworthy of respect or approval", sentence: "Many feel that the mayor has brought disgrace upon the town." },
  { id: 47, word: "institution", pos: "noun", definition: "(noun) an established organization", sentence: "She is planning to donate her property to an educational institution when she dies." },
  { id: 48, word: "monopoly", pos: "noun", definition: "(noun) complete control of the entire supply of goods or of a service in a certain area or market", sentence: "The company has gained a virtual monopoly of the logging industry in this area." },
  { id: 49, word: "triumph", pos: "noun", definition: "(noun) a great or important victory", sentence: "They celebrated their triumph with a parade through the streets of the city." },
  { id: 50, word: "sensation", pos: "noun", definition: "(noun) a particular feeling or effect that your body experiences", sentence: "She felt a burning sensation in her throat." }
];