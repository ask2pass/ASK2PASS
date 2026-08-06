export interface WalletLedgerEntry {
  transactionId: string;
  walletId: string;
  coins: number;
  balanceAfter: number;
}
