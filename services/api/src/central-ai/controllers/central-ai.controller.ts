import { Body, Controller, Get, Post } from '@nestjs/common';

import type { CentralAIRequest } from '../interfaces/central-ai.types';
import { AIProviderRegistry } from '../registry/ai-provider.registry';
import { KnowledgeSourceRegistry } from '../registry/knowledge-source.registry';
import { CentralAIService } from '../services/central-ai.service';

@Controller('central-ai')
export class CentralAIController {
  constructor(
    private readonly centralAIService: CentralAIService,
    private readonly providerRegistry: AIProviderRegistry,
    private readonly knowledgeSourceRegistry: KnowledgeSourceRegistry,
  ) {}

  @Post('process')
  process(@Body() request: CentralAIRequest) {
    return this.centralAIService.process(request);
  }

  @Get('providers')
  providers() {
    return this.providerRegistry.list();
  }

  @Get('knowledge-sources')
  knowledgeSources() {
    return this.knowledgeSourceRegistry.list();
  }
}
