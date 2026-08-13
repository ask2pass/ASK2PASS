import { Injectable } from '@nestjs/common';

@Injectable()
export class BMCompetencyService {
  evaluate(
    activitiesCompleted: number,
    activitiesRequired: number,
    examPassed: boolean,
    practicalPassed: boolean,
  ) {
    const activitiesComplete =
      activitiesRequired > 0 &&
      activitiesCompleted >= activitiesRequired;

    const certificationEligible =
      activitiesComplete && examPassed && practicalPassed;

    return {
      activitiesComplete,
      examPassed,
      practicalPassed,
      certificationEligible,
    };
  }
}
