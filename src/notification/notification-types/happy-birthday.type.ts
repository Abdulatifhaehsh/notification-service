import { NotificationType } from "./notification-type.interface";

export class HappyBirthdayType implements NotificationType {
    message: string;
    subject: string;

    constructor() {
        this.message = 'We wish you a happy birthday';
        this.subject = 'Happy Birthday';
    }

}