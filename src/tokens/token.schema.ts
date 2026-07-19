import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class ApifyToken extends Document {
  @Prop({ required: true, unique: true })
  token: string;
}

export const ApifyTokenSchema = SchemaFactory.createForClass(ApifyToken);
