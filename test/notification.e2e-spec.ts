import { Test, TestingModule } from '@nestjs/testing';
import { NotificationFactory } from '../src/notification/factories/notification.factory';
import { CreateNotificationObserver } from '../src/notification/observers/create-notification-observer';
import { UIChannel } from '../src/notification/channels/ui.channel';
import { EmailChannel } from '../src/notification/channels/email.channel';
import { CompanyService } from '../src/notification/services/company.service';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';


describe('Notification', () => {
    let notificationFactory: NotificationFactory;
    let mockMongoObserver: CreateNotificationObserver;
    let mockCompanyService: CompanyService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                NotificationFactory,
                {
                    provide: CreateNotificationObserver,
                    useValue: {
                        update: jest.fn(),
                        initData: jest.fn(),
                    },
                },
                {
                    provide: CompanyService,
                    useClass: CompanyService, // Use the actual CompanyService
                },
            ],
        }).compile();

        notificationFactory = module.get<NotificationFactory>(NotificationFactory);
        mockMongoObserver = module.get<CreateNotificationObserver>(CreateNotificationObserver);
        mockCompanyService = module.get<CompanyService>(CompanyService);
    });

    afterEach(async () => {
        await mongoose.connection.close();
    });

    it('should create notification with correct channels for leave-balance-reminder', () => {
        const company = mockCompanyService.getUserCompanySubscriptions(1, 1);
        const notification = notificationFactory.createNotification('leave-balance-reminder', 1);
        expect(notification.channels.length).toEqual(1);
        expect(notification.channels[0]).toBeInstanceOf(UIChannel);
        notification.filterChannels(company.subscribedChannels);
        expect(notification.channels.length).toEqual(1);
        expect(notification.channels[0]).toBeInstanceOf(UIChannel);
        expect(() => notification.notify()).not.toThrow();
    });

    it('should throw exception because a company doesn\'t have email subscription for monthly-payslip', async () => {
        const company = mockCompanyService.getUserCompanySubscriptions(1, 1);
        const notification = notificationFactory.createNotification('monthly-payslip', 1);
        expect(notification.channels.length).toEqual(1);
        expect(notification.channels[0]).toBeInstanceOf(EmailChannel);
        notification.filterChannels(company.subscribedChannels);
        expect(notification.channels.length).toEqual(0);
        await expect(notification.notify()).rejects.toThrow('There is no channel');
    });

    it('should create notification with just UIChannel channels for happy-birthday for the first company', () => {
        const company = mockCompanyService.getUserCompanySubscriptions(1, 1);
        const notification = notificationFactory.createNotification('happy-birthday', 1);
        expect(notification.channels.length).toEqual(2);
        expect(notification.channels[0]).toBeInstanceOf(EmailChannel);
        expect(notification.channels[1]).toBeInstanceOf(UIChannel);
        notification.filterChannels(company.subscribedChannels);
        expect(notification.channels.length).toEqual(1);
        expect(notification.channels[0]).toBeInstanceOf(UIChannel);
        expect(() => notification.notify()).not.toThrow();
    });

    it('should create notification with UIChannel and Email channels for happy-birthday for the second company', () => {
        const company = mockCompanyService.getUserCompanySubscriptions(2, 4);
        const notification = notificationFactory.createNotification('happy-birthday', 4);
        expect(notification.channels.length).toEqual(2);
        expect(notification.channels[0]).toBeInstanceOf(EmailChannel);
        expect(notification.channels[1]).toBeInstanceOf(UIChannel);
        notification.filterChannels(company.subscribedChannels);
        expect(notification.channels.length).toEqual(2);
        expect(notification.channels[0]).toBeInstanceOf(EmailChannel);
        expect(notification.channels[1]).toBeInstanceOf(UIChannel);
        expect(() => notification.notify()).not.toThrow();
    });
});
