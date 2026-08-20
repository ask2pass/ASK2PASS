import {
  CentralAIContext,
  CentralAIRequest,
} from './central-ai.types';

export interface KnowledgeRetrievalService {
  retrieve(
    request: CentralAIRequest,
  ): Promise<CentralAIContext>;
}
