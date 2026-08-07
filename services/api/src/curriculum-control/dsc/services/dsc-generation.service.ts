import { Injectable } from '@nestjs/common';
import { DSC_CONSTANTS } from '../constants/dsc.constants';
import {
  DSCGenerationRequest,
  GeneratedDailySubjectChart,
} from '../interfaces/dsc-generation.interface';

@Injectable()
export class DSCGenerationService {

generate(
 request: DSCGenerationRequest,
): GeneratedDailySubjectChart {

 const days:any[]=[];

 for(let day=1; day<=DSC_CONSTANTS.DAYS_PER_WEEK; day++){

   days.push({
    day,
    subjects: request.subjects
    .slice(0,DSC_CONSTANTS.DAILY_SUBJECTS)
    .map(subject=>({
      subject,
      topic:
      `TCC mapped topic - ${subject}`,
      lessonMinutes:
      DSC_CONSTANTS.LESSON_MINUTES,
      revisionMinutes:
      DSC_CONSTANTS.REVISION_MINUTES,
      cbtMinutes:
      DSC_CONSTANTS.CBT_MINUTES,
    }))
   });

 }

 return {
  classLevel:request.classLevel,
  term:request.term,
  academicSession:request.academicSession,
  days,
 };

}

}
