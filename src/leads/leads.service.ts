import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { Lead } from './lead.schema';
import { CreateLeadDto } from './dto/create-lead.dto';

@Injectable()
export class LeadsService {
  constructor(@InjectModel(Lead.name) private leadModel: Model<Lead>) {}

  async createOrUpdate(leadData: CreateLeadDto): Promise<Lead> {
    const existing = await this.leadModel.findOne({ id: leadData.id }).exec();
    if (existing) {
      return this.leadModel.findOneAndUpdate({ id: leadData.id }, leadData, { new: true }).exec();
    }
    return new this.leadModel(leadData).save();
  }

  async createOrUpdateMany(leadsData: CreateLeadDto[]): Promise<Lead[]> {
    const results: Lead[] = [];
    for (const item of leadsData) {
      const res = await this.createOrUpdate(item);
      results.push(res);
    }
    return results;
  }

  async updateLead(id: string, updateData: Partial<Lead>): Promise<Lead> {
    return this.leadModel.findOneAndUpdate({ id }, updateData, { new: true }).exec();
  }

  async deleteLead(id: string): Promise<any> {
    return this.leadModel.deleteOne({ id }).exec();
  }

  async findAll(filters: { category?: string; address?: string; city?: string }): Promise<Lead[]> {
    const query: FilterQuery<Lead> = {};
    if (filters.category) {
      query.category = { $regex: filters.category, $options: 'i' };
    }
    if (filters.address) {
      query.address = { $regex: filters.address, $options: 'i' };
    }
    if (filters.city) {
      query.city = { $regex: filters.city, $options: 'i' };
    }
    return this.leadModel.find(query).sort({ score: -1 }).exec();
  }
}
