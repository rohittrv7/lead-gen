import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { TokensService } from './tokens.service';

@ApiTags('Apify Tokens')
@Controller('tokens')
export class TokensController {
  constructor(private readonly tokensService: TokensService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve all saved Apify tokens with labels' })
  async getTokens() {
    const items = await this.tokensService.findAll();
    return {
      success: true,
      tokens: items.map(i => i.token),
      tokenObjects: items.map(i => ({ token: i.token, label: i.label || '' }))
    };
  }

  @Post()
  @ApiOperation({ summary: 'Save an Apify token with optional label' })
  async saveToken(@Body('token') token: string, @Body('label') label?: string) {
    const item = await this.tokensService.create(token, label);
    return { success: true, token: item.token, label: item.label };
  }

  @Patch()
  @ApiOperation({ summary: 'Update label for a saved Apify token' })
  async updateTokenLabel(@Body('token') token: string, @Body('label') label: string) {
    const item = await this.tokensService.updateLabel(token, label);
    return { success: true, token, label: item?.label || '' };
  }

  @Delete(':token')
  @ApiOperation({ summary: 'Delete a saved Apify token' })
  async deleteToken(@Param('token') token: string) {
    await this.tokensService.delete(token);
    return { success: true };
  }
}
