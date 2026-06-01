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
  { id: 1, word: "scheme", pos: "noun", definition: "(noun) a clever and often dishonest plan to do or get something", sentence: "He has thought of a good scheme for making money." },
  { id: 2, word: "competence", pos: "noun", definition: "(noun) the ability to do something well : the quality or state of being competent", sentence: "Students must demonstrate competence in all subjects." },
  { id: 3, word: "greed", pos: "noun", definition: "(noun) a selfish desire to have more of something", sentence: "He made no effort to conceal his greed for money and power." },
  { id: 4, word: "cooperation", pos: "noun", definition: "(noun) a situation in which people work together to do something", sentence: "The fair was organized with the cooperation of local businesses." },
  { id: 5, word: "issue", pos: "noun", definition: "(noun) the version of a newspaper, magazine, etc., that is published at a particular time", sentence: "Do you have last month's issue of this magazine?" },
  { id: 6, word: "contradiction", pos: "noun", definition: "(noun) the act of saying something that is opposite or very different in meaning to something else", sentence: "Your statements today are in contradiction with what you said yesterday." },
  { id: 7, word: "acquaintance", pos: "noun", definition: "(noun) someone who is known but who is not a close friend", sentence: "She ran into an old acquaintance at the grocery store." },
  { id: 8, word: "characteristic", pos: "noun", definition: "(noun) a special quality or trait that makes a person, thing, or group different from others", sentence: "What are some of the characteristics of this breed of dog?" },
  { id: 9, word: "recognition", pos: "noun", definition: "(noun) the act of accepting that something is true or important or that it exists", sentence: "The procedure is gaining recognition as the latest advance in organ transplant surgery." },
  { id: 10, word: "preference", pos: "noun", definition: "(noun) a feeling of liking or wanting one person or thing more than another person or thing", sentence: "Car buyers have recently shown a growing preference for smaller vehicles." },
  { id: 11, word: "goodwill", pos: "noun", definition: "(noun) a kind, helpful, or friendly feeling or attitude", sentence: "She has goodwill toward all her coworkers." },
  { id: 12, word: "concept", pos: "noun", definition: "(noun) an idea of what something is or how it works", sentence: "She seems to be a little unclear on the concept of good manners." },
  { id: 13, word: "drought", pos: "noun", definition: "(noun) a long period of time during which there is very little or no rain", sentence: "The drought caused serious damage to crops." },
  { id: 14, word: "tropics", pos: "noun", definition: "(noun) either one of the two imaginary lines that circle the Earth to the north and south of the equator", sentence: "This plant is native to the tropics." },
  { id: 15, word: "enterprise", pos: "noun", definition: "(noun) a business organization", sentence: "The new regulations are intended to encourage the growth of small, independent enterprises." },
  { id: 16, word: "response", pos: "noun", definition: "(noun) something that is said or written as a reply to something", sentence: "He got a response to his letter." },
  { id: 17, word: "pastime", pos: "noun", definition: "(noun) an activity that you enjoy doing during your free time", sentence: "Baseball has been a national pastime for years." },
  { id: 18, word: "misconception", pos: "noun", definition: "(noun) a wrong or mistaken idea", sentence: "I'd like to clear up a few misconceptions about the schedule." },
  { id: 19, word: "misgiving", pos: "noun", definition: "(noun) a feeling of doubt about something", sentence: "Many people have expressed misgivings about her qualifications for the job." },
  { id: 20, word: "applicant", pos: "noun", definition: "(noun) someone who applies for something such as a job or admission to a college", sentence: "We interviewed 30 qualified applicants for the job." },
  { id: 21, word: "aisle", pos: "noun", definition: "(noun) a passage between sections of seats in a church, theater, airplane, etc", sentence: "My seat in the plane was on the aisle." },
  { id: 22, word: "aim", pos: "noun", definition: "(noun) a goal or purpose", sentence: "Our ultimate aim is to create something of lasting value." },
  { id: 23, word: "reverence", pos: "noun", definition: "(noun) honor or respect that is felt for or shown to someone or something", sentence: "Her poems are treated with reverence by other poets." },
  { id: 24, word: "speculation", pos: "noun", definition: "(noun) ideas or guesses about something that is not known", sentence: "There is speculation that he will run for president again." },
  { id: 25, word: "client", pos: "noun", definition: "(noun) a person who pays a professional person or organization for services", sentence: "The accountant is meeting with another client right now, but she'll be able to see you later this afternoon." },
  { id: 26, word: "endeavor", pos: "noun", definition: "(noun) a serious effort or attempt", sentence: "He failed despite his best endeavors." },
  { id: 27, word: "obedience", pos: "noun", definition: "(noun) an act or instance of obeying", sentence: "Students are expected to act in obedience to the rules of the school." },
  { id: 28, word: "stability", pos: "noun", definition: "(noun) the quality or state of something that is not easily changed or likely to change", sentence: "The young nation has not yet attained political stability." },
  { id: 29, word: "antipathy", pos: "noun", definition: "(noun) a strong feeling of dislike", sentence: "There has always been strong antipathy between the two groups." },
  { id: 30, word: "capability", pos: "noun", definition: "(noun) the ability to do something", sentence: "The device has the capability of recording two television channels at once." },
  { id: 31, word: "resignation", pos: "noun", definition: "(noun) an act of giving up a job or position in a formal or official way", sentence: "The chairman accepted their resignations." },
  { id: 32, word: "offspring", pos: "noun", definition: "(noun) a person's child, the young of an animal or plant", sentence: "The disease can be transmitted from parent to offspring." },
  { id: 33, word: "strategy", pos: "noun", definition: "(noun) a careful plan or method for achieving a particular goal usually over a long period of time", sentence: "They are proposing a new strategy for treating the disease with a combination of medications." },
  { id: 34, word: "dictatorship", pos: "noun", definition: "(noun) rule by a dictator : rule, control, or leadership by one person with total power", sentence: "The country suffered for many years under his dictatorship." },
  { id: 35, word: "contrast", pos: "noun", definition: "(noun) a difference between people or things that are being compared", sentence: "I observed an interesting contrast in the teaching styles of the two women." },
  { id: 36, word: "extinction", pos: "noun", definition: "(noun) the state or situation that results when something such as a plant or animal species has died out completely", sentence: "Several bird species are threatened with extinction." },
  { id: 37, word: "algebra", pos: "noun", definition: "(noun) a branch of mathematics that uses numbers and letters that represent numbers", sentence: "If the math equation you're doing has letters or other symbols that stand for numbers, you're likely doing algebra." },
  { id: 38, word: "arithmetic", pos: "noun", definition: "(noun) a branch of mathematics that deals with numbers and their addition, subtraction, multiplication, and division", sentence: "If you're good at adding, subtracting, dividing, and multiplying, then you're good at arithmetic." },
  { id: 39, word: "geometry", pos: "noun", definition: "(noun) a branch of mathematics that deals with points, lines, angles, surfaces, and solids", sentence: "John passed his geometry test with flying colors." },
  { id: 40, word: "conspicuous", pos: "adj", definition: "(adj) very easy to see or notice", sentence: "The sign was placed in a very conspicuous spot." },
  { id: 41, word: "aloof", pos: "adj", definition: "(adj) not involved with or friendly toward other people", sentence: "She remained aloof despite their efforts to make friends." },
  { id: 42, word: "conscious", pos: "adj", definition: "(adj) awake and able to understand what is happening around you", sentence: "He didn't seem conscious of the danger." },
  { id: 43, word: "relative", pos: "adj", definition: "(adj) compared to someone or something else or to each other", sentence: "The car might seem expensive, but it's all relative." },
  { id: 44, word: "surplus", pos: "adj", definition: "(adj) more than the amount that is needed", sentence: "The government bought the surplus grain to help growers." },
  { id: 45, word: "trivial", pos: "adj", definition: "(adj) not important", sentence: "Compared to her problems, our problems seem trivial." },
  { id: 46, word: "distinct", pos: "adj", definition: "(adj) different in a way that you can see, hear, smell, feel, etc. : noticeably different", sentence: "Each herb has its own distinct flavor." },
  { id: 47, word: "intense", pos: "adj", definition: "(adj) very great in degree", sentence: "He shielded his eyes from the intense flash of light." },
  { id: 48, word: "proficient", pos: "adj", definition: "(adj) good at doing something", sentence: "He has become very proficient at computer programming." },
  { id: 49, word: "vulgar", pos: "adj", definition: "(adj) not having or showing good manners, good taste, or politeness", sentence: "I will not tolerate such vulgar language in my home." },
  { id: 50, word: "shrewd", pos: "adj", definition: "(adj) having or showing an ability to understand things and to make good judgments : mentally sharp or clever", sentence: "He was shrewd enough not to take the job when there was the possibility of getting a better one a few months later." }
];
