export type LearningModuleId =
  | 'scla'
  | 'ptdm'
  | 'cedm'
  | 'medm'
  | 'sap'
  | 'bm'
  | 'aem'
  | 'dsc'
  | 'dccTcc'
  | 'library'
  | 'hallOfFame'
  | 'suggestions';

export type LearningModuleConfig = {
  id: LearningModuleId;
  acronym: string;
  title: string;
  icon: string;
  description: string;
  learningPath: string;
  supportsBackForward: boolean;
};

export const LEARNING_MODULE_CONFIG: Record<
  LearningModuleId,
  LearningModuleConfig
> = {
  scla: {
    id: 'scla',
    acronym: 'SCLA',
    title: 'School Classroom Learning Activities',
    icon: '🏫',
    description:
      'Structured classroom learning activities coordinated around subjects, lessons, classroom participation and curriculum progression.',
    learningPath: 'SCLA',
    supportsBackForward: false,
  },

  ptdm: {
    id: 'ptdm',
    acronym: 'PTDM',
    title: 'Personal Tutor Drill Module',
    icon: '👨‍🏫',
    description:
      'Personal tutor-guided drills, practice activities, reinforcement and learner-specific academic support.',
    learningPath: 'PTDM',
    supportsBackForward: true,
  },

  cedm: {
    id: 'cedm',
    acronym: 'CEDM',
    title: 'Certificate Examination Drilling Module',
    icon: '🎓',
    description:
      'Certificate examination preparation through structured drills, revision, assessment practice and performance tracking.',
    learningPath: 'CEDM',
    supportsBackForward: true,
  },

  medm: {
    id: 'medm',
    acronym: 'MEDM',
    title: 'Mock Examination Drill Module',
    icon: '📝',
    description:
      'Mock examination activities for timed practice, examination readiness, performance review and improvement.',
    learningPath: 'MEDM',
    supportsBackForward: false,
  },

  sap: {
    id: 'sap',
    acronym: 'SAP',
    title: 'Skill Acquisition Programme',
    icon: '⚙️',
    description:
      'Practical skill acquisition, guided activities, competency development, progression and skill-performance assessment.',
    learningPath: 'SAP',
    supportsBackForward: true,
  },

  bm: {
    id: 'bm',
    acronym: 'BM',
    title: 'Business Modelling',
    icon: '📊',
    description:
      'Business and operational modelling activities covering business ideas, structures, competencies, assessment and progression.',
    learningPath: 'BM',
    supportsBackForward: true,
  },

  aem: {
    id: 'aem',
    acronym: 'AEM',
    title: 'Adult Education Module',
    icon: '📖',
    description:
      'The ABC of Reading and Writing for adult learners, with foundational literacy activities, guided practice and progression.',
    learningPath: 'AEM',
    supportsBackForward: true,
  },

  dsc: {
    id: 'dsc',
    acronym: 'DSC',
    title: 'Daily Subject Chart',
    icon: '📅',
    description:
      'Daily subjects, lesson topics, lesson sequencing and recovery of missed learning activities.',
    learningPath: 'DSC',
    supportsBackForward: true,
  },

  dccTcc: {
    id: 'dccTcc',
    acronym: 'DCC/TCC',
    title: 'Dynamic / Termly Curriculum Charts',
    icon: '🗓️',
    description:
      'Curriculum compliance, termly workload distribution, curriculum balancing and dynamic curriculum planning.',
    learningPath: 'DCC/TCC',
    supportsBackForward: true,
  },

  library: {
    id: 'library',
    acronym: 'LIBRARY',
    title: 'ASK2PASS Library',
    icon: '📚',
    description:
      'Educational resources, learning materials and authoritative sources supporting the learner across ASK2PASS.',
    learningPath: 'LIBRARY',
    supportsBackForward: true,
  },

  hallOfFame: {
    id: 'hallOfFame',
    acronym: 'TOP 10',
    title: 'Hall of Fame',
    icon: '🏆',
    description:
      'Recognition and display of the top star earners for each class level.',
    learningPath: 'HALL_OF_FAME',
    supportsBackForward: true,
  },

  suggestions: {
    id: 'suggestions',
    acronym: 'SUGGEST',
    title: 'Suggestion Center',
    icon: '💡',
    description:
      'Learner suggestions, feedback, improvement ideas and platform participation.',
    learningPath: 'SUGGESTIONS',
    supportsBackForward: true,
  },
};
