import { NotificationObserver } from '../observers/notification-observer.interface';
import { NotificationChannel } from './notification-channel.interface';

export class UIChannel implements NotificationChannel {
    observers: NotificationObserver[] = [];
    message: string;
    readonly name: string = 'ui';

    constructor(message: string) {
        this.message = message;

    }


    async send(): Promise<void> {
        console.log(`Sending UI with Message: ${this.message}`);
        await this.notifyObservers();
    }

    attach(observer: NotificationObserver): void {
        this.observers.push(observer);
    }

    async notifyObservers(): Promise<void> {
        for (const observer of this.observers) {
            await observer.update();
        }
    }

}