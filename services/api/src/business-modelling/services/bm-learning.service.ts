import { Injectable } from '@nestjs/common';
import { BMActivityType } from '../enums/bm-activity-type.enum';

@Injectable()
export class BMLearningService {
  getCurriculum() {
    return {
      name: 'Business Modelling',
      purpose: 'Teach users to understand, construct, evaluate and communicate business models.',
      phases: [
        'FOUNDATION',
        'MARKET',
        'BUSINESS_MODEL',
        'FINANCIAL_MODEL',
        'RISK_AND_GROWTH',
        'PRACTICAL_MODELLING',
        'EXAMINATION',
      ],
      activities: Object.values(BMActivityType),
    };
  }

  getRequiredSAPActivities() {
    return [
      BMActivityType.BUSINESS_IDEA,
      BMActivityType.CUSTOMER_ANALYSIS,
      BMActivityType.VALUE_PROPOSITION,
      BMActivityType.MARKET_ANALYSIS,
      BMActivityType.COMPETITOR_ANALYSIS,
      BMActivityType.BUSINESS_MODEL,
      BMActivityType.PRICING,
      BMActivityType.REVENUE,
      BMActivityType.COST_STRUCTURE,
      BMActivityType.FINANCIAL_MODEL,
      BMActivityType.BREAK_EVEN,
      BMActivityType.ROI,
      BMActivityType.RISK_ANALYSIS,
      BMActivityType.PRACTICAL_MODEL,
    ];
  }
}
