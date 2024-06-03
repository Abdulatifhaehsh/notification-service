export interface NotificationChannel {
    message: string;
    readonly name: string;
    send(): Promise<void>;
}