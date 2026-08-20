import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TCCMonthlyExamService } from '../services/tcc-monthly-exam.service';

@Controller('curriculum-control/tcc/monthly-exam')
export class TCCMonthlyExamController {
  constructor(
    private readonly service: TCCMonthlyExamService,
  ) {}

  @Post()
  create(@Body() body: {
    academicSession: string;
    monthKey: string;
    subjects: string[];
  }) {
    return this.service.createMonthlyExam(
      body.academicSession,
      body.monthKey,
      body.subjects,
    );
  }

  @Post('publish')
  publish(@Body() body: {
    academicSession: string;
    monthKey: string;
    examDates: Record<string, string>;
  }) {
    return this.service.publishMonthlyExam(
      body.academicSession,
      body.monthKey,
      body.examDates,
    );
  }

  @Get(':academicSession/:monthKey')
  get(
    @Param('academicSession') academicSession: string,
    @Param('monthKey') monthKey: string,
  ) {
    return this.service.getMonthlyExam(academicSession, monthKey);
  }
}
