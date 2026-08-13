import { Injectable } from '@nestjs/common';
import { ClassroomControl } from './classroom-control.enum';
import { ClassroomControlContext } from './classroom-control-context.interface';

@Injectable()
export class ClassroomControlService {

  play(context: Partial<ClassroomControlContext>): ClassroomControlContext {
    return {
      control: ClassroomControl.PLAY,
      sessionId: context.sessionId ?? null,
      learningPath: context.learningPath ?? 'LEARNING_PATH',
      questionModeActive: false,
      paused: false,
      playable: true,
      questionRouting: 'NONE',
    };
  }

  pause(context: Partial<ClassroomControlContext>): ClassroomControlContext {
    return {
      control: ClassroomControl.PAUSE,
      sessionId: context.sessionId ?? null,
      learningPath: context.learningPath ?? 'LEARNING_PATH',
      questionModeActive: false,
      paused: true,
      playable: true,
      questionRouting: 'NONE',
    };
  }

  question(
    context: Partial<ClassroomControlContext>,
    question: string,
  ): ClassroomControlContext {
    const normalized = question.trim();

    return {
      control: ClassroomControl.QUESTION,
      sessionId: context.sessionId ?? null,
      learningPath: context.learningPath ?? 'LEARNING_PATH',
      questionModeActive: true,
      paused: true,
      playable: true,
      questionRouting: normalized.length > 0 ? 'PTDM' : 'LOCAL_LESSON',
    };
  }
}
