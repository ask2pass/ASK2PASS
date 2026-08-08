import { LearningSessionAcademicPowerService } from '../learning-session-academic-power.service';
import {
  AatAcademicPowerDimension,
  AatAcademicPowerOutcome,
  AatPtdmMode,
} from '../../dto/aat-academic-power-assessment.dto';

describe('Universal AAT Academic Power Engine', () => {
  let service: LearningSessionAcademicPowerService;

  beforeEach(() => {
    service = new LearningSessionAcademicPowerService();
  });

  const makeAssessment = () => ({
    learnerId: 'learner-1',
    sessionId: 'session-1',
    subject: 'Mathematics',
    module: 'JSS2 Algebra',
    lessonContext: 'Linear equations',
    questions: Array.from({ length: 15 }, (_, index) => ({
      questionNumber: index + 1,
      dimension:
        index % 3 === 0
          ? AatAcademicPowerDimension.CONCEPT
          : index % 3 === 1
            ? AatAcademicPowerDimension.PURPOSE
            : AatAcademicPowerDimension.APPLICATION,
      question: `Question ${index + 1}`,
      options: ['A', 'B', 'C', 'D'],
      correctAnswer: 'A',
      conceptTarget: 'Linear equations',
      purposeTarget: 'Why linear equations matter',
      applicationTarget: 'Applying linear equations',
    })),
  });

  it('defines exactly 15 lesson-anchored questions', () => {
    const result = service.getUniversalAssessmentContract(
      'learner-1',
      'session-1',
      'Mathematics',
      'JSS2 Algebra',
      'Linear equations',
    );

    expect(result.questionCount).toBe(15);
    expect(result.purpose).toBe('ACADEMIC_POWER_BUILDING');
    expect(result.lessonAnchored).toBe(true);
  });

  it('requires concept, purpose and application dimensions', () => {
    const result = service.getUniversalAssessmentContract(
      'learner-1',
      'session-1',
      'Mathematics',
      'JSS2 Algebra',
      'Linear equations',
    );

    expect(result.dimensions.map((x) => x.dimension)).toEqual([
      'CONCEPT',
      'PURPOSE',
      'APPLICATION',
    ]);
  });

  it('rejects a CBT that is not exactly 15 questions', () => {
    const assessment = makeAssessment();
    assessment.questions = assessment.questions.slice(0, 14);

    expect(() => service.validateAssessment(assessment as any))
      .toThrow('exactly 15 questions');
  });

  it('rejects CBT without lesson context', () => {
    expect(() =>
      service.getUniversalAssessmentContract(
        'learner-1',
        'session-1',
        'Mathematics',
        'JSS2 Algebra',
        '',
      ),
    ).toThrow('anchored to the lesson');
  });

  it('produces a mastery result when all academic dimensions are strong', () => {
    const assessment = makeAssessment();

    const answers = assessment.questions.map((q) => ({
      questionNumber: q.questionNumber,
      answer: 'A',
    }));

    const result = service.assess(
      assessment as any,
      answers,
    );

    expect(result.totalQuestions).toBe(15);
    expect(result.correctAnswers).toBe(15);
    expect(result.scorePercentage).toBe(100);
    expect(result.outcome).toBe(AatAcademicPowerOutcome.MASTERED);
    expect(result.ptdmContinuation.eligible).toBe(true);
    expect(result.ptdmContinuation.mode).toBe(AatPtdmMode.EXTENSION);
  });

  it('routes weak learning results into PTDM mastery', () => {
    const assessment = makeAssessment();

    const answers = assessment.questions.map((q) => ({
      questionNumber: q.questionNumber,
      answer: 'B',
    }));

    const result = service.assess(
      assessment as any,
      answers,
    );

    expect(result.outcome).toBe(
      AatAcademicPowerOutcome.NEEDS_REMEDIATION,
    );

    expect(result.ptdmContinuation.eligible).toBe(true);
    expect(result.ptdmContinuation.mode).toBe(AatPtdmMode.MASTERY);
    expect(result.ptdmContinuation.source).toBe('LESSON_CBT');
    expect(result.ptdmContinuation.preserveLessonContext).toBe(true);
  });

  it('makes PTDM unrestricted by subject, topic and lesson time', () => {
    const result = service.getPtdmMasteryContract(
      'learner-1',
      'Mathematics',
      'Linear equations',
      'Linear equations',
    );

    expect(result.scope.subjectRestricted).toBe(false);
    expect(result.scope.topicRestricted).toBe(false);
    expect(result.scope.lessonTimeRestricted).toBe(false);
    expect(result.scope.sessionDurationRestricted).toBe(false);
    expect(result.learnerDirection).toBe(true);
    expect(result.continuity.continueFromLesson).toBe(true);
  });

  it('keeps PTDM behaviour universal rather than AAT-specific', () => {
    const result = service.getPtdmMasteryContract('learner-1');

    expect(result.universalAatBehaviour).toBe(true);
    expect(result.capabilities).toEqual(
      expect.arrayContaining([
        'teach',
        'explain',
        'drill',
        'practice',
        'diagnose',
        'master',
      ]),
    );
  });
});
