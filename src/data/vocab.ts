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
  { id: 1, word: "acknowledge", pos: "verb", definition: "(verb) to say that you accept or do not deny the truth or existence of something / to express thanks or appreciation for", sentence: "I acknowledge the fact that I hurt you, and for that I am sorry." },
  { id: 2, word: "distort", pos: "verb", definition: "(verb) to change the natural, normal, or original shape, appearance, or sound of something in a way that is usually not attractive or pleasing / to change something so that it is no longer true or accurate", sentence: "The story was distorted by the press." },
  { id: 3, word: "distract", pos: "verb", definition: "(verb) to cause someone to stop thinking about or paying attention to someone or something", sentence: "You sneak into his room while I distract him." },
  { id: 4, word: "restrain", pos: "verb", definition: "(verb) to prevent a person or animal from doing something / to keep something under control", sentence: "He could not restrain the dog from attacking." },
  { id: 5, word: "inhabit", pos: "verb", definition: "(verb) to live in a place : to have a home in a place", sentence: "Several hundred species of birds inhabit the island." },
  { id: 6, word: "abandon", pos: "verb", definition: "(verb) to leave and never return to someone who needs protection or help", sentence: "The child had been abandoned by his parents as an infant." },
  { id: 7, word: "dwell", pos: "verb", definition: "(verb) to live in a particular place", sentence: "He dwelled in the same town for years." },
  { id: 8, word: "cease", pos: "verb", definition: "(verb) to stop happening : to end", sentence: "The fighting along the border has temporarily ceased." },
  { id: 9, word: "occupy", pos: "verb", definition: "(verb) to fill or be in a place or space", sentence: "Someone was occupying my place at the table." },
  { id: 10, word: "plead", pos: "verb", definition: "(verb) to ask for something in a serious and emotional way", sentence: "She pleaded for forgiveness and got her job back." },
  { id: 11, word: "engrave", pos: "verb", definition: "(verb) to cut or carve lines, letters, designs, etc., onto or into a hard surface", sentence: "They will engrave your initials on the ring for free." },
  { id: 12, word: "deposit", pos: "verb", definition: "(verb) to put money in a bank account/ to leave an amount of something, such as sand, snow, or mud on a surface or area especially over a period of time", sentence: "Your paycheck will be automatically deposited into your account." },
  { id: 13, word: "correspond", pos: "verb", definition: "(verb) to be similar or equal to something / to have a direct relationship to or with something", sentence: "Each number corresponds to a location on the map." },
  { id: 14, word: "consent", pos: "verb", definition: "(verb) to agree to do or allow something : to give permission for something to happen or be done", sentence: "Her father consented to the marriage." },
  { id: 15, word: "perceive", pos: "verb", definition: "(verb) to notice or become aware of something", sentence: "The detective perceived a change in the suspect's attitude." },
  { id: 16, word: "conceive", pos: "verb", definition: "(verb) to think of or create something in the mind / to become pregnant", sentence: "I cannot conceive that he would leave without saying goodbye." },
  { id: 17, word: "derive", pos: "verb", definition: "(verb) to take or get something from something else", sentence: "The river derives its name from a Native American tribe." },
  { id: 18, word: "discriminate", pos: "verb", definition: "(verb) to unfairly treat a person or group of people differently from other people or groups", sentence: "It is illegal to discriminate on the grounds/basis of race/sex." },
  { id: 19, word: "perish", pos: "verb", definition: "(verb) to die or be killed / to disappear or be destroyed : to cease to exist", sentence: "The civilization perished after 500 years." },
  { id: 20, word: "modify", pos: "verb", definition: "(verb) to change some parts of something while not changing other parts", sentence: "He modified the recipe by using oil instead of butter." },
  { id: 21, word: "contradict", pos: "verb", definition: "(verb) to say the opposite of something that someone else has said : to deny the truth of something / to not agree with something in a way that shows or suggests that it is false, wrong, etc.", sentence: "Sally just contradicted what she said earlier." },
  { id: 22, word: "infect", pos: "verb", definition: "(verb) to cause someone or something to become sick or affected by disease", sentence: "The virus has infected many people." },
  { id: 23, word: "illuminate", pos: "verb", definition: "(verb) to supply something with light : to shine light on something", sentence: "Candles illuminate the church." },
  { id: 24, word: "pierce", pos: "verb", definition: "(verb) to make a hole in or through something", sentence: "The needle pierced her skin." },
  { id: 25, word: "prescribe", pos: "verb", definition: "(verb) to officially tell someone to use a medicine, therapy, diet, etc. as a remedy or treatment", sentence: "This drug should not be prescribed to children." },
  { id: 26, word: "infer", pos: "verb", definition: "(verb) to form an opinion from evidence : to reach a conclusion based on known facts", sentence: "She said she was pleased, but her true feelings could be inferred from the look of disappointment on her face." },
  { id: 27, word: "hasten", pos: "verb", definition: "(verb) to cause something to happen more quickly", sentence: "His death was hastened by alcohol abuse." },
  { id: 28, word: "torture", pos: "verb", definition: "(verb) to cause someone to experience severe physical pain especially as a form of punishment / to cause someone to feel very worried, unhappy, etc.", sentence: "The report revealed that prisoners had been repeatedly tortured." },
  { id: 29, word: "embody", pos: "verb", definition: "(verb) to represent something in a clear and obvious way : to be a symbol or example of something", sentence: "He is a leader who embodies courage." },
  { id: 30, word: "discard", pos: "verb", definition: "(verb) to throw something away because it is useless or unwanted", sentence: "Many of his original theories have been discarded in recent years." },
  { id: 31, word: "migrate", pos: "verb", definition: "(verb) to move from one country or place to live or work in another", sentence: "He migrates from New York to Florida each winter." },
  { id: 32, word: "entitle", pos: "verb", definition: "(verb) to give a right to someone", sentence: "I'm entitled to a refund." },
  { id: 33, word: "enrich", pos: "verb", definition: "(verb) to improve the quality of something : to make something better", sentence: "Their lives were enriched by the experience." },
  { id: 34, word: "coincide", pos: "verb", definition: "(verb) to happen at the same time as something else/ to agree with something exactly", sentence: "The population increase coincided with rapid industrial growth." },
  { id: 35, word: "extinguish", pos: "verb", definition: "(verb) to cause the end or death of something / to cause something to stop burning", sentence: "News of the conflict extinguished our hopes for a peaceful resolution." },
  { id: 36, word: "convert", pos: "verb", definition: "(verb) to change something into a different form or so that it can be used in a different way", sentence: "The cells absorb light and convert it to energy." },
  { id: 37, word: "forecast", pos: "verb", definition: "(verb) to say that something will happen in the future : to predict something, such as weather after looking at the information that is available", sentence: "They're forecasting rain for this weekend." },
  { id: 38, word: "prosper", pos: "verb", definition: "(verb) to become very successful usually by making a lot of money", sentence: "He hopes his business will prosper." },
  { id: 39, word: "exaggerate", pos: "verb", definition: "(verb) to think of or describe something as larger or greater than it really is", sentence: "The book exaggerates the difficulties he faced in starting his career." },
  { id: 40, word: "prohibit", pos: "verb", definition: "(verb) to order someone not to use or do something/ to make something impossible to do", sentence: "The town prohibited teenagers from being in the streets after 10 p.m." },
  { id: 41, word: "inquire", pos: "verb", definition: "(verb) to ask for information", sentence: "When I inquired, they told me she was not here." },
  { id: 42, word: "prevail", pos: "verb", definition: "(verb) to be usual, common, or popular / to defeat an opponent especially in a long or difficult contest", sentence: "The house was built in the style that prevailed in the 1980s." },
  { id: 43, word: "confirm", pos: "verb", definition: "(verb) to state or show that something is true or correct", sentence: "The tests confirmed the doctors' suspicions of cancer." },
  { id: 44, word: "stimulate", pos: "verb", definition: "(verb) to cause or encourage something to happen or develop", sentence: "This book stimulates readers' imagination." },
  { id: 45, word: "dominate", pos: "verb", definition: "(verb) to have control of or power over someone or something", sentence: "One company has dominated the market for years." },
  { id: 46, word: "diminish", pos: "verb", definition: "(verb) to become or to cause something to become less in size, importance, etc.", sentence: "The passing years did nothing to diminish their friendship." },
  { id: 47, word: "ensure", pos: "verb", definition: "(verb) to make something sure, certain, or safe", sentence: "They took steps to ensure the safety of the passengers." },
  { id: 48, word: "omit", pos: "verb", definition: "(verb) to leave out someone or something : to not include someone or something", sentence: "They omitted your name from the list." },
  { id: 49, word: "revive", pos: "verb", definition: "(verb) to make someone or something strong, healthy, or active again", sentence: "The doctors were trying to revive the patient." },
  { id: 50, word: "fascinate", pos: "verb", definition: "(verb) to cause someone to be very interested in something or someone", sentence: "His strange behavior fascinated the children." }
];
