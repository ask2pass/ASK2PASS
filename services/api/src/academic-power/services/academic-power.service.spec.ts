
import { AcademicPowerService } from './academic-power.service';

describe('AcademicPowerService', () => {
  const service = new AcademicPowerService();

  it('builds a foundation profile', () => {
    const result = service.build({
      learnerId: 'learner-1',
      examinationType: 'BECE',
      subjects: [
        { subjectId: 'mathematics', masteryPercent: 30 },
        { subjectId: 'english', masteryPercent: 40 },
      ],
    });

    expect(result.overallMasteryPercent).toBe(35);
    expect(result.academicPowerBand).toBe('FOUNDATION');
    expect(result.sapReadiness).toBe('NOT_READY');
    expect(result.nextAction).toBe('LEARN');
  });

  it('identifies assessment readiness', () => {
    const result = service.build({
      learnerId: 'learner-2',
      examinationType: 'WASSCE',
      subjects: [
        { subjectId: 'mathematics', masteryPercent: 85 },
        { subjectId: 'english', masteryPercent: 82 },
      ],
    });

    expect(result.academicPowerBand).toBe('ASSESSMENT_READY');
    expect(result.sapReadiness).toBe('READY');
    expect(result.nextAction).toBe('ASSESS');
  });

  it('identifies exam readiness', () => {
    const result = service.build({
      learnerId: 'learner-3',
      examinationType: 'WASSCE',
      subjects: [
        { subjectId: 'mathematics', masteryPercent: 95 },
        { subjectId: 'english', masteryPercent: 92 },
        { subjectId: 'physics', masteryPercent: 90 },
        { subjectId: 'chemistry', masteryPercent: 94 },
      ],
    });

    expect(result.overallMasteryPercent).toBe(92.75);
    expect(result.academicPowerBand).toBe('MASTERED');
    expect(result.sapReadiness).toBe('EXAM_READY');
    expect(result.masteredSubjects).toBe(4);
    expect(result.nextAction).toBe('REVIEW');
  });

  it('preserves the active learning context', () => {
    const result = service.build({
      learnerId: 'learner-4',
      examinationType: 'NECO',
      subjects: [
        { subjectId: 'science', masteryPercent: 70 },
        { subjectId: 'english', masteryPercent: 75 },
      ],
      activeSubjectId: 'science',
      activeTopicId: 'biology-cell-structure',
      nextAction: 'DRILL',
    });

    expect(result.activeSubjectId).toBe('science');
    expect(result.activeTopicId).toBe('biology-cell-structure');
    expect(result.nextAction).toBe('DRILL');
  });

  describe('SAP readiness boundary contract', () => {
    it('returns NOT_READY below 60% overall mastery', () => {
      const result = service.build({
        learnerId: 'sap-1',
        examinationType: 'BECE',
        subjects: [
          { subjectId: 'mathematics', masteryPercent: 35 },
          { subjectId: 'english', masteryPercent: 35 },
        ],
      });

      expect(result.overallMasteryPercent).toBe(35);
      expect(result.sapReadiness).toBe('NOT_READY');
    });

    it('returns DEVELOPING when mastery is above 60% but SAP thresholds are not met', () => {
      const result = service.build({
        learnerId: 'sap-2',
        examinationType: 'BECE',
        subjects: [
          { subjectId: 'mathematics', masteryPercent: 70 },
          { subjectId: 'english', masteryPercent: 70 },
        ],
      });

      expect(result.overallMasteryPercent).toBe(70);
      expect(result.sapReadiness).toBe('DEVELOPING');
    });

    it('returns READY at the SAP readiness threshold', () => {
      const result = service.build({
        learnerId: 'sap-3',
        examinationType: 'WASSCE',
        subjects: [
          { subjectId: 'mathematics', masteryPercent: 80 },
          { subjectId: 'english', masteryPercent: 80 },
        ],
      });

      expect(result.overallMasteryPercent).toBe(80);
      expect(result.sapReadiness).toBe('READY');
    });

    it('returns EXAM_READY at the examination readiness threshold', () => {
      const result = service.build({
        learnerId: 'sap-4',
        examinationType: 'WASSCE',
        subjects: [
          { subjectId: 'mathematics', masteryPercent: 90 },
          { subjectId: 'english', masteryPercent: 90 },
          { subjectId: 'physics', masteryPercent: 90 },
          { subjectId: 'chemistry', masteryPercent: 90 },
        ],
      });

      expect(result.overallMasteryPercent).toBe(90);
      expect(result.sapReadiness).toBe('EXAM_READY');
    });

    it('requires sufficient mastered-subject coverage for READY', () => {
      const result = service.build({
        learnerId: 'sap-5',
        examinationType: 'WASSCE',
        subjects: [
          { subjectId: 'mathematics', masteryPercent: 90 },
          { subjectId: 'english', masteryPercent: 70 },
          { subjectId: 'physics', masteryPercent: 70 },
          { subjectId: 'chemistry', masteryPercent: 70 },
        ],
      });

      expect(result.overallMasteryPercent).toBe(75);
      expect(result.sapReadiness).toBe('DEVELOPING');
    });
  });

});
