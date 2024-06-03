import { NotificationChannel } from "../channels/notification-channel.interface";

export class Notification {

    channels: NotificationChannel[] = [];


    addChannel(channel: NotificationChannel): void {
        this.channels.push(channel);
    }

    filterChannels(subscribedChannels: string[]): void {
        this.channels = this.channels.filter(channel => subscribedChannels.includes(channel.name));
    }

    async notify(): Promise<void> {
        if (this.channels.length === 0) {
            throw new Error('There is no channel');
        }
        await this.channels.forEach(async (channel) => await channel.send());
    }
}