import { Injectable } from '@nestjs/common';

import { CurriculumService } from '../../curriculum/curriculum.service';
import {
  CentralAIKnowledgeItem,
  CentralAIRequest,
} from '../interfaces/central-ai.types';

@Injectable()
export class WAECKnowledgeService {
  readonly source = 'ASK2PASS-WAEC-CURRICULUM';

  constructor(
    private readonly curriculumService: CurriculumService,
  ) {}

  async search(
    request: CentralAIRequest,
  ): Promise<CentralAIKnowledgeItem[]> {
    const records = await this.curriculumService.searchCurriculum({
      subject: request.subject,
      topic: request.topic,
      message: request.message,
      limit: 10,
    });

    return records.map((record) => ({
      id: record.id,
      source: this.source,
      authority: 'AUTHORITATIVE' as const,
      title: record.lessonTitle,
      content: [
        `Programme: ${record.programme}`,
        `Subject: ${record.subject}`,
        `Topic: ${record.topic}`,
        `Lesson: ${record.lessonTitle}`,
        record.examination
          ? `Examination: ${record.examination}`
          : undefined,
      ]
        .filter(Boolean)
        .join('\n'),
      relevance: this.calculateRelevance(request, record),
    }));
  }

  private calculateRelevance(
    request: CentralAIRequest,
    record: {
      subject: string;
      topic: string;
      lessonTitle: string;
      programme: string;
    },
  ): number {
    let score = 0;

    const subject = request.subject?.toLowerCase();
    const topic = request.topic?.toLowerCase();
    const message = request.message.toLowerCase();

    if (subject && record.subject.toLowerCase().includes(subject)) {
      score += 0.35;
    }

    if (topic && record.topic.toLowerCase().includes(topic)) {
      score += 0.35;
    }

    if (
      message.includes(record.topic.toLowerCase()) ||
      message.includes(record.lessonTitle.toLowerCase())
    ) {
      score += 0.2;
    }

    if (message.includes(record.subject.toLowerCase())) {
      score += 0.1;
    }

    return Math.min(Number(score.toFixed(3)), 1);
  }
}
