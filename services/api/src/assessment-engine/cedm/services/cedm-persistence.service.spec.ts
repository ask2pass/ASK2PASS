import { CEDMQuestionService } from './cedm-question.service';
import { CEDMQuestionType } from '../enums/cedm-question-type.enum';
import { CEDMExaminationType } from '../enums/cedm-examination-type.enum';
import { CEDMQuestionSourceType } from '../enums/cedm-question-source-type.enum';

describe('CEDM persistence integration contract', () => {
  it('keeps the explicit persistence boundary available for production storage', async () => {
    const persistence = {
      saveQuestion: jest.fn().mockResolvedValue({
        id: 'q-1',
      }),
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

    expect(result?.id).toBe('q-1');
    expect(persistence.saveQuestion).toHaveBeenCalledWith(
      expect.objectContaining({
        id: question.questionId,
        subjectId: 'subject-1',
        topicId: 'topic-1',
        sourceType: CEDMQuestionSourceType.AI_SIMULATED,
        generated: true,
      }),
    );
  });
});
