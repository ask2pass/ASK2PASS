import { BadRequestException, Injectable } from '@nestjs/common';
import { SCHEDULING_CONSTANTS } from '../constants/scheduling.constants';
import {
  ScheduledActivity,
  WorkloadSchedule,
  WorkloadScheduleRequest,
} from '../interfaces/workload-schedule.interface';

@Injectable()
export class WorkloadSchedulingService {
  generate(
    request: WorkloadScheduleRequest,
  ): WorkloadSchedule {
    if (
      request.subjects.length >
      SCHEDULING_CONSTANTS.MAX_SUBJECTS_PER_TERM
    ) {
      throw new BadRequestException(
        `A class level cannot have more than ${SCHEDULING_CONSTANTS.MAX_SUBJECTS_PER_TERM} subjects per term.`,
      );
    }

    const days = Array.from(
      { length: SCHEDULING_CONSTANTS.DAYS_PER_WEEK },
      (_, index) => ({
        day: index + 1,
        activities: [] as ScheduledActivity[],
      }),
    );

    /*
     * Examination scheduling is intentionally handled before
     * normal lesson distribution.
     *
     * The examination week remains a continuous 7-day period.
     * If examinations finish before the week ends, normal learning
     * resumes for the remaining days.
     */
    if (
      request.examinationWeek &&
      request.examinationSubjects?.length
    ) {
      if (
        request.examinationSubjects.length >
        SCHEDULING_CONSTANTS.MAX_SUBJECTS_PER_TERM
      ) {
        throw new BadRequestException(
          `A class level cannot have more than ${SCHEDULING_CONSTANTS.MAX_SUBJECTS_PER_TERM} examination subjects.`,
        );
      }

      let examIndex = 0;

      for (
        let day = 0;
        day < SCHEDULING_CONSTANTS.DAYS_PER_WEEK;
        day++
      ) {
        for (
          let slot = 0;
          slot < SCHEDULING_CONSTANTS.EXAM_SUBJECTS_PER_DAY;
          slot++
        ) {
          if (
            examIndex >= request.examinationSubjects.length
          ) {
            break;
          }

          days[day].activities.push({
            subject: request.examinationSubjects[examIndex],
            activityType: 'EXAMINATION',
            day: day + 1,
            sequence: slot + 1,
          });

          examIndex++;
        }

        /*
         * Once all examinations are completed, the remaining
         * days are deliberately left available for normal
         * scheduling. This prevents artificial vacation time.
         */
        if (
          examIndex >= request.examinationSubjects.length
        ) {
          break;
        }
      }
    }

    return {
      classLevel: request.classLevel,
      term: request.term,
      academicSession: request.academicSession,
      days,
    };
  }
}
