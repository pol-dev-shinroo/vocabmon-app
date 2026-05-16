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
  { id: 1, word: "morsel", pos: "noun", definition: "(noun) a small piece of food", sentence: "He hasn't a morsel of sense." },
  { id: 2, word: "alloy", pos: "noun", definition: "(noun) a metal made by melting and mixing two or more metals or a metal and another material together", sentence: "Bronze is an alloy of copper and tin." },
  { id: 3, word: "diplomacy", pos: "noun", definition: "(noun) the work of maintaining good relations between the governments of different countries", sentence: "The government avoided a war by successfully resolving the issues through diplomacy." },
  { id: 4, word: "folklore", pos: "noun", definition: "(noun) traditional customs, beliefs, stories, and sayings", sentence: "The coyote appears in a great deal of Native American folklore." },
  { id: 5, word: "politics", pos: "noun", definition: "(noun) activities that relate to influencing the actions and policies of a government or getting and keeping power in a government", sentence: "The students discussed the latest news in national politics." },
  { id: 6, word: "poll", pos: "noun", definition: "(noun) an activity in which several or many people are asked a question or a series of questions in order to get information about what most people think about something", sentence: "The magazine conducted a poll to find out the favorite 100 movies of all time." },
  { id: 7, word: "taboo", pos: "noun", definition: "(noun) not acceptable to talk about or do / a rule against doing or saying something in a particular culture or religion", sentence: "Marrying a close relative is a taboo in many cultures." },
  { id: 8, word: "heritage", pos: "noun", definition: "(noun) the traditions, achievements, beliefs, etc., that are part of the history of a group or nation", sentence: "These battlefields are an important part of our heritage and should be preserved." },
  { id: 9, word: "hardship", pos: "noun", definition: "(noun) pain and suffering", sentence: "He had suffered through considerable hardship." },
  { id: 10, word: "prodigy", pos: "noun", definition: "(noun) a young person who is unusually talented in some way", sentence: "Mozart was a prodigy who could compose music at the age of 5." },
  { id: 11, word: "nostalgia", pos: "noun", definition: "(noun) pleasure and sadness that is caused by remembering something from the past and wishing that you could experience it again", sentence: "A wave of nostalgia swept over me when I saw my childhood home." },
  { id: 12, word: "molecule", pos: "noun", definition: "(noun) the smallest possible amount of a particular substance that has all the characteristics of that substance", sentence: "A molecule of an element consists of one or more atoms." },
  { id: 13, word: "refugee", pos: "noun", definition: "(noun) someone who has been forced to leave a country because of war or for religious or political reasons", sentence: "Thousands of refugees have fled the area." },
  { id: 14, word: "patriotism", pos: "noun", definition: "(noun) love that people feel for their country", sentence: "You may not agree with him politically, but no one can question his patriotism." },
  { id: 15, word: "prejudice", pos: "noun", definition: "(noun) an unfair feeling of dislike for a person or group because of race, sex, religion, etc.", sentence: "The organization fights against racial prejudice." },
  { id: 16, word: "vanity", pos: "noun", definition: "(noun) the quality of people who have too much pride in their own appearance, abilities, achievements, etc.", sentence: "She described her accomplishments without exaggeration or vanity." },
  { id: 17, word: "stimulus", pos: "noun", definition: "(noun) something that causes something else to happen, develop, or become more active", sentence: "The dog responded to the stimulus of the ringing bell." },
  { id: 18, word: "sincerity", pos: "noun", definition: "(noun) the quality or state of being sincere : honesty of mind", sentence: "Some people are questioning the sincerity of her promises." },
  { id: 19, word: "industry", pos: "noun", definition: "(noun) the process of making products by using machinery and factories", sentence: "He favors policies that promote industry." },
  { id: 20, word: "analysis", pos: "noun", definition: "(noun) a careful study of something to learn about its parts, what they do, and how they are related to each other", sentence: "The scientists performed chemical analysis of the soil." },
  { id: 21, word: "finance", pos: "noun", definition: "(noun) the way in which money is used and handled", sentence: "She's taking a course on personal finance." },
  { id: 22, word: "advertisement", pos: "noun", definition: "(noun) something such as a short film or a written notice that is shown or presented to the public to help sell a product or to make an announcement", sentence: "He learned about the job from an advertisement in the newspaper." },
  { id: 23, word: "insight", pos: "noun", definition: "(noun) the ability to understand people and situations in a very clear way", sentence: "Hurston's writings were recognized for their insights." },
  { id: 24, word: "evidence", pos: "noun", definition: "(noun) something which shows that something else exists or is true", sentence: "He has been unable to find evidence to support his theory." },
  { id: 25, word: "emphasis", pos: "noun", definition: "(noun) special importance or attention given to something", sentence: "She puts particular emphasis on developing good study habits." },
  { id: 26, word: "capacity", pos: "noun", definition: "(noun) the ability to hold or contain people or things", sentence: "The restaurant has a large seating capacity." },
  { id: 27, word: "efficiency", pos: "noun", definition: "(noun) the ability to do something or produce something without wasting materials, time, or energy", sentence: "Because of her efficiency, we got all the work done in a few hours." },
  { id: 28, word: "hostility", pos: "noun", definition: "(noun) an unfriendly or hostile state, attitude, or action", sentence: "The townspeople showed open hostility to outsiders." },
  { id: 29, word: "perseverance", pos: "noun", definition: "(noun) the quality that allows someone to continue trying to do something even though it is difficult", sentence: "His perseverance was rewarded: after many rejections, he finally found a job." },
  { id: 30, word: "piety", pos: "noun", definition: "(noun) devotion to God", sentence: "The old woman expressed her piety by attending church daily." },
  { id: 31, word: "gratitude", pos: "noun", definition: "(noun) a feeling of appreciation or thanks", sentence: "Let me express my sincere gratitude for all your help." },
  { id: 32, word: "symptom", pos: "noun", definition: "(noun) a change in the body or mind which indicates that a disease is present", sentence: "He's complaining of all the usual flu symptoms - a high temperature, headache, and so on." },
  { id: 33, word: "vigor", pos: "noun", definition: "(noun) strength, energy, or determination", sentence: "She defended her beliefs with great vigor." },
  { id: 34, word: "origin", pos: "noun", definition: "(noun) the point or place where something begins or is created : the source or cause of something", sentence: "The origin of this custom is not known." },
  { id: 35, word: "disguise", pos: "noun", definition: "(noun) to change the usual appearance, sound, taste, etc., of someone or something so that people will not recognize that person or thing", sentence: "He tried to disguise his voice on the phone but I could tell it was him." },
  { id: 36, word: "medium", pos: "noun", definition: "(noun) the thing by which or through which something is done", sentence: "English is an important medium of international communication." },
  { id: 37, word: "misery", pos: "noun", definition: "(noun) extreme suffering or unhappiness", sentence: "The war brought misery to thousands of refugees." },
  { id: 38, word: "eloquence", pos: "noun", definition: "(noun) the ability to speak or write well and in an effective way", sentence: "She spoke with eloquence on the need for better schools." },
  { id: 39, word: "increase", pos: "noun", definition: "(noun) the act of becoming larger or of making something larger or greater in size, amount, number, etc.", sentence: "The construction will probably cause some increase in traffic delays." },
  { id: 40, word: "decrease", pos: "noun", definition: "(noun) the act of becoming smaller or of making something smaller in size, amount, number, etc.", sentence: "We've had a decrease in the number of students enrolling in the school." },
  { id: 41, word: "fury", pos: "noun", definition: "(noun) violent anger", sentence: "She rose in a fury and stalked out of the room." },
  { id: 42, word: "unemployment", pos: "noun", definition: "(noun) the state of not having a job", sentence: "The current unemployment rate is six percent." },
  { id: 43, word: "reign", pos: "noun", definition: "(noun) the period of time during which a king, queen, emperor, etc., is ruler of a country", sentence: "She was a popular ruler throughout her reign." },
  { id: 44, word: "solitude", pos: "noun", definition: "(noun) a state or situation in which you are alone usually because you want to be", sentence: "He enjoyed the peace and solitude of the woods." },
  { id: 45, word: "mechanism", pos: "noun", definition: "(noun) a process or system that is used to produce a particular result", sentence: "Scientists are studying the body's mechanisms for controlling weight." },
  { id: 46, word: "contempt", pos: "noun", definition: "(noun) a feeling that someone or something is not worthy of any respect or approval", sentence: "They were bullies, and they showed contempt for everyone and everything." },
  { id: 47, word: "strife", pos: "noun", definition: "(noun) very angry or violent disagreement between two or more people or groups", sentence: "In order to avoid family strife, the children spend equal time during the holidays with both of their grandmothers." },
  { id: 48, word: "factor", pos: "noun", definition: "(noun) something that helps produce or influence a result : one of the things that cause something to happen", sentence: "There were several factors contributing to their recent decline." },
  { id: 49, word: "eternity", pos: "noun", definition: "(noun) time without an end", sentence: "She promised to love him for all eternity." },
  { id: 50, word: "propaganda", pos: "noun", definition: "(noun) ideas or statements that are often false or exaggerated and that are spread in order to help a cause, a political leader, a government, etc.", sentence: "They didn't listen to the enemy's propaganda broadcasts." }
];