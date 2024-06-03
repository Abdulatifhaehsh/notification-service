import { IsIn, IsNotEmpty, IsNumber, IsNumberString, IsString } from "class-validator";

export class CreateNotificationDto {
    @IsNotEmpty()
    @IsString()
    @IsIn(["leave-balance-reminder", "monthly-payslip", "happy-birthday"])
    notificationType: string;
    @IsNotEmpty()
    @IsNumberString()
    userId: number;
    @IsNotEmpty()
    @IsNumberString()
    companyId: number;
}