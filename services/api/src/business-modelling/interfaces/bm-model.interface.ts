export interface BMModelInput {
  businessName?: string;
  businessIdea: string;
  assumptions: Record<string, number | string | boolean>;
  revenueItems: Array<{
    name: string;
    quantity: number;
    unitPrice: number;
  }>;
  costItems: Array<{
    name: string;
    amount: number;
    recurring?: boolean;
  }>;
  capital?: number;
  periodMonths?: number;
}

export interface BMModelOutput {
  revenue: number;
  costs: number;
  profit: number;
  capitalRequired: number;
  breakEvenUnits: number | null;
  roiPercentage: number | null;
  assumptionsUsed: Record<string, number | string | boolean>;
  warnings: string[];
}
