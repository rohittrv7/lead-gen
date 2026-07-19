import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApifyToken, ApifyTokenSchema } from './token.schema';
import { TokensService } from './tokens.service';
import { TokensController } from './tokens.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ApifyToken.name, schema: ApifyTokenSchema }]),
  ],
  providers: [TokensService],
  controllers: [TokensController],
  exports: [TokensService],
})
export class TokensModule {}
