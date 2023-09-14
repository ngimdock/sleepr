import { Injectable } from '@nestjs/common';
import { NotifyEmailDto } from './dto';

@Injectable()
export class NotificationsService {
  async notifyEmail(notifyEmailDto: NotifyEmailDto) {
    console.log({ notifyEmailDto });
  }
}
