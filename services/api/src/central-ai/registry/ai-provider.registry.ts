import {
  BadRequestException,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';

import { CentralAIProvider } from '../interfaces/central-ai-provider.interface';
import { CentralAIProviderService } from '../providers/central-ai-provider.service';

@Injectable()
export class AIProviderRegistry {
  private readonly providers = new Map<string, CentralAIProvider>();
  private defaultProviderName?: string;

  constructor(
    private readonly baseProvider: CentralAIProviderService,
  ) {
    this.register(baseProvider);
  }

  register(provider: CentralAIProvider): void {
    this.providers.set(provider.name, provider);

    if (!this.defaultProviderName) {
      this.defaultProviderName = provider.name;
    }
  }

  setDefault(providerName: string): void {
    if (!this.providers.has(providerName)) {
      throw new BadRequestException(
        `AI provider "${providerName}" is not registered.`,
      );
    }

    this.defaultProviderName = providerName;
  }

  get(providerName?: string): CentralAIProvider {
    const name = providerName ?? this.defaultProviderName;

    if (!name) {
      throw new ServiceUnavailableException(
        'No AI provider is registered.',
      );
    }

    const provider = this.providers.get(name);

    if (!provider) {
      throw new ServiceUnavailableException(
        `AI provider "${name}" is not registered.`,
      );
    }

    if (provider.status !== 'AVAILABLE') {
      throw new ServiceUnavailableException(
        `AI provider "${name}" is not available.`,
      );
    }

    return provider;
  }

  list(): Array<{
    name: string;
    status: string;
    capabilities: readonly string[];
    default: boolean;
  }> {
    return [...this.providers.values()].map((provider) => ({
      name: provider.name,
      status: provider.status,
      capabilities: provider.capabilities,
      default: provider.name === this.defaultProviderName,
    }));
  }
}
