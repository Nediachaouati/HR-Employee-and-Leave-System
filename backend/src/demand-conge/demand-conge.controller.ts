import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards,Request, BadRequestException, InternalServerErrorException, Patch, ForbiddenException, ParseIntPipe, Query  } from '@nestjs/common';
import { DemandCongeService } from './demand-conge.service';
import { DemandConge } from './entities/demand-conge.entity';
import { Role } from 'src/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator'; 
import { CreateDemandCongeDto } from './dto/create-demand-conge.dto';

@Controller('demand')
@UseGuards(JwtAuthGuard) 
export class DemandCongeController {
  constructor(private readonly demandCongeService: DemandCongeService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.EMPLOYE) 
  create(@Body() createDto: CreateDemandCongeDto, @Request() req) {
    const user = req.user; 
    return this.demandCongeService.create(createDto, user);
  }

  @Get()
  findAll(@CurrentUser() user: any) {
    return this.demandCongeService.findAll(user);
  }
  @Get('mydemands')
  @Roles(Role.EMPLOYE)
  async getMyDemands(@Request() req) {
    if (!req.user || !req.user.id) {
      throw new BadRequestException('User ID is missing or invalid');
    }
    try {
      return await this.demandCongeService.findByUser(req.user.id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: any) {
    return this.demandCongeService.findOne(+id, user);
  }
  @Delete(':id')
  async deleteLeave(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.demandCongeService.deleteleave(id);
  }
  @Roles(Role.EMPLOYE) 
  @Put(':id')
  update(@Param('id') id: string, @Body() demand: Partial<DemandConge>, @CurrentUser() user: any) {
    return this.demandCongeService.update(+id, demand, user);
  }

  // @Roles(Role.EMPLOYE) 
  // @Delete(':id')
  // remove(@Param('id') id: string, @CurrentUser() user: any) {
  //   return this.demandCongeService.remove(+id, user);
  // }
  @Put(':id/status')
  @Roles(Role.RH)
  async updateStatus(
    @Param('id') id: number,
    @Body('status') status: 'En attente' | 'Approuvé' | 'Rejeté',
    @Request() req: any,
  ): Promise<DemandConge> {
    const user = req.user; 

    const demand = await this.demandCongeService.updateStatus(id, status);
    
    
    if (status === 'Approuvé' || status === 'Rejeté') {
      demand.approvedById = user.id;
      await this.demandCongeService.save(demand); // Save the updated demand
    }

    return demand;
  }
@Get('stats/type')
  getStatsByType() {
    return this.demandCongeService.getStatsByType();
  }
  @Get('demands/by-type')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async getDemandsByType(@Query('year') year?: string) {
    return this.demandCongeService.getDemandsByType(year ? +year : undefined);
  }
  @Get('stats/monthly')
  getStatsMonthly() {
    return this.demandCongeService.getStatsMonthly();
  }

  @Get('stats/status')
  getStatsByStatus() {
    return this.demandCongeService.getStatsByStatus();
  }
}