import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsArray,
  ValidateNested,
  IsNotEmpty,
} from 'class-validator';

export class AuditDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  leadId: string;

  @ApiProperty()
  @IsNumber()
  pageSpeedScore: number;

  @ApiProperty()
  @IsBoolean()
  hasWebsite: boolean;

  @ApiProperty()
  @IsBoolean()
  mobileFriendly: boolean;

  @ApiProperty()
  @IsBoolean()
  https: boolean;

  @ApiProperty()
  @IsBoolean()
  hasSchema: boolean;

  @ApiProperty()
  @IsNumber()
  loadTimeMs: number;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  gaps: string[];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  biggestGap: string;

  @ApiProperty()
  @IsNumber()
  estLostRevenuePerMonth: number;
}

export class ScoreBreakdownDto {
  @ApiProperty()
  @IsNumber()
  noOrBadSite: number;

  @ApiProperty()
  @IsNumber()
  reviewVolume: number;

  @ApiProperty()
  @IsNumber()
  rating: number;

  @ApiProperty()
  @IsNumber()
  recency: number;

  @ApiProperty()
  @IsNumber()
  reachable: number;

  @ApiProperty()
  @IsNumber()
  industryFit: number;
}

export class OutreachMessagesDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  first: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  followUp: string;
}

export class OutreachLanguagesDto {
  @ApiProperty({ type: OutreachMessagesDto })
  @ValidateNested()
  @Type(() => OutreachMessagesDto)
  english: OutreachMessagesDto;

  @ApiProperty({ type: OutreachMessagesDto })
  @ValidateNested()
  @Type(() => OutreachMessagesDto)
  hinglish: OutreachMessagesDto;
}

export class OutreachDraftsDto {
  @ApiProperty({ type: OutreachLanguagesDto })
  @ValidateNested()
  @Type(() => OutreachLanguagesDto)
  whatsapp: OutreachLanguagesDto;

  @ApiProperty({ type: OutreachLanguagesDto })
  @ValidateNested()
  @Type(() => OutreachLanguagesDto)
  email: OutreachLanguagesDto;

  @ApiProperty({ type: OutreachLanguagesDto })
  @ValidateNested()
  @Type(() => OutreachLanguagesDto)
  instagram: OutreachLanguagesDto;
}

export class CreateLeadDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  whatsapp?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  website?: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  rating?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  reviewsCount?: number;

  @ApiProperty()
  @IsNumber()
  lat: number;

  @ApiProperty()
  @IsNumber()
  lng: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  photosCount?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  yearsInBusiness?: number;

  @ApiProperty({ type: AuditDto })
  @ValidateNested()
  @Type(() => AuditDto)
  audit: AuditDto;

  @ApiProperty()
  @IsNumber()
  score: number;

  @ApiProperty({ type: ScoreBreakdownDto })
  @ValidateNested()
  @Type(() => ScoreBreakdownDto)
  scoreBreakdown: ScoreBreakdownDto;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  websitePrompt?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  selectedChannel?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  selectedLanguage?: string;

  @ApiPropertyOptional({ type: OutreachDraftsDto })
  @ValidateNested()
  @Type(() => OutreachDraftsDto)
  @IsOptional()
  outreachDrafts?: OutreachDraftsDto;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  contactedStatus?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  followUpNotes?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  followUpDate?: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  projectCost?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  amountPaid?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  amountDue?: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  source?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  socialMetrics?: any;
}
