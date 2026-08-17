import { BadRequestException, Injectable } from '@nestjs/common';
import { ClassroomControl } from './classroom-control.enum';
import {
  ClassroomControlContext,
  LearningModule,
} from './classroom-control-context.interface';

@Injectable()
export class ClassroomControlService {
  private readonly backForwardModules: LearningModule[] = [
    'PTDM',
    'CEDM',
    'MEDM',
    'SAP',
    'BM',
    'AEM',
  ];

  private base(
    context: Partial<ClassroomControlContext>,
    control: ClassroomControl,
  ): ClassroomControlContext {
    return {
      control,
      sessionId: context.sessionId ?? null,
      learningPath: context.learningPath ?? 'LEARNING_PATH',
      module: context.module ?? 'SCLA',
      questionModeActive: false,
      paused: false,
      playable: true,
      stopped: false,
      position: Math.max(0, Math.min(100, Number(context.position) || 0)),
      questionRouting: 'NONE',
    };
  }

  play(
    context: Partial<ClassroomControlContext>,
  ): ClassroomControlContext {
    return {
      ...this.base(context, ClassroomControl.PLAY),
      paused: false,
      stopped: false,
      playable: true,
    };
  }

  pause(
    context: Partial<ClassroomControlContext>,
  ): ClassroomControlContext {
    return {
      ...this.base(context, ClassroomControl.PAUSE),
      paused: true,
      stopped: false,
      playable: true,
    };
  }

  question(
    context: Partial<ClassroomControlContext>,
    question: string,
  ): ClassroomControlContext {
    const normalized = question.trim();

    return {
      ...this.base(context, ClassroomControl.QUESTION),
      questionModeActive: true,
      paused: true,
      stopped: false,
      playable: true,
      questionRouting:
        normalized.length > 0 ? 'PTDM' : 'LOCAL_LESSON',
    };
  }

  stop(
    context: Partial<ClassroomControlContext>,
  ): ClassroomControlContext {
    return {
      ...this.base(context, ClassroomControl.STOP),
      questionModeActive: false,
      paused: true,
      stopped: true,
      playable: false,
    };
  }

  back(
    context: Partial<ClassroomControlContext>,
  ): ClassroomControlContext {
    this.assertBackForwardAllowed(context.module ?? 'SCLA');

    return {
      ...this.base(context, ClassroomControl.BACK),
      position: Math.max(
        0,
        (Number(context.position) || 0) - 1,
      ),
    };
  }

  forward(
    context: Partial<ClassroomControlContext>,
  ): ClassroomControlContext {
    this.assertBackForwardAllowed(context.module ?? 'SCLA');

    return {
      ...this.base(context, ClassroomControl.FORWARD),
      position: Math.min(
        100,
        (Number(context.position) || 0) + 1,
      ),
    };
  }

  private assertBackForwardAllowed(module: LearningModule): void {
    if (!this.backForwardModules.includes(module)) {
      throw new BadRequestException(
        `BACK/FORWARD controls are not available for ${module}.`,
      );
    }
  }
}
