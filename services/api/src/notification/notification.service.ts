import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NotificationLog } from './entities/notification-log.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(NotificationLog)
    private readonly notificationRepository: Repository<NotificationLog>,
  ) {}

  async createNotification(
    user: User,
    type: string,
  ): Promise<NotificationLog> {
    const notification = this.notificationRepository.create({
      user,
      type,
      delivered: false,
    });

    return this.notificationRepository.save(notification);
  }

  async markDelivered(
    id: string,
  ): Promise<NotificationLog> {
    const notification =
      await this.notificationRepository.findOneBy({ id });

    if (!notification) {
      throw new Error('Notification not found');
    }

    notification.delivered = true;
    notification.deliveredAt = new Date();

    return this.notificationRepository.save(notification);
  }
}
