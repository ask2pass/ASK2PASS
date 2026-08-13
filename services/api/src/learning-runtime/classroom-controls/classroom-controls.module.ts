import { Module } from '@nestjs/common';
import { ClassroomControlService } from './classroom-control.service';

@Module({
  providers: [ClassroomControlService],
  exports: [ClassroomControlService],
})
export class ClassroomControlsModule {}
