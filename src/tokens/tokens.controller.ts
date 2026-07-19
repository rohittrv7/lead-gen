import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { TokensService } from './tokens.service';

@ApiTags('Apify Tokens')
@Controller('tokens')
export class TokensController {
  constructor(private readonly tokensService: TokensService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve all saved Apify tokens' })
  async getTokens() {
    const items = await this.tokensService.findAll();
    return { success: true, tokens: items.map(i => i.token) };
  }

  @Post()
  @ApiOperation({ summary: 'Save an Apify token' })
  async saveToken(@Body('token') token: string) {
    const item = await this.tokensService.create(token);
    return { success: true, token: item.token };
  }

  @Delete(':token')
  @ApiOperation({ summary: 'Delete a saved Apify token' })
  async deleteToken(@Param('token') token: string) {
    await this.tokensService.delete(token);
    return { success: true };
  }
}
