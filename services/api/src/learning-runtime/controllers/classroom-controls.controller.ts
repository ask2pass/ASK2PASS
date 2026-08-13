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

      default:
        throw new Error('Unsupported classroom control');
    }
  }
}
