import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { DemandCongeService } from './demand-conge.service';
import { DemandConge } from './entities/demand-conge.entity';
import { Role } from 'src/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator'; 

@Controller('demand')
@UseGuards(JwtAuthGuard) 
export class DemandCongeController {
  constructor(private readonly demandCongeService: DemandCongeService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.EMPLOYE) 
  create(@Body() demand: Partial<DemandConge>, @CurrentUser() user: any) {
    return this.demandCongeService.create(demand, user);
  }

  @Get()
  findAll(@CurrentUser() user: any) {
    return this.demandCongeService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: any) {
    return this.demandCongeService.findOne(+id, user);
  }

  @Roles(Role.EMPLOYE) 
  @Put(':id')
  update(@Param('id') id: string, @Body() demand: Partial<DemandConge>, @CurrentUser() user: any) {
    return this.demandCongeService.update(+id, demand, user);
  }

  @Roles(Role.EMPLOYE) 
  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.demandCongeService.remove(+id, user);
  }
}