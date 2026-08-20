import { Injectable } from '@nestjs/common';

export type KnowledgeSourceAuthority =
  | 'AUTHORITATIVE'
  | 'TRUSTED'
  | 'GENERAL';

export interface KnowledgeSourceDefinition {
  name: string;
  authority: KnowledgeSourceAuthority;
  enabled: boolean;
  description: string;
}

@Injectable()
export class KnowledgeSourceRegistry {
  private readonly sources = new Map<
    string,
    KnowledgeSourceDefinition
  >();

  constructor() {
    this.register({
      name: 'ASK2PASS-WAEC-CURRICULUM',
      authority: 'AUTHORITATIVE',
      enabled: true,
      description:
        'Authoritative ASK2PASS curriculum knowledge derived from WAEC/WASSCE curriculum records.',
    });
  }

  register(source: KnowledgeSourceDefinition): void {
    this.sources.set(source.name, source);
  }

  get(name: string): KnowledgeSourceDefinition | undefined {
    return this.sources.get(name);
  }

  list(): KnowledgeSourceDefinition[] {
    return [...this.sources.values()];
  }

  enabled(): KnowledgeSourceDefinition[] {
    return this.list().filter((source) => source.enabled);
  }
}
