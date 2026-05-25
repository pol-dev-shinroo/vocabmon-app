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
  { id: 1, word: "constitution", pos: "noun", definition: "(noun) the system of beliefs and laws by which a country, state, or organization is governed", sentence: "The state's constitution has strict rules about what tax money can be used for." },
  { id: 2, word: "folly", pos: "noun", definition: "(noun) the lack of good sense or judgment", sentence: "It would be folly to try to lift that piano." },
  { id: 3, word: "scope", pos: "noun", definition: "(noun) the area that is included in or dealt with by something", sentence: "We are going to widen the scope of the investigation." },
  { id: 4, word: "convention", pos: "noun", definition: "(noun) a large meeting of people who come to a place for usually several days to talk about their shared work or other interests or to make decisions as a group", sentence: "The Democratic National Convention will meet next week to announce their party's candidate for president." },
  { id: 5, word: "conception", pos: "noun", definition: "(noun) the act or process of conceiving something: such as the process of forming an idea", sentence: "He directed the project from conception to production." },
  { id: 6, word: "strain", pos: "noun", definition: "(noun) a feeling of stress and worry that you have because you are trying to do too much, are dealing with a difficult problem, etc.", sentence: "Running the business was a strain on him." },
  { id: 7, word: "monotony", pos: "noun", definition: "(noun) a lack of change that makes something boring", sentence: "The brief storm was a relief from the monotony of the hot summer afternoon." },
  { id: 8, word: "vocation", pos: "noun", definition: "(noun) a strong desire to spend your life doing a certain kind of work (such as religious work)", sentence: "She discovered architecture as her true vocation while in college." },
  { id: 9, word: "realm", pos: "noun", definition: "(noun) an area of activity, interest, or knowledge", sentence: "That plan is beyond the realm of possibility." },
  { id: 10, word: "conceit", pos: "noun", definition: "(noun) too much pride in your own worth or goodness", sentence: "His conceit has earned him many enemies." },
  { id: 11, word: "deceit", pos: "noun", definition: "(noun) dishonest behavior : behavior that is meant to fool or trick someone", sentence: "He took all her money away by deceit." },
  { id: 12, word: "menace", pos: "noun", definition: "(noun) a dangerous or possibly harmful person or thing — usually singular", sentence: "Plastic bags are a menace to marine environments because they don't break down quickly." },
  { id: 13, word: "treaty", pos: "noun", definition: "(noun) an official agreement that is made between two or more countries or groups", sentence: "In accordance with a treaty between the United States and the tribes of the Pacific Northwest, commercial fishing of certain kinds of salmon is limited to Native Americans." },
  { id: 14, word: "syndrome", pos: "noun", definition: "(noun) a disease or disorder that involves a particular group of signs and symptoms", sentence: "It causes common colds and severe acute respiratory syndrome." },
  { id: 15, word: "infrastructure", pos: "noun", definition: "(noun) the basic equipment and structures (such as roads and bridges) that are needed for a country, region, or organization to function properly", sentence: "More money is needed to save the crumbling infrastructure of the nation's rural areas." },
  { id: 16, word: "indignation", pos: "noun", definition: "(noun) anger caused by something that is unfair or wrong", sentence: "The decision to close the factory has aroused the indignation of the townspeople." },
  { id: 17, word: "doctrine", pos: "noun", definition: "(noun) a set of ideas or beliefs that are taught or believed to be true", sentence: "The government was founded on a doctrine of equality for all people." },
  { id: 18, word: "gravitation", pos: "noun", definition: "(noun) the natural force that causes things to fall towards the earth", sentence: "Stephen studied time from the perspective of Einstein's theory of gravitation, the general theory of relativity." },
  { id: 19, word: "notion", pos: "noun", definition: "(noun) an idea or opinion", sentence: "They had different notions of right and wrong." },
  { id: 20, word: "nuisance", pos: "noun", definition: "(noun) a person, thing, or situation that is annoying or that causes trouble or problems", sentence: "Weeds are a nuisance to the gardener." },
  { id: 21, word: "tyranny", pos: "noun", definition: "(noun) cruel and unfair treatment by people with power over others", sentence: "The king sought an absolute tyranny over the colonies." },
  { id: 22, word: "infection", pos: "noun", definition: "(noun) the act or process of infecting someone or something : the state of being infected", sentence: "Poor hygiene can increase the danger of infection." },
  { id: 23, word: "contagion", pos: "noun", definition: "(noun) the process by which a disease is passed from one person or animal to another by touching", sentence: "People have been warned to keep out of the area to avoid contagion." },
  { id: 24, word: "compromise", pos: "noun", definition: "(noun) a way of reaching agreement in which each person or group gives up something that was wanted in order to end an argument or dispute", sentence: "She says that accepting their proposal would be a compromise of her principles." },
  { id: 25, word: "fame", pos: "noun", definition: "(noun) the condition of being known or recognized by many people", sentence: "She went to Hollywood seeking fame and fortune." },
  { id: 26, word: "modesty", pos: "noun", definition: "(noun) the quality of not being too proud or confident about yourself or your abilities", sentence: "She does a lot of work for charities, but her modesty forbids her from talking about it." },
  { id: 27, word: "anarchy", pos: "noun", definition: "(noun) a situation of confusion and wild behavior in which the people in a country, group, organization, etc., are not controlled by rules or laws", sentence: "When the teacher was absent, there was anarchy in the classroom." },
  { id: 28, word: "aristocracy", pos: "noun", definition: "(noun) the highest social class in some countries : the people who have special titles such as duke and duchess, who typically own land, and who traditionally have more money and power than the other people in a society", sentence: "The feudal aristocracy would maintain great control over the king's council up until the 14th and 15th centuries." },
  { id: 29, word: "democracy", pos: "noun", definition: "(noun) a form of government in which people choose leaders by voting", sentence: "The company is not a democracy; decisions are made by a board of directors, not the workers." },
  { id: 30, word: "posterity", pos: "noun", definition: "(noun) people in the future", sentence: "Posterity will remember her as a woman of courage and integrity." },
  { id: 31, word: "lapse", pos: "noun", definition: "(noun) an occurrence in which you fail to think or act in the usual or proper way for a brief time and make a mistake", sentence: "He blamed the error on a minor mental lapse." },
  { id: 32, word: "hypocrisy", pos: "noun", definition: "(noun) the behavior of people who do things that they tell other people not to do : behavior that does not agree with what someone claims to believe or feel", sentence: "The senator showed his hypocrisy by saying he was for the bill and then voting against it." },
  { id: 33, word: "variation", pos: "noun", definition: "(noun) a change in the form, position, condition, or amount of something", sentence: "A mother's ears are attuned to even the slightest variation in her baby's breathing." },
  { id: 34, word: "qualification", pos: "noun", definition: "(noun) a special skill or type of experience or knowledge that makes someone suitable to do a particular job or activity", sentence: "In weeks 11 and 12, the firm will verify qualifications and interview top candidates." },
  { id: 35, word: "conservation", pos: "noun", definition: "(noun) the protection of animals, plants, and natural resources", sentence: "The world will run out of oil unless it practices conservation." },
  { id: 36, word: "dose", pos: "noun", definition: "(noun) the amount of a medicine, drug, or vitamin that is taken at one time", sentence: "20 or 30 of these pills would be a lethal dose." },
  { id: 37, word: "exhaustion", pos: "noun", definition: "(noun) the state of being extremely tired", sentence: "He worked to the point of complete exhaustion." },
  { id: 38, word: "sensibility", pos: "noun", definition: "(noun) the kinds of feelings that you have when you hear, see, read, or think about something", sentence: "Some drugs lessen a person's sensibilities." },
  { id: 40, word: "humility", pos: "noun", definition: "(noun) the quality or state of not thinking you are better than other people", sentence: "He doesn't have the humility to admit when he's wrong." },
  { id: 41, word: "implication", pos: "noun", definition: "(noun) a possible future effect or result", sentence: "She smiled, but the implication was that she didn't believe me." },
  { id: 42, word: "egotism", pos: "noun", definition: "(noun) the feeling or belief that you are better, more important, more talented", sentence: "In his egotism he thought everyone was coming just to see him." },
  { id: 43, word: "liberation", pos: "noun", definition: "(noun) the act or process of freeing someone or something from another's control : the act of liberating someone or something", sentence: "The liberation of the slaves was one of the key results of the Civil War." },
  { id: 44, word: "significance", pos: "noun", definition: "(noun) the quality of being important : the quality of having notable worth or influence", sentence: "This building should be preserved because of its historical significance." },
  { id: 45, word: "prophecy", pos: "noun", definition: "(noun) a statement that something will happen in the future", sentence: "Her prophecy that there would be a disaster hasn't come true." },
  { id: 46, word: "explosion", pos: "noun", definition: "(noun) the sudden, loud, and violent release of energy that happens when something such as a bomb breaks apart in a way that sends parts flying outward", sentence: "His comments prompted an explosion of laughter from the crowd." },
  { id: 47, word: "restriction", pos: "noun", definition: "(noun) a law or rule that limits or controls something", sentence: "They imposed restrictions on smoking indoors." },
  { id: 48, word: "heir", pos: "noun", definition: "(noun) a person who has the legal right to receive the property of someone who dies", sentence: "His heirs could inherit millions of dollars." },
  { id: 49, word: "integrity", pos: "noun", definition: "(noun) the quality of being honest and fair", sentence: "He has a reputation for integrity in his business dealings." },
  { id: 50, word: "restraint", pos: "noun", definition: "(noun) a way of limiting, controlling, or stopping something", sentence: "The government has imposed restraints on imports." }
];
