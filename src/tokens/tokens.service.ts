import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApifyToken } from './token.schema';

@Injectable()
export class TokensService {
  constructor(@InjectModel(ApifyToken.name) private tokenModel: Model<ApifyToken>) {}

  async findAll(): Promise<ApifyToken[]> {
    return this.tokenModel.find().exec();
  }

  async create(token: string, label?: string): Promise<ApifyToken> {
    const existing = await this.tokenModel.findOne({ token }).exec();
    if (existing) {
      if (label !== undefined) {
        existing.label = label;
        return existing.save();
      }
      return existing;
    }
    return new this.tokenModel({ token, label: label || '' }).save();
  }

  async updateLabel(token: string, label: string): Promise<ApifyToken | null> {
    return this.tokenModel.findOneAndUpdate({ token }, { label }, { new: true }).exec();
  }

  async delete(token: string): Promise<any> {
    return this.tokenModel.deleteOne({ token }).exec();
  }
}
