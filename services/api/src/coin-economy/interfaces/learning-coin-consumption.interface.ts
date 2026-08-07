export interface LearningCoinConsumptionRequest {
  walletId: string;
  learnerId: string;
  sessionId: string;
  lessonId: string;
  coins: number;
  reference: string;
  description: string;
}

export interface LearningCoinConsumptionResult {
  authorized: boolean;
  transactionId: string | null;
  ledgerId: string | null;
  walletId: string;
  coinsConsumed: number;
  balanceAfter: number;
  idempotent: boolean;
  reason: string | null;
}
