import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';



@Schema({
    timestamps: true
})
export class Notification {
    @Prop({ required: true })
    message: string;

    @Prop({ required: true })
    type: string;

    @Prop({ required: true })
    channel: string;

    @Prop({ required: true })
    userId: number;


}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
