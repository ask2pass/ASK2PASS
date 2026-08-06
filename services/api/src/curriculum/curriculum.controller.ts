import { Controller, Get, Param, Post } from '@nestjs/common';

@Controller('curriculum')
export class CurriculumController {
  @Post()
  async createCurriculum() {
    return {
      message: 'Curriculum creation endpoint scaffolded',
    };
  }

  @Get(':programme')
  async getProgramme(
    @Param('programme') programme: string,
  ) {
    return {
      programme,
      categories: [
        'PRIMARY',
        'JUNIOR_SECONDARY',
        'SENIOR_SECONDARY',
        'CERTIFICATE_EXAMINATION',
        'ADULT_EDUCATION',
        'SAP',
        'BUSINESS_MODELLING',
      ],
      certificateExaminations: [
        'BECE',
        'WASSCE',
        'NECO',
        'NABTEB',
        'WAEC_GCE',
        'NECO_GCE',
        'A_LEVEL',
        'JAMB',
        'POST_UTME',
      ],
    };
  }
}
