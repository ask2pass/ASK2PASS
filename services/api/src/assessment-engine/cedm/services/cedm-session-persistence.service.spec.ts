import { CEDMService } from './cedm.service';
import { CEDMExaminationType } from '../enums/cedm-examination-type.enum';
import { CEDMAdaptiveMode } from '../enums/cedm-adaptive-mode.enum';
import { CEDMQuestionSourceType } from '../enums/cedm-question-source-type.enum';

describe('CEDM session persistence integration contract', () => {
  it('persists a production CEDM session through the persistence boundary', async () => {
    const persistence = {
      saveSession: jest.fn().mockResolvedValue({
        id: 'session-1',
      }),
      findSession: jest.fn(),
    } as any;

    const service = new CEDMService(persistence);

    const session = service.startSession(
      'learner-1',
      CEDMExaminationType.WASSCE,
      'subject-1',
      ['topic-1', 'topic-2', 'topic-3', 'topic-4', 'topic-5'],
      CEDMAdaptiveMode.ADAPTIVE,
      CEDMQuestionSourceType.LICENSED,
    );

    expect(session.sessionId).toBeDefined();
    await service.persistSession(session);
    expect(persistence.saveSession).toHaveBeenCalledWith(
      expect.objectContaining({
        id: session.sessionId,
        learnerId: 'learner-1',
        subjectId: 'subject-1',
        examinationType: CEDMExaminationType.WASSCE,
      }),
    );
  });
});
