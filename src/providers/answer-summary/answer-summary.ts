import {AnswerKey} from "front-end-common";

/**
 * Count of the number of responses given for each Answer(Key).
 */
interface AnswerMap {
  /* The string should come from AnswerKey.[answerKey:AnswerKey]. */
  [index: string]: number;
}

/**
 * Maps to AnswerSummary.
 */
export class AnswerSummary {
  puzzleId: number;
  correctAnswer: AnswerKey;
  myAnswer: AnswerKey;
  answerMap: AnswerMap;
}
