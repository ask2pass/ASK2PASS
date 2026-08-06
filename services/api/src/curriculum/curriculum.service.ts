import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
