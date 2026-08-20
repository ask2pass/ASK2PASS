import { Module } from '@nestjs/common';

import { CurriculumModule } from '../curriculum/curriculum.module';

import { CentralAIController } from './controllers/central-ai.controller';
import { CentralAIProvider } from './interfaces/central-ai-provider.interface';
import { CentralAIProviderService } from './providers/central-ai-provider.service';
import { AIProviderRegistry } from './registry/ai-provider.registry';
import { KnowledgeSourceRegistry } from './registry/knowledge-source.registry';
import { CentralAIContextAssemblyService } from './services/context-assembly.service';
import { CentralAIService } from './services/central-ai.service';
import { CentralKnowledgeRetrievalService } from './services/knowledge-retrieval.service';
import { WAECKnowledgeService } from './services/waec-knowledge.service';

@Module({
  imports: [CurriculumModule],
  controllers: [CentralAIController],
  providers: [
    CentralAIService,
    CentralAIContextAssemblyService,
    CentralKnowledgeRetrievalService,
    WAECKnowledgeService,
    CentralAIProviderService,
    AIProviderRegistry,
    KnowledgeSourceRegistry,
    {
      provide: CentralAIProvider,
      useExisting: CentralAIProviderService,
    },
  ],
  exports: [
    CentralAIService,
    CentralAIContextAssemblyService,
    CentralKnowledgeRetrievalService,
    AIProviderRegistry,
    KnowledgeSourceRegistry,
    CentralAIProviderService,
  ],
})
export class CentralAIModule {}
