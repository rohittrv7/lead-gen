import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { Job } from './job.schema';
import { CreateJobDto } from './dto/create-job.dto';

@Injectable()
export class JobsService {
  constructor(@InjectModel(Job.name) private jobModel: Model<Job>) {}

  async createOrUpdate(jobData: CreateJobDto): Promise<Job> {
    const existing = await this.jobModel.findOne({ id: jobData.id }).exec();
    if (existing) {
      return this.jobModel.findOneAndUpdate({ id: jobData.id }, jobData, { new: true }).exec();
    }
    return new this.jobModel(jobData).save();
  }

  async createOrUpdateMany(jobsData: CreateJobDto[]): Promise<Job[]> {
    const results: Job[] = [];
    for (const item of jobsData) {
      const res = await this.createOrUpdate(item);
      results.push(res);
    }
    return results;
  }

  async updateJob(id: string, updateData: Partial<Job>): Promise<Job> {
    return this.jobModel.findOneAndUpdate({ id }, updateData, { new: true }).exec();
  }

  async findAll(filters: { search?: string; status?: string; source?: string }): Promise<Job[]> {
    const query: FilterQuery<Job> = {};

    if (filters.search) {
      query.$or = [
        { title: { $regex: filters.search, $options: 'i' } },
        { company: { $regex: filters.search, $options: 'i' } },
        { location: { $regex: filters.search, $options: 'i' } }
      ];
    }

    if (filters.status) {
      query.status = filters.status;
    }

    if (filters.source) {
      query.source = filters.source;
    }

    return this.jobModel.find(query).sort({ updatedAt: -1 }).exec();
  }

  async deleteJob(id: string): Promise<any> {
    return this.jobModel.deleteOne({ id }).exec();
  }
}
