import { Controller, Param, Post } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('notifications')
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService,
  ) {}

  @Post('deliver/:userId/:type')
  async create(
    @Param('userId') userId: string,
    @Param('type') type: string,
  ) {
    return {
      message: 'Notification event queued',
      userId,
      type,
    };
  }
}
