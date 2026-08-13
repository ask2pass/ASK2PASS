import { Injectable } from '@nestjs/common';
import {
  BMAutoEngineRequest,
  BMAutoEngineResult,
} from '../interfaces/bm-auto-engine.interface';

@Injectable()
export class BMAutoEngineService {
  calculate(request: BMAutoEngineRequest): BMAutoEngineResult {
    const model = request.model;

    const revenue = model.revenueItems.reduce(
      (sum, item) => sum + item.quantity * item.unitPrice,
      0,
    );

    const costs = model.costItems.reduce(
      (sum, item) => sum + item.amount,
      0,
    );

    const profit = revenue - costs;

    const capitalRequired =
      model.capital ?? costs;

    const fixedCosts = model.costItems
      .filter(item => !item.recurring)
      .reduce((sum, item) => sum + item.amount, 0);

    const variableCosts = model.costItems
      .filter(item => item.recurring)
      .reduce((sum, item) => sum + item.amount, 0);

    const firstRevenueItem = model.revenueItems[0];

    const unitPrice =
      firstRevenueItem?.unitPrice ?? 0;

    const breakEvenUnits =
      unitPrice > 0
        ? Math.ceil(
            (fixedCosts + variableCosts) / unitPrice,
          )
        : null;

    const roiPercentage =
      capitalRequired > 0
        ? (profit / capitalRequired) * 100
        : null;

    const marginPercentage =
      revenue > 0
        ? (profit / revenue) * 100
        : null;

    const warnings: string[] = [];

    if (revenue <= 0)
      warnings.push(
        'Revenue assumptions produce no revenue.',
      );

    if (capitalRequired <= 0)
      warnings.push(
        'Capital requirement is not defined.',
      );

    if (profit < 0)
      warnings.push(
        'Current assumptions produce a negative result.',
      );

    if (marginPercentage !== null && marginPercentage < 10)
      warnings.push(
        'Projected profit margin is below 10%.',
      );

    return {
      learnerId: request.learnerId,
      scenario: request.scenario ?? 'BASE',
      output: {
        revenue,
        costs,
        profit,
        capitalRequired,
        breakEvenUnits,
        roiPercentage,
        assumptionsUsed: model.assumptions,
        warnings,
      },
      generatedAt: new Date(),
    };
  }

  compare(
    requests: BMAutoEngineRequest[],
  ) {
    return requests.map(request => ({
      scenario: request.scenario ?? 'BASE',
      result: this.calculate(request),
    }));
  }
}
