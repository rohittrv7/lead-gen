import { Controller, Get, Post, Patch, Param, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { LeadsService } from './leads.service';
import { CreateLeadDto } from './dto/create-lead.dto';

@ApiTags('Leads')
@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post()
  @ApiOperation({ summary: 'Save or update leads' })
  @ApiBody({
    type: CreateLeadDto,
    isArray: true,
    description: 'Provide a single lead object or an array of leads to upsert into MongoDB',
  })
  @ApiResponse({ status: 201, description: 'Leads saved and synchronized successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request - Validation Errors' })
  async saveLeads(@Body() body: CreateLeadDto | CreateLeadDto[]) {
    if (Array.isArray(body)) {
      const leads = await this.leadsService.createOrUpdateMany(body);
      return { success: true, leads };
    } else {
      const lead = await this.leadsService.createOrUpdate(body);
      return { success: true, leads: [lead] };
    }
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve leads with filtering' })
  @ApiQuery({ name: 'category', required: false, type: String, description: 'Filter by category (case-insensitive)' })
  @ApiQuery({ name: 'address', required: false, type: String, description: 'Filter by address (case-insensitive)' })
  @ApiQuery({ name: 'city', required: false, type: String, description: 'Filter by city (case-insensitive)' })
  @ApiResponse({ status: 200, description: 'List of matching leads returned successfully' })
  async getLeads(
    @Query('category') category?: string,
    @Query('address') address?: string,
    @Query('city') city?: string,
  ) {
    const leads = await this.leadsService.findAll({ category, address, city });
    return { success: true, leads };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a specific lead follow-up or project information' })
  @ApiResponse({ status: 200, description: 'Lead updated successfully' })
  async updateLead(@Param('id') id: string, @Body() body: any) {
    const lead = await this.leadsService.updateLead(id, body);
    return { success: true, lead };
  }
}
