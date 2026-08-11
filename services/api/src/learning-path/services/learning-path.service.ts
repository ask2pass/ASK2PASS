
import { Injectable } from '@nestjs/common';
import {
  LearningPath,
  LearningPathSubject,
  LearningPathTopic,
} from '../interfaces/learning-path.interface';
import {
  GenerateLearningPathDto,
  LearningPathSubjectInput,
} from '../dto/generate-learning-path.dto';

@Injectable()
export class LearningPathGeneratorService {
  private readonly version = 1;

  generate(dto: GenerateLearningPathDto): LearningPath {
    if (!dto.subjects.length) {
      throw new Error('At least one subject is required to generate a learning path.');
    }

    const subjects = dto.subjects.map((subject) =>
      this.buildSubject(subject),
    );

    const ordered = [...subjects].sort(
      (a, b) => a.masteryPercent - b.masteryPercent,
    );

    const currentSubject =
      ordered.find((subject) => subject.subjectId === dto.currentSubjectId) ??
      ordered[0];

    const currentTopic =
      currentSubject.topics.find(
        (topic) => topic.priority !== 'MASTERY',
      ) ?? currentSubject.topics[0] ?? null;

    const totalTopics = subjects.reduce(
      (sum, subject) => sum + subject.topics.length,
      0,
    );

    const completedTopics = subjects.reduce(
      (sum, subject) =>
        sum +
        subject.topics.filter((topic) => topic.masteryPercent >= 90).length,
      0,
    );

    const completionPercent =
      totalTopics === 0
        ? 0
        : Number(((completedTopics / totalTopics) * 100).toFixed(2));

    return {
      learnerId: dto.learnerId,
      examinationType: dto.examinationType,
      generatedAt: new Date().toISOString(),
      version: this.version,
      currentSubjectId: currentSubject.subjectId,
      currentTopicId: currentTopic?.topicId ?? null,
      completionPercent,
      nextAction: currentTopic?.recommendedAction ?? 'LEARN',
      subjects,
    };
  }

  private buildSubject(
    subject: LearningPathSubjectInput,
  ): LearningPathSubject {
    const topics = [...subject.topics]
      .sort((a, b) => a.masteryPercent - b.masteryPercent)
      .map((topic, index): LearningPathTopic => {
        if (topic.masteryPercent < 40) {
          return {
            topicId: topic.topicId,
            subjectId: subject.subjectId,
            sequence: index + 1,
            masteryPercent: topic.masteryPercent,
            priority: 'FOUNDATION',
            recommendedAction: 'LEARN',
          };
        }

        if (topic.masteryPercent < 65) {
          return {
            topicId: topic.topicId,
            subjectId: subject.subjectId,
            sequence: index + 1,
            masteryPercent: topic.masteryPercent,
            priority: 'REINFORCEMENT',
            recommendedAction: 'PRACTICE',
          };
        }

        if (topic.masteryPercent < 80) {
          return {
            topicId: topic.topicId,
            subjectId: subject.subjectId,
            sequence: index + 1,
            masteryPercent: topic.masteryPercent,
            priority: 'PROGRESSION',
            recommendedAction: 'DRILL',
          };
        }

        if (topic.masteryPercent < 90) {
          return {
            topicId: topic.topicId,
            subjectId: subject.subjectId,
            sequence: index + 1,
            masteryPercent: topic.masteryPercent,
            priority: 'PROGRESSION',
            recommendedAction: 'ASSESS',
          };
        }

        return {
          topicId: topic.topicId,
          subjectId: subject.subjectId,
          sequence: index + 1,
          masteryPercent: topic.masteryPercent,
          priority: 'MASTERY',
          recommendedAction: 'REVIEW',
        };
      });

    const masteryPercent =
      topics.length === 0
        ? 0
        : Number(
            (
              topics.reduce(
                (sum, topic) => sum + topic.masteryPercent,
                0,
              ) / topics.length
            ).toFixed(2),
          );

    const status =
      masteryPercent < 40
        ? 'STARTING'
        : masteryPercent < 65
          ? 'DEVELOPING'
          : masteryPercent < 90
            ? 'READY_FOR_ASSESSMENT'
            : 'MASTERED';

    return {
      subjectId: subject.subjectId,
      masteryPercent,
      status,
      topics,
    };
  }
}
