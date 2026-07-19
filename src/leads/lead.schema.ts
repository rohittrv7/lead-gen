import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true, strict: false })
export class Lead extends Document {
  @Prop({ required: true, unique: true })
  id: string; // Original frontend ID (e.g. lead-02)

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  city: string;

  @Prop({ type: String })
  phone?: string;

  @Prop({ type: String })
  whatsapp?: string;

  @Prop({ type: String })
  email?: string;

  @Prop({ type: String })
  website?: string;

  @Prop({ type: Number })
  rating?: number;

  @Prop({ type: Number })
  reviewsCount?: number;

  @Prop({ type: Number })
  lat: number;

  @Prop({ type: Number })
  lng: number;

  @Prop({ type: Number })
  photosCount?: number;

  @Prop({ type: Number })
  yearsInBusiness?: number;

  @Prop({ type: MongooseSchema.Types.Mixed })
  audit: any;

  @Prop({ type: Number })
  score: number;

  @Prop({ type: MongooseSchema.Types.Mixed })
  scoreBreakdown: any;

  @Prop({ type: String })
  websitePrompt?: string;

  @Prop({ type: String })
  selectedChannel?: string;

  @Prop({ type: String })
  selectedLanguage?: string;

  @Prop({ type: MongooseSchema.Types.Mixed })
  outreachDrafts?: any;

  @Prop({ type: String, default: 'Not Contacted' })
  contactedStatus?: string;

  @Prop({ type: String })
  followUpNotes?: string;

  @Prop({ type: String })
  followUpDate?: string;

  @Prop({ type: Number, default: 0 })
  projectCost?: number;

  @Prop({ type: Number, default: 0 })
  amountPaid?: number;

  @Prop({ type: Number, default: 0 })
  amountDue?: number;

  @Prop({ type: String, default: 'google' })
  source?: string;

  @Prop({ type: String })
  imageUrl?: string;

  @Prop({ type: MongooseSchema.Types.Mixed })
  socialMetrics?: any;
}

export const LeadSchema = SchemaFactory.createForClass(Lead);
