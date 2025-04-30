import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from 'src/role.enum';
import { DemandConge } from './entities/demand-conge.entity';
import { CreateDemandCongeDto } from './dto/create-demand-conge.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class DemandCongeService {
  constructor(
    @InjectRepository(DemandConge)
    private demandCongeRepository: Repository<DemandConge>,
  ) {}

  async create(createDto: CreateDemandCongeDto, user: User): Promise<DemandConge> {
    const conge = this.demandCongeRepository.create({
      ...createDto,
      userId: user.id, // user from JWT
    });

    return this.demandCongeRepository.save(conge);
  }

  async findAll(user: any): Promise<DemandConge[]> {
    if (user.role === Role.ADMIN) {
      return this.demandCongeRepository.find({
        where: { userId: user.id },
        relations: ['user', 'approvedBy'],
      });
    }
    
    return this.demandCongeRepository.find({ relations: ['user', 'approvedBy'] });
  }

  async findOne(id: number, user: any): Promise<DemandConge> {
    const demand = await this.demandCongeRepository.findOne({
      where: { id },
      relations: ['user', 'approvedBy'],
    });

    if (!demand) {
      throw new NotFoundException(`La demande de congé avec l'ID ${id} n'a pas été trouvée`);
    }

    if (user.role === Role.EMPLOYE && demand.userId !== user.id) {
      throw new ForbiddenException('Vous ne pouvez voir que vos propres demandes');
    }

    return demand;
  }
  async findByUser(userId: number): Promise<DemandConge[]> {
    return this.demandCongeRepository.find({
      where: { userId },
      relations: ['user'], // include the user info if needed
    });
  }
  async update(id: number, demand: Partial<DemandConge>, user: any): Promise<DemandConge> {
    const existingDemand = await this.findOne(id, user); 
    if (user.role === Role.EMPLOYE && existingDemand.userId !== user.id) {
      throw new ForbiddenException('Vous ne pouvez modifier que vos propres demandes');
    }
    await this.demandCongeRepository.update(id, demand);
    return this.findOne(id, user); 
  }

  async remove(id: number, user: any): Promise<void> {
    const demand = await this.findOne(id, user); 
    if (user.role === Role.EMPLOYE && demand.userId !== user.id) {
      throw new ForbiddenException('Vous ne pouvez supprimer que vos propres demandes');
    }
    await this.demandCongeRepository.delete(id);
  }
  async updateStatus(id: number, status: 'En attente' | 'Approuvé' | 'Rejeté'): Promise<DemandConge> {
    const demand = await this.demandCongeRepository.findOne({ where: { id } });
  
    if (!demand) {
      throw new NotFoundException('Demand not found');
    }
  
    demand.status = status;
    return this.demandCongeRepository.save(demand);
  }
}