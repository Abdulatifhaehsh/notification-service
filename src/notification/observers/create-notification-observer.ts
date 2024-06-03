import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { NotificationObserver } from './notification-observer.interface';
import { Notification } from '../schemas/notification.schema';

@Injectable()
export class CreateNotificationObserver implements NotificationObserver {
    private message: string;
    private userId: number;
    private channel: string;
    private type: string;
    constructor(@InjectModel(Notification.name)
    private notificationModel: mongoose.Model<Notification>) { }

    initData(message: string, userId: number, channel: string, type: string): void {
        this.message = message;
        this.userId = userId;
        this.channel = channel;
        this.type = type;
    }

    async update(): Promise<void> {
        await this.notificationModel.create({ channel: this.channel, userId: this.userId, type: this.type, message: this.message });

    }
}
