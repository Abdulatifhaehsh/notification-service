import { NotificationChannel } from "./notification-channel.interface";

export class EmailChannel implements NotificationChannel {
    message: string;
    subject: string;
    readonly name: string = 'email';
    constructor(message: string, subject: string) {
        this.message = message;
        this.subject = subject;
    }

    async send(): Promise<void> {
        console.log(`Sending email with Subject: ${this.subject} and Message: ${this.message}`);
    }
}