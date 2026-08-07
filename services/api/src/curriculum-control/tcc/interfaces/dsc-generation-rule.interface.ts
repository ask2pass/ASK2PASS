export interface DSCGenerationRule {

  classLevel: string;

  subjectsPerDay: number;

  lessonMinutes: number;
  revisionMinutes: number;
  quizMinutes: number;

  topicDistributionBalanced: boolean;

  preventTopicSkipping: boolean;

}
