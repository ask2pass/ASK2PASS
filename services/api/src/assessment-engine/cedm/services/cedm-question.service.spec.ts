import { BadRequestException } from '@nestjs/common';
import { CEDMQuestionService } from './cedm-question.service';
import { CEDMExaminationType } from '../enums/cedm-examination-type.enum';

describe('CEDMQuestionService', () => {
  let service: CEDMQuestionService;

  beforeEach(() => {
    service = new CEDMQuestionService();
  });

  it('generates a valid AI-simulated question', () => {
    const question = service.generateSimulationQuestion(
      CEDMExaminationType.JAMB,
      'mathematics',
      'algebra',
      'Solve 2x + 4 = 10.',
      ['2', '3', '4', '5'],
      '3',
      'Subtract 4 and divide by 2.',
    );

    expect(question.generated).toBe(true);
    expect(question.licensed).toBe(false);
  });

  it('rejects an invalid correct answer', () => {
    expect(() =>
      service.generateSimulationQuestion(
        CEDMExaminationType.JAMB,
        'mathematics',
        'algebra',
        'Question',
        ['A', 'B'],
        'C',
        'Explanation',
      ),
    ).toThrow(BadRequestException);
  });

  it('marks answers and returns explanations', () => {
    const question = service.generateSimulationQuestion(
      CEDMExaminationType.JAMB,
      'mathematics',
      'algebra',
      'Question',
      ['A', 'B'],
      'B',
      'Because B is correct.',
    );

    const result = service.answerQuestion(question.questionId, 'A');

    expect(result.correct).toBe(false);
    expect(result.scorePercent).toBe(0);
    expect(result.explanation).toContain('Because B is correct.');
  });

  it('rejects unverified licensed questions', () => {
    expect(() =>
      service.registerLicensedQuestion({
        questionId: 'q1',
        examinationType: CEDMExaminationType.WASSCE,
        subjectId: 'english',
        topicId: 'grammar',
        year: 2017,
        questionType: 'OBJECTIVE' as any,
        questionText: 'Question',
        options: ['A', 'B'],
        correctAnswer: 'A',
        explanation: 'Explanation',
        sourceType: 'LICENSED_PAST_QUESTION' as any,
        licensed: true,
        sourceVerified: true,
        generated: false,
      }),
    ).toThrow(BadRequestException);
  });
});
