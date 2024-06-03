import { Injectable } from "@nestjs/common";
import { Notification } from "../entities/notification.entity";
import { UIChannel } from "../channels/ui.channel";
import { EmailChannel } from "../channels/email.channel";
import { NotificationType } from "../notification-types/notification-type.interface";
import { LeaveBalanceReminderType } from "../notification-types/leave-balance-reminder.type";
import { MonthlyPayslipType } from "../notification-types/monthly-payslip.type";
import { HappyBirthdayType } from "../notification-types/happy-birthday.type";
import { CreateNotificationObserver } from "../observers/create-notification-observer";

@Injectable()
export class NotificationFactory {

    constructor(
        private createNotificationObserver: CreateNotificationObserver
    ) { }

    createNotification(notificationType: string, userId: number): Notification {
        const notification = new Notification();
        let type: NotificationType;

        switch (notificationType) {
            case 'leave-balance-reminder':
                type = new LeaveBalanceReminderType();
                const uiChannel = new UIChannel(type.message);
                this.createNotificationObserver.initData(type.message, userId, 'ui', 'leave-balance-reminder');
                uiChannel.attach(this.createNotificationObserver);
                notification.addChannel(uiChannel);
                break;
            case 'monthly-payslip':
                type = new MonthlyPayslipType();
                notification.addChannel(new EmailChannel(type.message, type.subject));
                break;
            case 'happy-birthday':
                type = new HappyBirthdayType();
                const uiChannelBirthday = new UIChannel(type.message);
                this.createNotificationObserver.initData(type.message, userId, 'ui', 'happy-birthday');
                uiChannelBirthday.attach(this.createNotificationObserver);
                notification.addChannel(new EmailChannel(type.message, type.subject));
                notification.addChannel(uiChannelBirthday);
                break;
            default:
                throw new Error(`Unknown notification type: ${notificationType}`);
        }

        return notification;
    }
}