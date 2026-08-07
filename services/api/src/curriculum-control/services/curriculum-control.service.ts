import { Injectable } from '@nestjs/common';
import { CURRICULUM_CONSTANTS } from '../constants/curriculum.constants';

@Injectable()
export class CurriculumControlService {

  getLessonPolicy() {
    return {
      lessonMinutes:
        CURRICULUM_CONSTANTS.LESSON_DURATION_MINUTES,

      revisionMinutes:
        CURRICULUM_CONSTANTS.REVISION_DURATION_MINUTES,

      cbtMinutes:
        CURRICULUM_CONSTANTS.CBT_DURATION_MINUTES,

      totalMinutes:
        CURRICULUM_CONSTANTS.TOTAL_SUBJECT_SESSION_MINUTES,

      fastForwardAllowed:
        CURRICULUM_CONSTANTS.FAST_FORWARD_ALLOWED,

      pauseAllowed:
        CURRICULUM_CONSTANTS.PAUSE_ALLOWED,

      replayAllowed:
        CURRICULUM_CONSTANTS.REPLAY_ALLOWED_SCHOOL_LESSON,
    };
  }


  exitLesson() {
    return {
      loggedOut: true,
      starsEarned: false,
      reason:
        'Lesson exit causes session logout and star forfeiture.',
    };
  }


  getExamPolicy() {
    return {
      dailySubjects:
        CURRICULUM_CONSTANTS.DAILY_EXAM_SUBJECT_COUNT,

      cbt: {
        questions:
          CURRICULUM_CONSTANTS.CBT_EXAM_QUESTIONS,
        marks:
          CURRICULUM_CONSTANTS.CBT_EXAM_MARKS,
      },

      essay: {
        provided:
          CURRICULUM_CONSTANTS.ESSAY_QUESTIONS_SET,
        answered:
          CURRICULUM_CONSTANTS.ESSAY_QUESTIONS_TO_ANSWER,
        marks:
          CURRICULUM_CONSTANTS.ESSAY_MARKS,
      },

      homeworkMarks:
        CURRICULUM_CONSTANTS.HOMEWORK_MARKS,
    };
  }
}
