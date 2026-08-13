import { Injectable } from '@nestjs/common';

@Injectable()
export class BMAssessmentService {
  getAssessmentPolicy() {
    return {
      compulsoryForSAPUsers: true,
      passMarkPercentage: 70,
      practicalComponentRequired: true,
      finalExamRequired: true,
      certificationBlockedUntilPassed: true,
    };
  }

  evaluate(score: number) {
    const passMark = 70;
    return {
      score,
      passed: score >= passMark,
      passMark,
    };
  }
}
