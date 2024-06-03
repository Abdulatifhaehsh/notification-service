import { Injectable } from '@nestjs/common';
import { NotificationFactory } from '../factories/notification.factory';
import { CreateNotificationDto } from '../dto/create-notification.dto';
import { CompanyService } from './company.service';
import { Notification } from '../schemas/notification.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Injectable()
export class NotificationService {
    constructor(
        @InjectModel(Notification.name)
        private notificationModel: mongoose.Model<Notification>,
        private notificationFactory: NotificationFactory,
        private userCompanyService: CompanyService
    ) { }

    async sendNotification(createNotificationDto: CreateNotificationDto): Promise<void> {
        const { notificationType, userId, companyId } = createNotificationDto;
        const company = this.userCompanyService.getUserCompanySubscriptions(companyId, userId);

        const notification = this.notificationFactory.createNotification(notificationType, userId);
        notification.filterChannels(company.subscribedChannels);

        await notification.notify();
    }


    async getNotifications(userId: number) {
        return await this.notificationModel.find({ userId: userId });
    }
}
