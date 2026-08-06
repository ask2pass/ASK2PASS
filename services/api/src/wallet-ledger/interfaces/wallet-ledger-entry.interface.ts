export interface WalletLedgerEntry {
  id: string;
  transactionId: string;
  walletId: string;
  coins: number;
  balanceAfter: number;
}
