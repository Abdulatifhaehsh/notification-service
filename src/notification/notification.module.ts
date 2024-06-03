import { Module } from '@nestjs/common';
import { NotificationService } from './services/notification.service';
import { CompanyService } from './services/company.service';
import { NotificationController } from './notification.controller';
import { NotificationFactory } from './factories/notification.factory';
import { MongooseModule } from '@nestjs/mongoose';
import { Notification, NotificationSchema } from './schemas/notification.schema';
import { CreateNotificationObserver } from './observers/create-notification-observer';




@Module({
  imports: [MongooseModule.forFeature([{ name: Notification.name, schema: NotificationSchema }])],
  providers: [NotificationService, CompanyService, NotificationFactory, CreateNotificationObserver],
  exports: [NotificationService, CompanyService],
  controllers: [NotificationController],
})
export class NotificationModule {


}
