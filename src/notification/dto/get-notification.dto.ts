import { IsNotEmpty, IsNumberString } from "class-validator";

export class GetNotificationDto {

    @IsNotEmpty()
    @IsNumberString()
    userId: number;

}