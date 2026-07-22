import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true, strict: false })
export class Job extends Document {
  @Prop({ required: true, unique: true })
  id: string; // Front-end ID e.g., live-linkedin-1 or live-google-jobs-2

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  company: string;

  @Prop({ type: String })
  location?: string;

  @Prop({ type: String })
  salary?: string;

  @Prop({ type: String })
  employmentType?: string;

  @Prop({ type: String })
  experience?: string;

  @Prop({ type: String })
  postedTime?: string;

  @Prop({ type: String })
  description?: string;

  @Prop({ type: [String] })
  skills?: string[];

  @Prop({ type: String })
  applyUrl?: string;

  @Prop({ type: String })
  companyWebsite?: string;

  @Prop({ type: String })
  companySize?: string;

  @Prop({ type: String })
  industry?: string;

  @Prop({ type: String })
  remoteOrOnsite?: string;

  @Prop({ type: String })
  requirements?: string;

  @Prop({ type: String })
  source?: string; // 'google-jobs' | 'linkedin-jobs-no-cookie' | 'greenhouse-jobs' | 'glassdoor-jobs' | 'linkedin-company'

  @Prop({ type: Number })
  companyRating?: number;

  @Prop({ type: [String] })
  employeeReviews?: string[];

  @Prop({ type: String })
  aboutCompany?: string;

  @Prop({ type: String })
  imageUrl?: string;

  @Prop({ type: String, default: 'Not Applied' })
  status: string; // 'Not Applied' | 'Applied' | 'Interviewing' | 'Offer' | 'Rejected'

  @Prop({ type: String, default: '' })
  notes: string;
}

export const JobSchema = SchemaFactory.createForClass(Job);
