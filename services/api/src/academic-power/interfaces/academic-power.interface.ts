
export type AcademicPowerBand =
  | 'FOUNDATION'
  | 'DEVELOPING'
  | 'PROGRESSING'
  | 'ASSESSMENT_READY'
  | 'MASTERED';

export type SapReadiness =
  | 'NOT_READY'
  | 'DEVELOPING'
  | 'READY'
  | 'EXAM_READY';

export interface AcademicPowerProfile {
  learnerId: string;
  examinationType: string;
  overallMasteryPercent: number;
  academicPowerBand: AcademicPowerBand;
  sapReadiness: SapReadiness;
  subjectsTracked: number;
  masteredSubjects: number;
  activeSubjectId: string | null;
  activeTopicId: string | null;
  nextAction:
    | 'LEARN'
    | 'PRACTICE'
    | 'DRILL'
    | 'ASSESS'
    | 'REVIEW';
  generatedAt: string;
  version: number;
}
