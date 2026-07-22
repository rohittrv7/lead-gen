import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsArray, IsNotEmpty } from 'class-validator';

export class CreateJobDto {
  @ApiProperty({ description: 'Unique identifier for the job' })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ description: 'Title of the job posting' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Company offering the job' })
  @IsString()
  @IsNotEmpty()
  company: string;

  @ApiPropertyOptional({ description: 'Location of the job' })
  @IsString()
  @IsOptional()
  location?: string;

  @ApiPropertyOptional({ description: 'Salary information' })
  @IsString()
  @IsOptional()
  salary?: string;

  @ApiPropertyOptional({ description: 'Employment type (e.g. Full-time, Internship)' })
  @IsString()
  @IsOptional()
  employmentType?: string;

  @ApiPropertyOptional({ description: 'Required experience level' })
  @IsString()
  @IsOptional()
  experience?: string;

  @ApiPropertyOptional({ description: 'Time/date when job was posted' })
  @IsString()
  @IsOptional()
  postedTime?: string;

  @ApiPropertyOptional({ description: 'Job description text' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ description: 'List of skills required', type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  skills?: string[];

  @ApiPropertyOptional({ description: 'Apply link for the job' })
  @IsString()
  @IsOptional()
  applyUrl?: string;

  @ApiPropertyOptional({ description: 'Website of the company' })
  @IsString()
  @IsOptional()
  companyWebsite?: string;

  @ApiPropertyOptional({ description: 'Size of the company' })
  @IsString()
  @IsOptional()
  companySize?: string;

  @ApiPropertyOptional({ description: 'Industry category' })
  @IsString()
  @IsOptional()
  industry?: string;

  @ApiPropertyOptional({ description: 'Workplace status (Remote / Hybrid / Onsite)' })
  @IsString()
  @IsOptional()
  remoteOrOnsite?: string;

  @ApiPropertyOptional({ description: 'Job requirements text' })
  @IsString()
  @IsOptional()
  requirements?: string;

  @ApiPropertyOptional({ description: 'Scraping source' })
  @IsString()
  @IsOptional()
  source?: string;

  @ApiPropertyOptional({ description: 'Overall company rating' })
  @IsNumber()
  @IsOptional()
  companyRating?: number;

  @ApiPropertyOptional({ description: 'Employee review highlights', type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  employeeReviews?: string[];

  @ApiPropertyOptional({ description: 'About company description' })
  @IsString()
  @IsOptional()
  aboutCompany?: string;

  @ApiPropertyOptional({ description: 'Company logo/image URL' })
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @ApiPropertyOptional({ description: 'Current application status', default: 'Not Applied' })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiPropertyOptional({ description: 'User notes or follow-up details', default: '' })
  @IsString()
  @IsOptional()
  notes?: string;
}
