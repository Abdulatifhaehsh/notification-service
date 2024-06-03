import { NotificationType } from "./notification-type.interface";

export class LeaveBalanceReminderType implements NotificationType {
    message: string;
    subject: string;

    constructor() {
        this.message = 'You have to take his leave';
        this.subject = 'Leave Reminder';
    }

}