export interface PaymentActivationResult {
  paymentReference: string;
  paymentStatus: string;
  subscriptionActivated: boolean;
  membershipGranted: boolean;
}
