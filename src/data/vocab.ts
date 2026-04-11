import { newVocabularySet as week2Vocab } from "./week2";
import { newVocabularySet as week3Vocab } from "./week3";

export type VocabWord = {
  id: number;
  word: string;
  pos: string;
  definition: string;
  sentence?: string;
  keywords?: string[];
  imageUrl?: string;
};

export function getVocabForWeek(weekId: string): VocabWord[] {
  if (weekId === "week_2") return week2Vocab;
  if (weekId === "week_3") return week3Vocab;
  return vocabData;
}

export const vocabData: VocabWord[] = [
  {
    id: 1,
    word: "archaeology",
    pos: "noun",
    definition:
      "a science that deals with past human life and activities by studying the bones, tools, etc., of ancient people",
    keywords: ["science", "past", "bones", "ancient"],
  },
  {
    id: 2,
    word: "pity",
    pos: "noun",
    definition:
      "a strong feeling of sadness or sympathy for someone or something",
    keywords: ["sadness", "sympathy", "feeling"],
  },
  {
    id: 3,
    word: "conscience",
    pos: "noun",
    definition:
      "the part of the mind that makes you aware of your actions as being either morally right or wrong",
    keywords: ["mind", "aware", "morally", "right", "wrong"],
  },
  {
    id: 4,
    word: "genius",
    pos: "noun",
    definition:
      "a very smart or talented person : a person who has a level of talent or intelligence that is very rare or remarkable",
    keywords: ["smart", "talented", "intelligence", "rare"],
  },
  {
    id: 5,
    word: "enthusiasm",
    pos: "noun",
    definition:
      "strong excitement about something : a strong feeling of active interest in something that you like or enjoy",
    keywords: ["excitement", "interest", "enjoy"],
  },
  {
    id: 6,
    word: "effect",
    pos: "noun",
    definition:
      "a change that results when something is done or happens : an event, condition, or state of affairs that is produced by a cause",
    keywords: ["change", "results", "cause"],
  },
  {
    id: 7,
    word: "logic",
    pos: "noun",
    definition:
      "a proper or reasonable way of thinking about or understanding something",
    keywords: ["reasonable", "thinking", "understanding"],
  },
  {
    id: 8,
    word: "gravity",
    pos: "noun",
    definition:
      "① a very serious quality or condition ② the natural force that tends to cause physical things to move towards each other",
    keywords: ["serious", "force", "move towards"],
  },
  {
    id: 9,
    word: "means",
    pos: "noun",
    definition: "a way of doing something or of achieving a desired result",
    keywords: ["way", "achieving", "result"],
  },
  {
    id: 10,
    word: "nerve",
    pos: "noun",
    definition:
      "one of the many thin parts that control movement and feeling by carrying messages between the brain and other parts of the body",
    keywords: ["control", "movement", "messages", "brain"],
  },
  {
    id: 11,
    word: "soul",
    pos: "noun",
    definition:
      "the spiritual part of a person that is believed to give life to the body and in many religions is believed to live forever",
    keywords: ["spiritual", "life", "forever"],
  },
  {
    id: 12,
    word: "prospect",
    pos: "noun",
    definition: "the possibility that something will happen in the future",
    keywords: ["possibility", "future", "happen"],
  },
  {
    id: 13,
    word: "philosophy",
    pos: "noun",
    definition:
      "① a particular set of ideas about knowledge, truth, the nature and meaning of life, etc. ② the study of ideas about knowledge, truth, the nature and meaning of life, etc.",
    keywords: ["ideas", "knowledge", "truth", "life"],
  },
  {
    id: 14,
    word: "prosperity",
    pos: "noun",
    definition:
      "the state of being successful usually by making a lot of money",
    keywords: ["successful", "money", "state"],
  },
  {
    id: 15,
    word: "phenomenon",
    pos: "noun",
    definition:
      "something such as an interesting fact or event that can be observed and studied and that typically is unusual or difficult to understand or explain fully",
    keywords: ["fact", "event", "observed", "unusual"],
  },
  {
    id: 16,
    word: "sympathy",
    pos: "noun",
    definition:
      "the feeling that you care about and are sorry about someone else's trouble, grief, misfortune",
    keywords: ["care", "sorry", "trouble", "grief"],
  },
  {
    id: 17,
    word: "justice",
    pos: "noun",
    definition:
      "the process or result of using laws to fairly judge and punish crimes and criminals",
    keywords: ["laws", "fairly", "judge", "punish"],
  },
  {
    id: 18,
    word: "welfare",
    pos: "noun",
    definition: "the state of being happy, healthy, or successful",
    keywords: ["happy", "healthy", "successful"],
  },
  {
    id: 19,
    word: "biology",
    pos: "noun",
    definition:
      "a science that deals with things that are alive such as plants and animals",
    keywords: ["science", "alive", "plants", "animals"],
  },
  {
    id: 20,
    word: "theory",
    pos: "noun",
    definition:
      "an idea or set of ideas that is intended to explain facts or events",
    keywords: ["idea", "explain", "facts", "events"],
  },
  {
    id: 21,
    word: "temper",
    pos: "noun",
    definition:
      "① the tendency of someone to become angry ② a state of being angry",
    keywords: ["tendency", "angry", "state"],
  },
  {
    id: 22,
    word: "psychology",
    pos: "noun",
    definition: "the science or study of the mind and behavior",
    keywords: ["science", "study", "mind", "behavior"],
  },
  {
    id: 23,
    word: "reputation",
    pos: "noun",
    definition:
      "the common opinion that people have about someone or something",
    keywords: ["common", "opinion", "people"],
  },
  {
    id: 24,
    word: "biography",
    pos: "noun",
    definition:
      "the story of a real person's life written by someone other than that person",
    keywords: ["story", "life", "written"],
  },
  {
    id: 25,
    word: "principle",
    pos: "noun",
    definition:
      "a basic truth or theory : an idea that forms the basis of something",
    keywords: ["basic", "truth", "theory", "basis"],
  },
  {
    id: 26,
    word: "contract",
    pos: "noun",
    definition: "a legal agreement between people, companies, etc.",
    keywords: ["legal", "agreement", "people", "companies"],
  },
  {
    id: 27,
    word: "fault",
    pos: "noun",
    definition:
      "a bad quality or part of someone's character : a weakness in character",
    keywords: ["bad", "quality", "weakness", "character"],
  },
  {
    id: 28,
    word: "suburb",
    pos: "noun",
    definition:
      "a town or other area where people live in houses near a larger city",
    keywords: ["town", "area", "houses", "near city"],
  },
  {
    id: 29,
    word: "superstition",
    pos: "noun",
    definition:
      "a belief or way of behaving that is based on fear of the unknown and faith in magic or luck",
    keywords: ["belief", "fear", "magic", "luck"],
  },
  {
    id: 30,
    word: "zeal",
    pos: "noun",
    definition:
      "a strong feeling of interest and enthusiasm that makes someone very eager or determined to do something",
    keywords: ["interest", "enthusiasm", "eager", "determined"],
  },
  {
    id: 31,
    word: "progress",
    pos: "noun",
    definition: "movement forward or toward a place",
    keywords: ["movement", "forward", "toward"],
  },
  {
    id: 32,
    word: "chaos",
    pos: "noun",
    definition: "complete confusion and disorder",
    keywords: ["complete", "confusion", "disorder"],
  },
  {
    id: 33,
    word: "motive",
    pos: "noun",
    definition: "a reason for doing something",
    keywords: ["reason", "doing"],
  },
  {
    id: 34,
    word: "agriculture",
    pos: "noun",
    definition: "the science or occupation of farming",
    keywords: ["science", "occupation", "farming"],
  },
  {
    id: 35,
    word: "statistics",
    pos: "noun",
    definition:
      "a number that represents a piece of information such as information about how often something is done, how common something is, etc.",
    keywords: ["number", "information", "how often", "common"],
  },
  {
    id: 36,
    word: "metropolis",
    pos: "noun",
    definition: "a very large or important city",
    keywords: ["large", "important", "city"],
  },
  {
    id: 37,
    word: "friction",
    pos: "noun",
    definition:
      "① the force that causes a moving object to slow down when it is touching another object ② disagreement or tension between people or groups of people",
    keywords: ["force", "slow down", "disagreement", "tension"],
  },
  {
    id: 38,
    word: "proverb",
    pos: "noun",
    definition:
      'a brief popular saying (such as "Too many cooks spoil the broth") that gives advice about how people should live or that expresses a belief that is generally thought to be true',
    keywords: ["brief", "saying", "advice", "belief"],
  },
  {
    id: 39,
    word: "ambition",
    pos: "noun",
    definition:
      "a particular goal or aim : something that a person hopes to do or achieve",
    keywords: ["goal", "aim", "hopes", "achieve"],
  },
  {
    id: 40,
    word: "tragedy",
    pos: "noun",
    definition:
      "a very bad event that causes great sadness and often involves someone's death",
    keywords: ["bad event", "sadness", "death"],
  },
  {
    id: 41,
    word: "obstacle",
    pos: "noun",
    definition: "something that makes it difficult to do something",
    keywords: ["difficult", "do something"],
  },
  {
    id: 42,
    word: "attitude",
    pos: "noun",
    definition: "the way you think and feel about someone or something",
    keywords: ["way", "think", "feel"],
  },
  {
    id: 43,
    word: "meteorite",
    pos: "noun",
    definition:
      "a piece of rock or metal that has fallen to the ground from outer space : a meteor that reaches the surface of the Earth without burning up entirely",
    keywords: ["rock", "metal", "outer space", "Earth"],
  },
  {
    id: 44,
    word: "foundation",
    pos: "noun",
    definition:
      "a usually stone or concrete structure that supports a building from underneath",
    keywords: ["stone", "structure", "supports", "underneath"],
  },
  {
    id: 45,
    word: "adversity",
    pos: "noun",
    definition: "a difficult situation or condition : misfortune or tragedy",
    keywords: ["difficult", "situation", "misfortune", "tragedy"],
  },
  {
    id: 46,
    word: "destiny",
    pos: "noun",
    definition:
      "what happens in the future : the things that someone or something will experience in the future",
    keywords: ["happens", "future", "experience"],
  },
  {
    id: 47,
    word: "nomad",
    pos: "noun",
    definition:
      "a member of a group of people who move from place to place instead of living in one place all the time",
    keywords: ["member", "move", "place to place"],
  },
  {
    id: 48,
    word: "function",
    pos: "noun",
    definition:
      "the special purpose or activity for which a thing exists or is used",
    keywords: ["special", "purpose", "activity", "used"],
  },
  {
    id: 49,
    word: "barometer",
    pos: "noun",
    definition:
      "① an instrument that is used to measure air pressure and predict changes in the weather ② something that is used to indicate or predict something",
    keywords: ["instrument", "measure", "predict", "weather"],
  },
  {
    id: 50,
    word: "ecology",
    pos: "noun",
    definition:
      "the relationships between a group of living things and their environment/ a science that deals with the relationships between groups of living things and their environments",
    keywords: ["relationships", "living things", "environment", "science"],
  },
];
