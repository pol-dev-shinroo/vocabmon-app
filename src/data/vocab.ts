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
  { id: 1, word: "accustomed", pos: "adj", definition: "(adj) familiar with something so that it seems normal or usual", sentence: "We have become more accustomed to their traditions and routines." },
  { id: 2, word: "sultry", pos: "adj", definition: "(adj) very hot and humid", sentence: "It was a sultry July afternoon." },
  { id: 3, word: "corrupt", pos: "adj", definition: "(adj) to cause someone or something to become dishonest, immoral, etc", sentence: "The corrupt mayor was not reelected." },
  { id: 4, word: "exotic", pos: "adj", definition: "(adj) very different, strange, or unusual / not living or growing naturally in a particular area : from another part of the world", sentence: "The exotic plants come from Hawaii." },
  { id: 5, word: "serene", pos: "adj", definition: "(adj) calm and peaceful", sentence: "The woods were reflected in the serene lake." },
  { id: 6, word: "converse", pos: "adj", definition: "(adj) opposite or reverse", sentence: "One must also consider the converse case." },
  { id: 7, word: "modest", pos: "adj", definition: "(adj) not very large in size or amount / not too proud or confident about yourself or your abilities", sentence: "Despite its modest size, the city has many things to offer tourists." },
  { id: 8, word: "distinctive", pos: "adj", definition: "(adj) having a quality or characteristic that makes a person or thing different from others", sentence: "I spotted him from a distance because he has a distinctive walk." },
  { id: 9, word: "moderate", pos: "adj", definition: "(adj) average in size or amount", sentence: "Her doctor recommended moderate exercise." },
  { id: 10, word: "obstinate", pos: "adj", definition: "(adj) refusing to change your behavior or your ideas", sentence: "Even when he knows he's wrong, Ted is too obstinate to admit it." },
  { id: 11, word: "superficial", pos: "adj", definition: "(adj) concerned only with what is obvious or apparent : not thorough or complete", sentence: "These superficial changes don't address the underlying problem." },
  { id: 12, word: "numerous", pos: "adj", definition: "(adj) existing in large numbers", sentence: "She decided to leave for numerous reasons." },
  { id: 13, word: "subjective", pos: "adj", definition: "(adj) based on feelings or opinions rather than facts", sentence: "Personal taste in clothing is very subjective." },
  { id: 14, word: "scarce", pos: "adj", definition: "(adj) very small in amount or number : not plentiful", sentence: "Food was getting scarce during the drought." },
  { id: 15, word: "rational", pos: "adj", definition: "(adj) based on facts or reason and not on emotions or feelings / having the ability to reason or think about things clearly", sentence: "Man is not always a rational being." },
  { id: 16, word: "desolate", pos: "adj", definition: "(adj) lacking the people, plants, animals, etc., that make people feel welcome in a place", sentence: "She felt desolate when he went away." },
  { id: 17, word: "sullen", pos: "adj", definition: "(adj) used to describe an angry or unhappy person who does not want to talk, smile, etc.", sentence: "The boy was sullen after being scolded." },
  { id: 18, word: "thorough", pos: "adj", definition: "(adj) including every possible part or detail", sentence: "I gave my room a thorough cleaning." },
  { id: 19, word: "moral", pos: "adj", definition: "(adj) considered right and good by most people : agreeing with a standard of right behavior", sentence: "Is it moral to waste food when others in the world are starving?" },
  { id: 20, word: "fatal", pos: "adj", definition: "(adj) causing death", sentence: "He had a fatal accident on his way home." },
  { id: 21, word: "infinite", pos: "adj", definition: "(adj) having no limits : endless", sentence: "There seemed to be an infinite number of possibilities." },
  { id: 22, word: "frequent", pos: "adj", definition: "(adj) happening often", sentence: "We made frequent trips to town." },
  { id: 23, word: "fundamental", pos: "adj", definition: "(adj) forming or relating to the most important part of something : basic", sentence: "The Constitution ensures our fundamental rights." },
  { id: 24, word: "efficient", pos: "adj", definition: "(adj) capable of producing desired results without wasting materials, time, or energy", sentence: "He devoted himself to developing more efficient ways of working." },
  { id: 25, word: "effective", pos: "adj", definition: "(adj) producing a result that is wanted : having an intended effect", sentence: "Several new drugs proved to be effective in treating serious diseases." },
  { id: 26, word: "momentary", pos: "adj", definition: "(adj) lasting a very short time", sentence: "He experienced a momentary loss of consciousness." },
  { id: 27, word: "momentous", pos: "adj", definition: "(adj) very important : having great or lasting importance", sentence: "My college graduation was a momentous day in my life." },
  { id: 28, word: "peculiar", pos: "adj", definition: "(adj) not usual or normal", sentence: "It seems peculiar that he would leave town and not tell anybody." },
  { id: 29, word: "spacious", pos: "adj", definition: "(adj) having a large amount of space", sentence: "The dining room is spacious enough to seat our whole family and several guests." },
  { id: 30, word: "comparable", pos: "adj", definition: "(adj) used to say that two or more things are very similar and can be compared to each other", sentence: "A comparable refrigerator today would cost a lot more than the one I bought 10 years ago." },
  { id: 31, word: "sensible", pos: "adj", definition: "(adj) having or showing good sense or judgment", sentence: "Julie is a sensible girl. She doesn't do anything foolish." },
  { id: 32, word: "sensitive", pos: "adj", definition: "(adj) easily upset by the things that people think or say about you", sentence: "He acts like a tough guy, but he's really very sensitive to criticism." },
  { id: 33, word: "monotonous", pos: "adj", definition: "(adj) used to describe something that is boring because it is always the same", sentence: "Students complained that the meals were monotonous." },
  { id: 34, word: "indispensable", pos: "adj", definition: "(adj) extremely important and necessary", sentence: "A calculator is an indispensable tool for solving these problems." },
  { id: 35, word: "inevitable", pos: "adj", definition: "(adj) sure to happen", sentence: "These days traffic delays seem inevitable everywhere in Seoul." },
  { id: 36, word: "indifferent", pos: "adj", definition: "(adj) not interested in or concerned about something", sentence: "She was amazed that people could be so indifferent about the trial." },
  { id: 37, word: "supreme", pos: "adj", definition: "(adj) highest in rank or authority", sentence: "She reigns supreme in the world of tennis." },
  { id: 38, word: "marvelous", pos: "adj", definition: "(adj) extremely good or enjoyable", sentence: "We had a marvelous time at the party." },
  { id: 39, word: "unanimous", pos: "adj", definition: "(adj) agreed to by everyone", sentence: "She was elected club president by a unanimous vote." },
  { id: 40, word: "arrogant", pos: "adj", definition: "(adj) having or showing the insulting attitude of people who believe that they are better, smarter, or more important than other people", sentence: "She's first in her class, but she's not arrogant about it." },
  { id: 41, word: "excessive", pos: "adj", definition: "(adj) going beyond what is usual, normal, or proper", sentence: "He drinks excessive amounts of coffee." },
  { id: 42, word: "invaluable", pos: "adj", definition: "(adj) extremely valuable or useful", sentence: "The museum has many invaluable jewels." },
  { id: 43, word: "enormous", pos: "adj", definition: "(adj) very great in size or amount", sentence: "The enormous building is over 100 stories high." },
  { id: 44, word: "subtle", pos: "adj", definition: "(adj) hard to notice or see : not obvious", sentence: "They look similar, but there are subtle differences between them." },
  { id: 45, word: "tremendous", pos: "adj", definition: "(adj) very large or great", sentence: "A meteor falls with tremendous speed." },
  { id: 46, word: "profound", pos: "adj", definition: "(adj) having or showing great knowledge or understanding", sentence: "Her books offer profound insights into the true nature of courage." },
  { id: 47, word: "minute", pos: "adj", definition: "(adj) very small", sentence: "There were minute particles of dust in the air." },
  { id: 48, word: "threadbare", pos: "adj", definition: "(adj) very thin and in bad condition from too much use", sentence: "He was wearing a threadbare coat and old shoes." },
  { id: 49, word: "eminent", pos: "adj", definition: "(adj) successful, well-known and respected", sentence: "An eminent surgeon operated on the patient." },
  { id: 50, word: "acute", pos: "adj", definition: "(adj) very serious or dangerous : requiring serious attention or action", sentence: "I got an acute pain in my side from jogging too far." }
];
