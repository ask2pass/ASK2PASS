import { randomUUID } from 'crypto';

export class IdentityGenerator {
  static generate(): string {
    return randomUUID();
  }
}
