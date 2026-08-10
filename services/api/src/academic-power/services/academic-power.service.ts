import { Injectable } from '@nestjs/common';
import {
  AcademicPowerBand,
  AcademicPowerProfile,
  SapReadiness,
} from '../interfaces/academic-power.interface';
import { BuildAcademicProfileDto } from '../dto/build-academic-profile.dto';

@Injectable()
export class AcademicPowerService {
  private readonly version = 1;

  build(dto: BuildAcademicProfileDto): AcademicPowerProfile {
    if (!dto.subjects || dto.subjects.length === 0) {
      throw new Error('At least one subject is required.');
    }

    const overallMasteryPercent = Number(
      (
        dto.subjects.reduce(
          (sum, subject) => sum + subject.masteryPercent,
          0,
        ) / dto.subjects.length
      ).toFixed(2),
    );

    const masteredSubjects = dto.subjects.filter(
      (subject) => subject.masteryPercent >= 90,
    ).length;

    const subjectsTracked = dto.subjects.length;

    const academicPowerBand =
      this.resolveAcademicPowerBand(overallMasteryPercent);

    const sapReadiness = this.resolveSapReadiness(
      overallMasteryPercent,
      masteredSubjects,
      subjectsTracked,
    );

    const weakestSubject = [...dto.subjects].sort(
      (a, b) => a.masteryPercent - b.masteryPercent,
    )[0];

    return {
      learnerId: dto.learnerId,
      examinationType: dto.examinationType,
      overallMasteryPercent,
      academicPowerBand,
      sapReadiness,
      subjectsTracked,
      masteredSubjects,
      activeSubjectId:
        dto.activeSubjectId ?? weakestSubject.subjectId,
      activeTopicId: dto.activeTopicId ?? null,
      nextAction:
        dto.nextAction ??
        this.resolveNextAction(overallMasteryPercent),
      generatedAt: new Date().toISOString(),
      version: this.version,
    };
  }

  private resolveAcademicPowerBand(
    mastery: number,
  ): AcademicPowerBand {
    if (mastery < 40) {
      return 'FOUNDATION';
    }

    if (mastery < 65) {
      return 'DEVELOPING';
    }

    if (mastery < 80) {
      return 'PROGRESSING';
    }

    if (mastery < 90) {
      return 'ASSESSMENT_READY';
    }

    return 'MASTERED';
  }

  private resolveSapReadiness(
    overallMastery: number,
    _masteredSubjects: number,
    _totalSubjects: number,
  ): SapReadiness {
    /*
     * FINAL ASK2PASS SAP READINESS CONTRACT
     *
     * SAP readiness follows the learner's overall academic
     * mastery level. Subject-count ratios must NOT override
     * the academic mastery band.
     *
     * <60%       -> NOT_READY
     * 60–79.99%  -> DEVELOPING
     * 80–89.99%  -> READY
     * >=90%      -> EXAM_READY
     */

    if (overallMastery < 60) {
      return 'NOT_READY';
    }

    if (overallMastery < 80) {
      return 'DEVELOPING';
    }

    if (overallMastery < 90) {
      return 'READY';
    }

    return 'EXAM_READY';
  }

  private resolveNextAction(
    mastery: number,
  ):
    | 'LEARN'
    | 'PRACTICE'
    | 'DRILL'
    | 'ASSESS'
    | 'REVIEW' {
    if (mastery < 40) {
      return 'LEARN';
    }

    if (mastery < 65) {
      return 'PRACTICE';
    }

    if (mastery < 80) {
      return 'DRILL';
    }

    if (mastery < 90) {
      return 'ASSESS';
    }

    return 'REVIEW';
  }
}
