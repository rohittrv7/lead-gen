import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { ScrapeService, ScrapeInput } from './scrape.service';

@ApiTags('Scrape')
@Controller('scrape')
export class ScrapeController {
  constructor(private readonly scrapeService: ScrapeService) {}

  @Post()
  @ApiOperation({ summary: 'Scrape live leads or job listings via Apify' })
  @ApiBody({
    description: 'Scrape input payload for searching jobs or business prospects',
    schema: {
      type: 'object',
      properties: {
        niche: { type: 'string', example: 'MERN Stack Developer' },
        city: { type: 'string', example: 'Noida' },
        count: { type: 'number', example: 10 },
        source: { type: 'string', example: 'linkedin' },
        linkedinMode: { type: 'string', example: 'google-jobs' },
        datePosted: { type: 'string', example: '24h' },
        apifyToken: { type: 'string', example: 'apify_api_xxx' },
      },
    },
  })
  async scrapeLeadsOrJobs(@Body() body: ScrapeInput) {
    return this.scrapeService.executeScrape(body);
  }
}
