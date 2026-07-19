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

  async create(token: string): Promise<ApifyToken> {
    const existing = await this.tokenModel.findOne({ token }).exec();
    if (existing) return existing;
    return new this.tokenModel({ token }).save();
  }

  async delete(token: string): Promise<any> {
    return this.tokenModel.deleteOne({ token }).exec();
  }
}
