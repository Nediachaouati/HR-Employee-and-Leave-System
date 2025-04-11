import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from 'src/role.enum';
import { DemandConge } from './entities/demand-conge.entity';

@Injectable()
export class DemandCongeService {
  constructor(
    @InjectRepository(DemandConge)
    private demandCongeRepository: Repository<DemandConge>,
  ) {}

  async create(demand: Partial<DemandConge>, user: any): Promise<DemandConge> {
    if (user.role !== Role.EMPLOYE) {
      throw new ForbiddenException('Seul un employé peut créer une demande de congé');
    }
    const newDemand = this.demandCongeRepository.create({
      ...demand,
      userId: user.id,
    });
    return this.demandCongeRepository.save(newDemand);
  }

  async findAll(user: any): Promise<DemandConge[]> {
    if (user.role === Role.EMPLOYE) {
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
}