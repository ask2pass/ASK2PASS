export type CentralAIRequestType =
  | 'QUESTION'
  | 'EXPLAIN'
  | 'PRACTICE'
  | 'DRILL'
  | 'ASSESS'
  | 'REVIEW'
  | 'LESSON_SUPPORT'
  | 'GENERAL';

export type CentralAIModule =
  | 'SCLA'
  | 'PTDM'
  | 'CEDM'
  | 'MEDM'
  | 'SAP'
  | 'BM'
  | 'AEM'
  | 'GENERAL';

export type AIProviderStatus =
  | 'AVAILABLE'
  | 'UNAVAILABLE'
  | 'DISABLED';

export interface CentralAIRequest {
  learnerId?: string;
  sessionId?: string;
  module?: CentralAIModule;
  classLevel?: string;
  subject?: string;
  topic?: string;
  lessonId?: string;
  type: CentralAIRequestType;
  message: string;
  tutor?: string;
}

export interface CentralAIKnowledgeItem {
  id: string;
  source: string;
  authority: 'AUTHORITATIVE' | 'TRUSTED' | 'GENERAL';
  title?: string;
  content: string;
  relevance: number;
}

export interface CentralAIContext {
  module?: CentralAIModule;
  classLevel?: string;
  subject?: string;
  topic?: string;
  lessonId?: string;

  curriculumContext?: {
    programme?: string;
    examination?: string;
    lessonTitle?: string;
  };

  retrievedKnowledge: CentralAIKnowledgeItem[];
}

export interface CentralAIResponse {
  answer: string;
  grounded: boolean;
  provider: string;

  context: {
    module?: CentralAIModule;
    subject?: string;
    topic?: string;
  };

  sources: CentralAIKnowledgeItem[];
}
