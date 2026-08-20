import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TCCMonthlyExam } from '../entities/tcc-monthly-exam.entity';

@Injectable()
export class TCCMonthlyExamService {
  constructor(
    @InjectRepository(TCCMonthlyExam)
    private readonly repository: Repository<TCCMonthlyExam>,
  ) {}

  async createMonthlyExam(
    academicSession: string,
    monthKey: string,
    subjects: string[],
  ) {
    const existing = await this.repository.findOne({
      where: { academicSession, monthKey },
    });

    if (existing) {
      throw new ConflictException(
        'Monthly exam already exists for this academic session and month',
      );
    }

    const exam = this.repository.create({
      academicSession,
      monthKey,
      status: 'DRAFT',
      publishedAt: null,
      subjects: subjects.map((subject, index) => ({
        sequenceNumber: index + 1,
        subject,
        examDate: null,
      })),
    });

    return this.repository.save(exam);
  }

  async publishMonthlyExam(
    academicSession: string,
    monthKey: string,
    examDates: Record<string, string>,
  ) {
    const exam = await this.repository.findOne({
      where: { academicSession, monthKey },
    });

    if (!exam) {
      throw new NotFoundException('Monthly exam not found');
    }

    if (exam.status === 'PUBLISHED') {
      throw new ConflictException('Monthly exam is already published');
    }

    exam.subjects = exam.subjects.map((item) => ({
      ...item,
      examDate: examDates[item.subject] ?? null,
    }));

    exam.status = 'PUBLISHED';
    exam.publishedAt = new Date();

    return this.repository.save(exam);
  }

  async getMonthlyExam(
    academicSession: string,
    monthKey: string,
  ) {
    return this.repository.findOne({
      where: { academicSession, monthKey },
    });
  }
}
