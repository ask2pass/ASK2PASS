import { Body, Controller, Post } from '@nestjs/common';
import type { AATWhiteboardEvent } from '../interfaces/aat-whiteboard.interface';
import { AATWhiteboardService } from '../services/aat-whiteboard.service';

@Controller('aat/whiteboard')
export class AATWhiteboardController {
  constructor(
    private readonly whiteboard: AATWhiteboardService,
  ) {}

  @Post('event')
  event(@Body() payload: AATWhiteboardEvent) {
    return this.whiteboard.prepareEvent(payload);
  }

  @Post('note')
  note(@Body() payload: AATWhiteboardEvent) {
    return this.whiteboard.createNote(payload);
  }
}
