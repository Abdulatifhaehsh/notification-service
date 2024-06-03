import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { NotificationService } from './services/notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { Notification } from './schemas/notification.schema';
import { GetNotificationDto } from './dto/get-notification.dto';

@Controller('notification')
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) { }

    @Post()
    async sendNotification(@Body() createNotificationDto: CreateNotificationDto): Promise<any> {
        try {
            await this.notificationService.sendNotification(createNotificationDto);
        } catch (error) {
            return error.message;
        }
        return 'done';
    }

    @Get()
    async getNofications(@Query() getNotificationDto: GetNotificationDto) {
        return this.notificationService.getNotifications(getNotificationDto.userId);
    }
}
