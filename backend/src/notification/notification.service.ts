import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
  ) {}

  async getNotificationsForUser(userId: number): Promise<Notification[]> {
    return this.notificationRepository.find({
      where: { userId },
      relations: ['demand'],
      order: { created_at: 'DESC' },
    });
  }
  async markAsRead(id: number, userId: number): Promise<Notification> {
    const notification = await this.notificationRepository.findOne({ where: { id, userId } });
    if (!notification) {
      throw new Error(`Notification with ID ${id} not found or does not belong to user`);
    }
    notification.read = true;
    return this.notificationRepository.save(notification);
  }
  create(createNotificationDto: CreateNotificationDto) {
    return 'This action adds a new notification';
  }

  findAll() {
    return `This action returns all notification`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notification`;
  }

  update(id: number, updateNotificationDto: UpdateNotificationDto) {
    return `This action updates a #${id} notification`;
  }

  remove(id: number) {
    return `This action removes a #${id} notification`;
  }
}
