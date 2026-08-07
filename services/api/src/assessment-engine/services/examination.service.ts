import { Injectable } from '@nestjs/common';
import { EXAM_CONSTANTS } from '../constants/exam.constants';

@Injectable()
export class ExaminationService {

getExamPolicy(){

return {

dailySubjects:
EXAM_CONSTANTS.DAILY_SUBJECTS,

durationMinutes:
EXAM_CONSTANTS.MAX_EXAM_DURATION_MINUTES,

cbt:{
questions:
EXAM_CONSTANTS.CBT_QUESTIONS,
marks:
EXAM_CONSTANTS.CBT_MARKS,
},

essay:{
provided:
EXAM_CONSTANTS.ESSAY_QUESTIONS_PROVIDED,

answered:
EXAM_CONSTANTS.ESSAY_QUESTIONS_REQUIRED,

marks:
EXAM_CONSTANTS.ESSAY_MARKS,
},

homeworkMarks:
EXAM_CONSTANTS.HOMEWORK_MARKS,

antiCheat:{
enabled:
EXAM_CONSTANTS.ANTI_CHEAT_ENABLED,

questionRandomization:
EXAM_CONSTANTS.RANDOMIZE_QUESTIONS,

pauseAllowed:
EXAM_CONSTANTS.PAUSE_ALLOWED,

exitAllowed:
EXAM_CONSTANTS.EXIT_ALLOWED,

replayAllowed:
EXAM_CONSTANTS.REPLAY_ALLOWED,

autoSubmit:
EXAM_CONSTANTS.AUTO_SUBMIT_ON_TIMEOUT,
},

};

}


calculateTermGrade(
examScores:number[],
assignment:number,
){

const examAverage =
examScores.reduce(
(total,score)=>total+score,
0,
)
/ examScores.length;


return {

examAverage,

assignmentScore:
assignment,

finalPercentage:
(examAverage + assignment) / 2,

};

}

}
