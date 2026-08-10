import { LearningProgressService } from './learning-progress.service';

describe('LearningProgressService', () => {
  const repository = {
    findByLearnerTopic: jest.fn(),
    findByLearner: jest.fn(),
    save: jest.fn(),
  };

  const pathService = {
    generate: jest.fn(),
  };

  const directiveService = {
    create: jest.fn(),
  };

  let service: LearningProgressService;

  beforeEach(() => {
    jest.clearAllMocks();

    service = new LearningProgressService(
      repository as any,
      pathService as any,
      directiveService as any,
    );
  });

  it('creates and persists first-time learner mastery', async () => {
    repository.findByLearnerTopic.mockResolvedValue(null);

    repository.save.mockImplementation(async (entity: any) => ({
      ...entity,
      updatedAt: new Date(),
    }));

    const result = await service.recordResult({
      learnerId: 'learner-1',
      examinationType: 'WASSCE',
      subjectId: 'mathematics',
      topicId: 'algebra',
      correct: true,
      masteryDelta: 20,
    });

    expect(result.masteryPercent).toBe(20);
    expect(result.previousMasteryPercent).toBe(0);
    expect(result.attempts).toBe(1);
    expect(result.correctAttempts).toBe(1);
    expect(result.recommendedAction).toBe('LEARN');
    expect(repository.save).toHaveBeenCalled();
  });

  it('advances mastery and changes recommended action at progression thresholds', async () => {
    repository.findByLearnerTopic.mockResolvedValue({
      learnerId: 'learner-1',
      examinationType: 'WASSCE',
      subjectId: 'mathematics',
      topicId: 'algebra',
      masteryPercent: 55,
      attempts: 3,
      correctAttempts: 2,
      completed: false,
      recommendedAction: 'PRACTICE',
    });

    repository.save.mockImplementation(async (entity: any) => ({
      ...entity,
      updatedAt: new Date(),
    }));

    const result = await service.recordResult({
      learnerId: 'learner-1',
      examinationType: 'WASSCE',
      subjectId: 'mathematics',
      topicId: 'algebra',
      correct: true,
      masteryDelta: 15,
    });

    expect(result.previousMasteryPercent).toBe(55);
    expect(result.masteryPercent).toBe(70);
    expect(result.recommendedAction).toBe('DRILL');
    expect(result.attempts).toBe(4);
    expect(result.correctAttempts).toBe(3);
  });

  it('caps mastery at 100 and marks a topic mastered at 90', async () => {
    repository.findByLearnerTopic.mockResolvedValue({
      learnerId: 'learner-1',
      examinationType: 'NECO',
      subjectId: 'science',
      topicId: 'biology',
      masteryPercent: 95,
      attempts: 10,
      correctAttempts: 10,
      completed: true,
      recommendedAction: 'REVIEW',
    });

    repository.save.mockImplementation(async (entity: any) => ({
      ...entity,
      updatedAt: new Date(),
    }));

    const result = await service.recordResult({
      learnerId: 'learner-1',
      examinationType: 'NECO',
      subjectId: 'science',
      topicId: 'biology',
      correct: true,
      masteryDelta: 20,
    });

    expect(result.masteryPercent).toBe(100);
    expect(result.completed).toBe(true);
    expect(result.recommendedAction).toBe('REVIEW');
  });

  it('reduces mastery after an incorrect result without going below zero', async () => {
    repository.findByLearnerTopic.mockResolvedValue({
      learnerId: 'learner-1',
      examinationType: 'BECE',
      subjectId: 'english',
      topicId: 'grammar',
      masteryPercent: 5,
      attempts: 1,
      correctAttempts: 1,
      completed: false,
      recommendedAction: 'LEARN',
    });

    repository.save.mockImplementation(async (entity: any) => ({
      ...entity,
      updatedAt: new Date(),
    }));

    const result = await service.recordResult({
      learnerId: 'learner-1',
      examinationType: 'BECE',
      subjectId: 'english',
      topicId: 'grammar',
      correct: false,
      masteryDelta: 20,
    });

    expect(result.masteryPercent).toBe(0);
    expect(result.completed).toBe(false);
  });

  it('feeds learner progress into the Sprint-26 learning-path engine and runtime directive', () => {
    const path = {
      learnerId: 'learner-1',
      examinationType: 'WASSCE',
      generatedAt: new Date().toISOString(),
      version: 1,
      currentSubjectId: 'mathematics',
      currentTopicId: 'algebra',
      completionPercent: 20,
      nextAction: 'LEARN',
      subjects: [],
    };

    pathService.generate.mockReturnValue(path);

    directiveService.create.mockReturnValue({
      learnerId: 'learner-1',
      examinationType: 'WASSCE',
      subjectId: 'mathematics',
      topicId: 'algebra',
      action: 'LEARN',
      pathVersion: 1,
      generatedAt: new Date().toISOString(),
    });

    const result = service.buildRuntimeDirective(
      'learner-1',
      'WASSCE',
      [
        {
          subjectId: 'mathematics',
          topics: [
            {
              topicId: 'algebra',
              masteryPercent: 20,
            },
          ],
        },
      ],
    );

    expect(pathService.generate).toHaveBeenCalled();
    expect(directiveService.create).toHaveBeenCalledWith({
      learningPath: path,
    });
    expect(result.action).toBe('LEARN');
  });
});
