import { BadRequestException } from '@nestjs/common';
import { CEDMGenerationService } from './cedm-generation.service';
import { CEDMGenerationMode } from '../enums/cedm-generation-mode.enum';
import { CEDMExaminationType } from '../enums/cedm-examination-type.enum';
import { CEDMAdaptiveMode } from '../enums/cedm-adaptive-mode.enum';
import { CEDMQuestionProvenance } from '../enums/cedm-provenance.enum';

describe('CEDMGenerationService', () => {
  let service: CEDMGenerationService;

  beforeEach(() => {
    service = new CEDMGenerationService();
  });

  const baseRequest = {
    learnerId: 'learner-1',
    examinationType: CEDMExaminationType.JAMB,
    subjectId: 'mathematics',
    topicId: 'algebra',
    questionCount: 5,
    adaptiveMode: CEDMAdaptiveMode.GUIDED,
    difficulty: 'STANDARD' as const,
    licensedBankAvailable: false,
  };

  it('rejects licensed-only mode without a licensed bank', () => {
    expect(() =>
      service.generate({
        ...baseRequest,
        generationMode: CEDMGenerationMode.LICENSED_ONLY,
      }),
    ).toThrow(BadRequestException);
  });

  it('generates simulated questions without a licensed bank', () => {
    const result = service.generate({
      ...baseRequest,
      generationMode: CEDMGenerationMode.SIMULATED_ONLY,
    });

    expect(result.questions).toHaveLength(5);
    expect(result.simulatedQuestionCount).toBe(5);
    expect(result.licensedQuestionCount).toBe(0);
    expect(result.provenance).toBe(CEDMQuestionProvenance.AI_SIMULATED);
    expect(result.sourceIntegrityVerified).toBe(true);
  });

  it('uses licensed questions when licensed-only mode is available', () => {
    const licensed = Array.from({ length: 5 }, (_, index) => ({
      questionId: `licensed-${index}`,
      examinationType: CEDMExaminationType.JAMB,
      subjectId: 'mathematics',
      topicId: 'algebra',
      questionText: `Licensed question ${index}`,
      options: ['A', 'B', 'C', 'D'],
      correctAnswer: 'A',
      explanation: 'Verified explanation',
      difficulty: 'STANDARD' as const,
      provenance: CEDMQuestionProvenance.LICENSED_PAST_QUESTION,
      licensed: true,
      sourceVerified: true,
      generated: false,
      sourceQuestionId: `past-${index}`,
      sourceYear: 2020,
    }));

    const result = service.generate(
      {
        ...baseRequest,
        generationMode: CEDMGenerationMode.LICENSED_ONLY,
        licensedBankAvailable: true,
      },
      licensed,
    );

    expect(result.questions).toHaveLength(5);
    expect(result.licensedQuestionCount).toBe(5);
    expect(result.simulatedQuestionCount).toBe(0);
    expect(result.provenance).toBe(
      CEDMQuestionProvenance.LICENSED_PAST_QUESTION,
    );
  });

  it('falls back from hybrid to simulation when no licensed bank exists', () => {
    const result = service.generate({
      ...baseRequest,
      generationMode: CEDMGenerationMode.HYBRID,
    });

    expect(result.simulatedQuestionCount).toBe(5);
    expect(result.licensedQuestionCount).toBe(0);
  });

  it('combines licensed and simulated questions in hybrid mode', () => {
    const licensed = [{
      questionId: 'licensed-1',
      examinationType: CEDMExaminationType.JAMB,
      subjectId: 'mathematics',
      topicId: 'algebra',
      questionText: 'Licensed question',
      options: ['A', 'B', 'C', 'D'],
      correctAnswer: 'A',
      explanation: 'Verified explanation',
      difficulty: 'STANDARD' as const,
      provenance: CEDMQuestionProvenance.LICENSED_PAST_QUESTION,
      licensed: true,
      sourceVerified: true,
      generated: false,
      sourceQuestionId: 'past-1',
      sourceYear: 2022,
    }];

    const result = service.generate(
      {
        ...baseRequest,
        generationMode: CEDMGenerationMode.HYBRID,
        licensedBankAvailable: true,
      },
      licensed,
    );

    expect(result.questions).toHaveLength(5);
    expect(result.licensedQuestionCount).toBe(1);
    expect(result.simulatedQuestionCount).toBe(4);
    expect(result.provenance).toBe(CEDMQuestionProvenance.HYBRID_DERIVED);
  });
});
