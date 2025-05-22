import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from 'src/role.enum';
import { DemandConge } from './entities/demand-conge.entity';
import { CreateDemandCongeDto } from './dto/create-demand-conge.dto';
import { User } from 'src/users/entities/user.entity';
import { Notification } from 'src/notification/entities/notification.entity';

@Injectable()
export class DemandCongeService {
  constructor(
    @InjectRepository(DemandConge)
    private demandCongeRepository: Repository<DemandConge>,
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
  ) {}

  async create(createDto: CreateDemandCongeDto, user: User): Promise<DemandConge> {
    const conge = this.demandCongeRepository.create({
      ...createDto,
      userId: user.id, 
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
      relations: ['user'], 
    });
  }
  async update(id: number, demand: Partial<DemandConge>, user: User): Promise<DemandConge> {
    const existingDemand = await this.findOne(id, user);
    if (existingDemand.status !== 'En attente') {
      throw new ForbiddenException('Cannot update approved or rejected leave requests');
    }
    Object.assign(existingDemand, demand);
    return this.demandCongeRepository.save(existingDemand);
  }
  async deleteleave(id: number): Promise<void> {
    const demand = await this.demandCongeRepository.findOne({ where: { id } });

    if (!demand) {
      throw new NotFoundException(`Leave demand with ID ${id} not found`);
    }

    await this.demandCongeRepository.softDelete({ id });
  }
  async getDemandsByType(year?: number) {
    const query = this.demandCongeRepository
      .createQueryBuilder('demand')
      .select('demand.type as type, COUNT(*) as count')
      .where('demand.deleted_at IS NULL')
      .groupBy('demand.type');
    if (year) {
      query.andWhere('YEAR(demand.start_date) = :year', { year });
    }
    return query.getRawMany();
  }
  async remove(id: number, user: any): Promise<void> {
    const demand = await this.findOne(id, user); 
    if (user.role === Role.EMPLOYE && demand.userId !== user.id) {
      throw new ForbiddenException('Vous ne pouvez supprimer que vos propres demandes');
    }
    await this.demandCongeRepository.delete(id);
  }
  async updateStatus(id: number, status: 'En attente' | 'Approuvé' | 'Rejeté'): Promise<DemandConge> {
    const demand = await this.demandCongeRepository.findOne({ where: { id }, relations: ['user'] });

    if (!demand) {
      throw new NotFoundException('Demand not found');
    }

    demand.status = status;
    const updatedDemand = await this.demandCongeRepository.save(demand);

    const notification = new Notification();
    notification.message = `Your leave request from ${demand.start_date} to ${demand.end_date} has been ${status.toLowerCase()}.`;
    notification.read = false;
    notification.userId = demand.userId;
    notification.demandId = demand.id;
    await this.notificationRepository.save(notification);

    return updatedDemand;
  }
  async save(demand: DemandConge): Promise<DemandConge> {
    return this.demandCongeRepository.save(demand);
  }
  async getStatsByType() {
    return this.demandCongeRepository
      .createQueryBuilder('demand')
      .select('demand.type', 'type')
      .addSelect('COUNT(*)', 'count')
      .groupBy('demand.type')
      .getRawMany();
  }

  async getStatsMonthly() {
    return this.demandCongeRepository
      .createQueryBuilder('demand')
      .select('EXTRACT(MONTH FROM demand.created_at)', 'month')
      .addSelect('COUNT(*)', 'count')
      .groupBy('month')
      .orderBy('month')
      .getRawMany();
  }

  async getStatsByStatus() {
    return this.demandCongeRepository
      .createQueryBuilder('demand')
      .select('demand.status', 'status')
      .addSelect('COUNT(*)', 'count')
      .groupBy('demand.status')
      .getRawMany();
  }
}