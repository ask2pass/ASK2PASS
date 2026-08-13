import { CEDMQuestionService } from './cedm-question.service';
import { CEDMService } from './cedm.service';
import { CEDMExaminationType } from '../enums/cedm-examination-type.enum';

describe('CEDM production persistence boundary', () => {
  it('persists a generated question through the production boundary', async () => {
    const persistence = {
      saveQuestion: jest.fn().mockResolvedValue({ id: 'q-production' }),
      findQuestion: jest.fn(),
    } as any;

    const service = new CEDMQuestionService(persistence);

    const question = service.generateSimulationQuestion(
      CEDMExaminationType.WASSCE,
      'subject-1',
      'topic-1',
      'objective',
      ['A', 'B'],
      'A',
      'Explanation',
    );

    const result = await service.persistQuestion(question);

    expect(result?.id).toBe('q-production');
    expect(persistence.saveQuestion).toHaveBeenCalledWith(
      expect.objectContaining({
        id: question.questionId,
        examinationType: CEDMExaminationType.WASSCE,
        subjectId: 'subject-1',
        topicId: 'topic-1',
        generated: true,
      }),
    );
  });

  it('persists and reconstructs a CEDM session through the production boundary', async () => {
    const persistence = {
      saveSession: jest.fn().mockResolvedValue({ id: 'session-production' }),
      findSession: jest.fn().mockResolvedValue({
        id: 'session-production',
        learnerId: 'learner-1',
        examinationType: CEDMExaminationType.WASSCE,
        subjectId: 'subject-1',
        topicIds: ['t1', 't2', 't3', 't4', 't5'],
        adaptiveMode: 'ADAPTIVE',
        questionSourceType: 'AI_SIMULATED',
        status: 'ACTIVE',
        currentTopicIndex: 0,
        scorePercent: 0,
        masteryThresholdPercent: 65,
        continuationRequired: true,
      }),
    } as any;

    const service = new CEDMService(persistence);

    const session = service.startSession(
      'learner-1',
      CEDMExaminationType.WASSCE,
      'subject-1',
      ['t1', 't2', 't3', 't4', 't5'],
      'GUIDED' as any,
      'AI_SIMULATED' as any,
    );

    await service.persistSession(session);

    expect(persistence.saveSession).toHaveBeenCalledWith(
      expect.objectContaining({
        id: session.sessionId,
        learnerId: 'learner-1',
        examinationType: CEDMExaminationType.WASSCE,
        subjectId: 'subject-1',
      }),
    );

    const restored = await service.loadPersistedSession('session-production');

    expect(restored?.sessionId).toBe('session-production');
    expect(restored?.learnerId).toBe('learner-1');
    expect(restored?.topicIds).toHaveLength(5);
  });
});
