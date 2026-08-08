export interface LearningRuntimeConsumptionRequest {
  walletId: string;
  learnerId: string;
  sessionId: string;
  lessonId: string;
  coins: number;
  reference: string;
  description: string;
}

export interface LearningRuntimeConsumptionResult {
  authorized: boolean;
  transactionId: string | null;
  ledgerId: string | null;
  walletId: string;
  coinsConsumed: number;
  balanceAfter: number;
  idempotent: boolean;
  reason: string | null;
}
