import { Injectable } from '@nestjs/common';
import type {
  AATStudentNote,
  AATWhiteboardEvent,
} from '../interfaces/aat-whiteboard.interface';

@Injectable()
export class AATWhiteboardService {
  prepareEvent(event: AATWhiteboardEvent): AATWhiteboardEvent {
    return {
      ...event,
      timestamp: event.timestamp || new Date().toISOString(),
    };
  }

  createNote(
    event: AATWhiteboardEvent,
    title = 'AAT Lesson Note',
  ): AATStudentNote | null {
    if (!event.saveAsNote || !event.content?.trim()) {
      return null;
    }

    return {
      avatarId: event.avatarId,
      title,
      content: event.content.trim(),
      source: 'AAT_WHITEBOARD',
      createdAt: new Date().toISOString(),
    };
  }
}
