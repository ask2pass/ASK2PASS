export interface CoinTransactionResult {
  transactionId: string;
  ledgerId: string;
  walletId: string;
  coins: number;
  balanceAfter: number;
  idempotent: boolean;
}
