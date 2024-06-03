export interface NotificationObserver {
    update(): Promise<void>;
}