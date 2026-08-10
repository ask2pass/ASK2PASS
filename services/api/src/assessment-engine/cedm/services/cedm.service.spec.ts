import { BadRequestException } from '@nestjs/common';
import { CEDMService } from './cedm.service';
import { CEDMAdaptiveMode } from '../enums/cedm-adaptive-mode.enum';
import { CEDMExaminationType } from '../enums/cedm-examination-type.enum';
import { CEDMQuestionSourceType } from '../enums/cedm-question-source-type.enum';
import { CEDMSessionStatus } from '../enums/cedm-session-status.enum';

describe('CEDMService', () => {
  let service: CEDMService;

  beforeEach(() => {
    service = new CEDMService();
  });

  const session = () =>
    service.startSession(
      'learner-1',
      CEDMExaminationType.JAMB,
      'subject-1',
      ['t1', 't2', 't3', 't4', 't5'],
      CEDMAdaptiveMode.GUIDED,
      CEDMQuestionSourceType.AI_SIMULATED,
    );

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

  it('validates licensed past questions only from 2018 through 2026', () => {
    expect(
      service.validatePastQuestionYear(2018),
    ).toBe(true);

    expect(
      service.validatePastQuestionYear(2026),
    ).toBe(true);

    expect(
      service.validatePastQuestionYear(2017),
    ).toBe(false);

    expect(
      service.validatePastQuestionYear(2027),
    ).toBe(false);
  });

  it('validates licensed source integrity', () => {
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
  });

  it('rejects an invalid licensed source', () => {
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

  it('keeps exactly 65 percent below mastery', () => {
    expect(service.evaluateMastery(65)).toBe(false);
    expect(service.evaluateMastery(65.01)).toBe(true);
  });

  it('does not permanently trap a learner at 65 percent', () => {
    expect(
      service.canProgressFromTopic(65, CEDMAdaptiveMode.GUIDED),
    ).toBe(true);

    expect(
      service.canProgressFromTopic(65, CEDMAdaptiveMode.REMEDIATION),
    ).toBe(true);

    expect(
      service.canProgressFromTopic(65, CEDMAdaptiveMode.PROGRESSIVE),
    ).toBe(false);
  });

  it('provides three distinct adaptive actions', () => {
    expect(
      service.getNextAdaptiveAction(60, CEDMAdaptiveMode.GUIDED),
    ).toBe('GUIDED_RETRY_WITH_TARGETED_PRACTICE');

    expect(
      service.getNextAdaptiveAction(60, CEDMAdaptiveMode.REMEDIATION),
    ).toBe('REMEDIATION_WITH_WEAK_AREA_RETEACHING');

    expect(
      service.getNextAdaptiveAction(60, CEDMAdaptiveMode.PROGRESSIVE),
    ).toBe('PROGRESSIVE_REASSESSMENT');
  });

  it('allows progression above 65 percent', () => {
    expect(
      service.canProgressFromTopic(70, CEDMAdaptiveMode.PROGRESSIVE),
    ).toBe(true);

    expect(
      service.getNextAdaptiveAction(70, CEDMAdaptiveMode.PROGRESSIVE),
    ).toBe('PROGRESS_TO_NEXT_TOPIC');
  });

  it('supports CEDM pause and resume continuity', () => {
    const active = session();

    const paused = service.pauseSession(active);
    expect(paused.status).toBe(CEDMSessionStatus.PAUSED);
    expect(service.isCEDMContinuationRequired(paused)).toBe(true);

    const resumed = service.resumeSession(paused);
    expect(resumed.status).toBe(CEDMSessionStatus.ACTIVE);
    expect(resumed.sessionId).toBe(active.sessionId);
    expect(resumed.currentTopicIndex).toBe(active.currentTopicIndex);
  });

  it('does not allow completed sessions to resume', () => {
    const completed = service.completeSession(session());

    expect(() => service.resumeSession(completed)).toThrow(
      BadRequestException,
    );
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
