import { Body, Controller, Post } from '@nestjs/common';
import { ClassroomControl } from '../classroom-controls/classroom-control.enum';
import { ClassroomControlService } from '../classroom-controls/classroom-control.service';
import type {
  ClassroomControlRuntimeRequest,
  ClassroomControlRuntimeResult,
} from '../interfaces/classroom-control-runtime.interface';

@Controller('learning-runtime/classroom')
export class ClassroomControlsController {
  constructor(
    private readonly classroomControls: ClassroomControlService,
  ) {}

  @Post('control')
  control(
    @Body() request: ClassroomControlRuntimeRequest,
  ): ClassroomControlRuntimeResult {
    const context = {
      sessionId: request.sessionId ?? null,
      learningPath: request.learningPath,
      module: request.module,
      position: request.position ?? 0,
    };

    switch (request.control) {
      case ClassroomControl.PLAY:
        return this.classroomControls.play(context);

      case ClassroomControl.PAUSE:
        return this.classroomControls.pause(context);

      case ClassroomControl.QUESTION:
        return this.classroomControls.question(
          context,
          request.question ?? '',
        );

      case ClassroomControl.STOP:
        return this.classroomControls.stop(context);

      case ClassroomControl.BACK:
        return this.classroomControls.back(context);

      case ClassroomControl.FORWARD:
        return this.classroomControls.forward(context);

      default:
        throw new Error('Unsupported classroom control');
    }
  }
}
