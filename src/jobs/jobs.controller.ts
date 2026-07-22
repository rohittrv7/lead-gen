import { Controller, Get, Post, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';

@ApiTags('Jobs')
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  @ApiOperation({ summary: 'Save or update jobs' })
  @ApiBody({
    type: CreateJobDto,
    isArray: true,
    description: 'Provide a single job object or an array of jobs to upsert into MongoDB',
  })
  @ApiResponse({ status: 201, description: 'Jobs saved successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request - Validation Errors' })
  async saveJobs(@Body() body: CreateJobDto | CreateJobDto[]) {
    if (Array.isArray(body)) {
      const jobs = await this.jobsService.createOrUpdateMany(body);
      return { success: true, jobs };
    } else {
      const job = await this.jobsService.createOrUpdate(body);
      return { success: true, jobs: [job] };
    }
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve jobs with filtering' })
  @ApiQuery({ name: 'search', required: false, type: String, description: 'Search term for title/company/location' })
  @ApiQuery({ name: 'status', required: false, type: String, description: 'Filter by application status' })
  @ApiQuery({ name: 'source', required: false, type: String, description: 'Filter by job source platform' })
  @ApiResponse({ status: 200, description: 'List of matching jobs returned successfully' })
  async getJobs(
    @Query('search') search?: string,
    @Query('status') status?: string,
    @Query('source') source?: string,
  ) {
    const jobs = await this.jobsService.findAll({ search, status, source });
    return { success: true, jobs };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a specific job status or notes' })
  @ApiResponse({ status: 200, description: 'Job updated successfully' })
  async updateJob(@Param('id') id: string, @Body() body: any) {
    const job = await this.jobsService.updateJob(id, body);
    return { success: true, job };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific job' })
  @ApiResponse({ status: 200, description: 'Job deleted successfully' })
  async deleteJob(@Param('id') id: string) {
    await this.jobsService.deleteJob(id);
    return { success: true };
  }
}
