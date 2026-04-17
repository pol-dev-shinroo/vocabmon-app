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
  { id: 1, word: "accumulate", pos: "verb", definition: "(verb) to gather or acquire something gradually as time passes", sentence: "The police have been accumulating evidence of his guilt." },
  { id: 2, word: "devour", pos: "verb", definition: "(verb) to quickly eat all of something especially in a way that shows that you are very hungry", sentence: "He devoured everything on his plate." },
  { id: 3, word: "decay", pos: "verb", definition: "(verb) to be slowly broken down by the natural processes that destroy a dead plant or body", sentence: "Tomatoes that fall off the vine will decay on the ground." },
  { id: 4, word: "summon", pos: "verb", definition: "(verb) to order someone to come to a place", sentence: "The queen summoned him back to the palace." },
  { id: 5, word: "criticize", pos: "verb", definition: "(verb) to talk about the problems or faults of someone or something", sentence: "His boss criticized him for his sloppy work habits." },
  { id: 6, word: "nourish", pos: "verb", definition: "(verb) to provide someone or something with food and other things that are needed to live, be healthy, etc.", sentence: "Plants are nourished by rain and soil." },
  { id: 7, word: "confess", pos: "verb", definition: "(verb) to admit that you did something wrong or illegal", sentence: "He confessed after being questioned for many hours." },
  { id: 8, word: "exclaim", pos: "verb", definition: "(verb) to say something in an enthusiastic or forceful way", sentence: "\"I won!\" she exclaimed." },
  { id: 9, word: "endanger", pos: "verb", definition: "(verb) to cause someone or something to be in a dangerous place or situation", sentence: "Parents feared that the dog could endanger their children." },
  { id: 10, word: "prolong", pos: "verb", definition: "(verb) to make something last or continue for a longer time", sentence: "Chemotherapy helped to prolong her life." },
  { id: 11, word: "restore", pos: "verb", definition: "(verb) to give back someone or something that was lost or taken", sentence: "The police restored the stolen purse to its owner." },
  { id: 12, word: "beckon", pos: "verb", definition: "(verb) to signal someone with your arm or hand in order to tell that person to come closer or follow", sentence: "She was beckoning them in to shore." },
  { id: 13, word: "substitute", pos: "verb", definition: "(verb) to put or use someone or something in place of someone or something else", sentence: "If cream is unavailable, you can substitute milk." },
  { id: 14, word: "enroll", pos: "verb", definition: "(verb) to enter someone as a member of or participant in something", sentence: "They enrolled their children in a private school." },
  { id: 15, word: "dispose", pos: "verb", definition: "(verb) to throw something away", sentence: "Please dispose of your cigarette butts in one of the ashtrays available." },
  { id: 16, word: "enhance", pos: "verb", definition: "(verb) to increase or improve something", sentence: "You can enhance the flavor of the dish by using fresh herbs." },
  { id: 17, word: "overthrow", pos: "verb", definition: "(verb) to remove someone or something from power especially by force", sentence: "They tried to overthrow the government but failed." },
  { id: 18, word: "torment", pos: "verb", definition: "(verb) to cause someone or something to feel extreme physical or mental pain", sentence: "He is still tormented by nightmares." },
  { id: 19, word: "vary", pos: "verb", definition: "(verb) to be different or to become different", sentence: "The cost of a room at the hotel varies with the season." },
  { id: 20, word: "anticipate", pos: "verb", definition: "(verb) to think of something that will or might happen in the future", sentence: "They do not anticipate any major problems during construction." },
  { id: 21, word: "distress", pos: "verb", definition: "(verb) to worry or upset someone", sentence: "I was distressed to learn that the hospital had closed." },
  { id: 22, word: "soothe", pos: "verb", definition: "(verb) to cause someone to be calmer, less angry, etc.", sentence: "She played music to soothe the baby." },
  { id: 23, word: "arouse", pos: "verb", definition: "(verb) to cause an emotional or mental state", sentence: "Her sad story aroused our pity." },
  { id: 24, word: "irritate", pos: "verb", definition: "(verb) to make someone impatient, angry, or annoyed", sentence: "The other passengers were irritated by the child's rudeness." },
  { id: 25, word: "oppress", pos: "verb", definition: "(verb) to treat a person or group of people in a cruel or unfair way", sentence: "The country has long been oppressed by a ruthless dictator." },
  { id: 26, word: "estimate", pos: "verb", definition: "(verb) to give or form a general idea about the value, size, or cost of something", sentence: "We need to estimate how much paint we'll need for the job." },
  { id: 27, word: "frustrate", pos: "verb", definition: "(verb) to cause someone to feel angry, discouraged, or upset because of not being able to do something", sentence: "It frustrated him to miss so many games because of injuries." },
  { id: 28, word: "repent", pos: "verb", definition: "(verb) to feel or show that you are sorry for something bad or wrong that you did and that you want to do what is right", sentence: "The preacher told us that we would be forgiven for our sins if we repented." },
  { id: 29, word: "abolish", pos: "verb", definition: "(verb) to officially end or stop something, such as a law", sentence: "He is in favor of abolishing the death penalty." },
  { id: 30, word: "retain", pos: "verb", definition: "(verb) to continue to have or use something", sentence: "The TV show has retained its popularity for many years." },
  { id: 31, word: "refrain", pos: "verb", definition: "(verb) to stop yourself from doing something that you want to do", sentence: "I was going to make a joke but I refrained." },
  { id: 32, word: "transmit", pos: "verb", definition: "(verb) to send (information, sound, etc.) in the form of electrical signals to a radio, television, computer, etc.", sentence: "The technology allows data to be transmitted by cellular phones." },
  { id: 33, word: "supplement", pos: "verb", definition: "(verb) to add something to something in order to make it complete", sentence: "She began supplementing her diet with vitamins." },
  { id: 34, word: "compensate", pos: "verb", definition: "(verb) to provide something good as a balance against something bad or undesirable", sentence: "His enthusiasm compensates for his lack of skill." },
  { id: 35, word: "breed", pos: "verb", definition: "(verb) to keep and take care of animals or plants in order to produce more animals or plants of a particular kind", sentence: "The plants are bred to resist disease and drought." },
  { id: 36, word: "submit", pos: "verb", definition: "(verb) to give a document, proposal, piece of writing, etc. to someone so that it can be considered or approved", sentence: "Candidates interested in the position should submit their résumés to the Office of Human Resources." },
  { id: 37, word: "violate", pos: "verb", definition: "(verb) to do something that is not allowed by a law, rule, etc.", sentence: "Students who violate the rules will be punished." },
  { id: 38, word: "deceive", pos: "verb", definition: "(verb) to make someone believe something that is not true", sentence: "Her parents punished her for trying to deceive them." },
  { id: 39, word: "convey", pos: "verb", definition: "(verb) to take or carry someone or something from one place to another", sentence: "The singer was conveyed from her hotel to the airport by limousine." },
  { id: 40, word: "indicate", pos: "verb", definition: "(verb) to show something", sentence: "Our records indicate a depth of 3,000 feet here." },
  { id: 41, word: "forbid", pos: "verb", definition: "(verb) to say that something is not allowed", sentence: "The museum forbids flash photography." },
  { id: 42, word: "startle", pos: "verb", definition: "(verb) to surprise or frighten someone suddenly and usually not seriously", sentence: "A spider dropped from the ceiling and startled me." },
  { id: 43, word: "eliminate", pos: "verb", definition: "(verb) to remove something that is not wanted or needed", sentence: "Doctors seek to eliminate the causes of the epidemic." },
  { id: 44, word: "abuse", pos: "verb", definition: "(verb) to treat a person or animal in a harsh or harmful way", sentence: "He abused his wife both mentally and physically." },
  { id: 45, word: "abound", pos: "verb", definition: "(verb) to be present in large numbers or in great quantity", sentence: "They live in a region where oil abounds." },
  { id: 46, word: "impose", pos: "verb", definition: "(verb) to cause something, such as a tax, fine, rule, or punishment", sentence: "The judge imposed a life sentence." },
  { id: 47, word: "disgust", pos: "verb", definition: "(verb) to cause someone to have a strong feeling of dislike for something especially because it has a very unpleasant appearance, taste, smell, etc.", sentence: "The greasy food they were serving disgusted him." },
  { id: 48, word: "deprive", pos: "verb", definition: "(verb) to take something away from someone or something", sentence: "The new environmental law will deprive some fishermen of their livelihood." },
  { id: 49, word: "conform", pos: "verb", definition: "(verb) to be similar to or the same as something", sentence: "The animals' behavior conforms to a common pattern." },
  { id: 50, word: "reform", pos: "verb", definition: "(verb) to improve someone or something by removing or correcting faults, problems, etc.", sentence: "The program is designed to reform prisoners." }
];
