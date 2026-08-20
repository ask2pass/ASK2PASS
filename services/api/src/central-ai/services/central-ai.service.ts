import { Injectable } from '@nestjs/common';

import {
  CentralAIRequest,
  CentralAIResponse,
} from '../interfaces/central-ai.types';
import { CentralAIProvider } from '../interfaces/central-ai-provider.interface';
import { AIProviderRegistry } from '../registry/ai-provider.registry';
import { CentralAIContextAssemblyService } from './context-assembly.service';
import { CentralKnowledgeRetrievalService } from './knowledge-retrieval.service';

@Injectable()
export class CentralAIService {
  constructor(
    private readonly knowledgeRetrieval: CentralKnowledgeRetrievalService,
    private readonly contextAssembly: CentralAIContextAssemblyService,
    private readonly providerRegistry: AIProviderRegistry,
  ) {}

  async process(
    request: CentralAIRequest,
  ): Promise<CentralAIResponse> {
    const retrievedContext =
      await this.knowledgeRetrieval.retrieve(request);

    const context =
      this.contextAssembly.assemble(
        request,
        retrievedContext,
      );

    const provider =
      this.providerRegistry.get();

    return provider.generate(
      request,
      context,
    );
  }
}
