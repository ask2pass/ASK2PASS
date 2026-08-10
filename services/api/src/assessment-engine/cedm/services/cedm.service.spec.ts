import { BadRequestException } from '@nestjs/common';
import { CEDMService } from './cedm.service';
import { CEDMAdaptiveMode } from '../enums/cedm-adaptive-mode.enum';
import { CEDMExaminationType } from '../enums/cedm-examination-type.enum';
import { CEDMQuestionSourceType } from '../enums/cedm-question-source-type.enum';

describe('CEDMService', () => {
  let service: CEDMService;

  beforeEach(() => {
    service = new CEDMService();
  });

  it('requires at least five topics', () => {
    expect(() =>
      service.startSession(
        'learner-1',
        CEDMExaminationType.JAMB,
        'subject-1',
        ['t1', 't2', 't3', 't4'],
        CEDMAdaptiveMode.GUIDED,
        CEDMQuestionSourceType.AI_SIMULATED,
      ),
    ).toThrow(BadRequestException);
  });

  it('supports AI simulation when no licensed bank exists', () => {
    const result = service.startSession(
      'learner-1',
      CEDMExaminationType.JAMB,
      'subject-1',
      ['t1', 't2', 't3', 't4', 't5'],
      CEDMAdaptiveMode.GUIDED,
      CEDMQuestionSourceType.LICENSED_PAST_QUESTION,
      false,
    );

    expect(result.questionSourceType).toBe(
      CEDMQuestionSourceType.AI_SIMULATED,
    );
  });

  it('supports licensed past-question delivery', () => {
    const result = service.startSession(
      'learner-1',
      CEDMExaminationType.WASSCE,
      'subject-1',
      ['t1', 't2', 't3', 't4', 't5'],
      CEDMAdaptiveMode.REMEDIATION,
      CEDMQuestionSourceType.LICENSED_PAST_QUESTION,
      true,
    );

    expect(result.questionSourceType).toBe(
      CEDMQuestionSourceType.LICENSED_PAST_QUESTION,
    );
  });

  it('supports hybrid delivery when licensed questions exist', () => {
    const result = service.startSession(
      'learner-1',
      CEDMExaminationType.NECO,
      'subject-1',
      ['t1', 't2', 't3', 't4', 't5'],
      CEDMAdaptiveMode.PROGRESSIVE,
      CEDMQuestionSourceType.HYBRID,
      true,
    );

    expect(result.questionSourceType).toBe(CEDMQuestionSourceType.HYBRID);
  });

  it('validates licensed past questions only for 2018 through 2026', () => {
    expect(
      service.validateQuestionSource({
        questionId: 'q1',
        examinationType: CEDMExaminationType.WASSCE,
        subjectId: 'subject-1',
        topicId: 'topic-1',
        examinationYear: 2018,
        sourceType: CEDMQuestionSourceType.LICENSED_PAST_QUESTION,
        licensed: true,
        sourceVerified: true,
        generated: false,
      }),
    ).toBe(true);

    expect(
      service.validateQuestionSource({
        questionId: 'q2',
        examinationType: CEDMExaminationType.WASSCE,
        subjectId: 'subject-1',
        topicId: 'topic-1',
        examinationYear: 2017,
        sourceType: CEDMQuestionSourceType.LICENSED_PAST_QUESTION,
        licensed: true,
        sourceVerified: true,
        generated: false,
      }),
    ).toBe(false);
  });

  it('validates original AI simulation as generated and non-licensed', () => {
    expect(
      service.validateQuestionSource({
        questionId: 'sim-1',
        examinationType: CEDMExaminationType.JAMB,
        subjectId: 'subject-1',
        topicId: 'topic-1',
        sourceType: CEDMQuestionSourceType.AI_SIMULATED,
        licensed: false,
        sourceVerified: true,
        generated: true,
      }),
    ).toBe(true);
  });

  it('keeps the 65 percent boundary as non-mastery', () => {
    expect(service.evaluateMastery(65)).toBe(false);
    expect(service.evaluateMastery(65.01)).toBe(true);
  });

  it('supports adaptive intervention at the boundary', () => {
    expect(
      service.shouldAdapt(65, CEDMAdaptiveMode.REMEDIATION),
    ).toBe(true);
  });

  it('creates an examination-standard simulation profile', () => {
    const profile = service.buildSimulationProfile(
      CEDMExaminationType.JAMB,
      'mathematics',
      'algebra',
      'Solve linear equations',
      'STANDARD',
      20,
    );

    expect(profile.examinationStandard).toContain('JAMB');
    expect(profile.questionCount).toBe(20);
  });
});
