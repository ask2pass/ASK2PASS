import { Injectable } from '@nestjs/common';

@Injectable()
export class BMSAPGateService {
  evaluate(data: {
    sapUser: boolean;
    activitiesCompleted: number;
    activitiesRequired: number;
    practicalPassed?: boolean;
    examPassed: boolean;
  }) {
    const activitiesComplete =
      data.activitiesRequired > 0 &&
      data.activitiesCompleted >= data.activitiesRequired;

    const practicalPassed = data.practicalPassed === true;

    const certificationEligible =
      !data.sapUser ||
      (
        activitiesComplete &&
        practicalPassed &&
        data.examPassed
      );

    return {
      bmRequired: data.sapUser,
      learningRequired: data.sapUser,
      activitiesComplete,
      practicalRequired: data.sapUser,
      practicalPassed,
      examRequired: data.sapUser,
      examPassed: data.examPassed,
      certificationEligible,
      autoEngineAccessIndependent: true,
    };
  }
}
