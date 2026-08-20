import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, In, Repository } from 'typeorm';

import { Curriculum } from './entities/curriculum.entity';
import { ProgrammeCategory } from './enums/programme-category.enum';
import { CertificateExamination } from './enums/certificate-examination.enum';
import { CurriculumSummary } from './interfaces/curriculum-summary.interface';

@Injectable()
export class CurriculumService {
  constructor(
    @InjectRepository(Curriculum)
    private readonly curriculumRepository: Repository<Curriculum>,
  ) {}

  async searchCurriculum(params: {
    programme?: string;
    subject?: string;
    topic?: string;
    lessonTitle?: string;
    message?: string;
    limit?: number;
  }): Promise<Curriculum[]> {
    const limit = Math.min(Math.max(params.limit ?? 10, 1), 50);

    const searchText = params.message?.trim();

    const textConditions = searchText
      ? [
          { subject: ILike(`%${searchText}%`), active: true },
          { topic: ILike(`%${searchText}%`), active: true },
          { lessonTitle: ILike(`%${searchText}%`), active: true },
          { programme: ILike(`%${searchText}%`), active: true },
        ]
      : undefined;

    const where = textConditions
      ? textConditions
      : {
          active: true,
          ...(params.programme
            ? { programme: ILike(`%${params.programme}%`) }
            : {}),
          ...(params.subject
            ? { subject: ILike(`%${params.subject}%`) }
            : {}),
          ...(params.topic
            ? { topic: ILike(`%${params.topic}%`) }
            : {}),
          ...(params.lessonTitle
            ? { lessonTitle: ILike(`%${params.lessonTitle}%`) }
            : {}),
          ...(params.programme || params.subject || params.topic || params.lessonTitle
            ? {}
            : { examination: In([CertificateExamination.WASSCE, CertificateExamination.WAEC_GCE]) }),
        };

    return this.curriculumRepository.find({
      where,
      take: limit,
      order: {
        createdAt: 'ASC',
      },
    });
  }

  async createCurriculum(
    programmeCategory: ProgrammeCategory,
    programme: string,
    subject: string,
    topic: string,
    lessonTitle: string,
    examination?: CertificateExamination,
  ): Promise<CurriculumSummary> {
    const curriculum = this.curriculumRepository.create({
      programmeCategory,
      examination,
      programme,
      subject,
      topic,
      lessonTitle,
      active: true,
    });

    const saved = await this.curriculumRepository.save(curriculum);

    return {
      curriculumId: saved.id,
      programmeCategory: saved.programmeCategory,
      examination: saved.examination,
      programme: saved.programme,
      subject: saved.subject,
      topic: saved.topic,
      lessonTitle: saved.lessonTitle,
      active: saved.active,
    };
  }
}
