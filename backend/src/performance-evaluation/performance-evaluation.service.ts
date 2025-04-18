import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PerformanceEvaluation } from './performance-evaluation.entity';
import { CreatePerformanceEvaluationDto } from './dto/create-performance-evaluation.dto';
import { UpdatePerformanceEvaluationDto } from './dto/update-performance-evaluation.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class PerformanceEvaluationService {
  constructor(
    @InjectRepository(PerformanceEvaluation)
    private performanceEvaluationRepository: Repository<PerformanceEvaluation>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createDto: CreatePerformanceEvaluationDto, evaluatorId: number) {
    const employee = await this.userRepository.findOne({ where: { id: createDto.employeeId } });
    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    const evaluator = await this.userRepository.findOne({ where: { id: evaluatorId } });
    if (!evaluator) {
      throw new NotFoundException('Evaluator not found');
    }

    const evaluation = this.performanceEvaluationRepository.create({
      ...createDto,
      employee,
      evaluator,
    });

    return this.performanceEvaluationRepository.save(evaluation);
  }

  async findAll() {
    return this.performanceEvaluationRepository.find({
      relations: ['employee', 'evaluator'],
    });
  }

  async findOne(id: number) {
    const evaluation = await this.performanceEvaluationRepository.findOne({
      where: { id },
      relations: ['employee', 'evaluator'],
    });

    if (!evaluation) {
      throw new NotFoundException(`Performance evaluation with ID ${id} not found`);
    }

    return evaluation;
  }

  async update(id: number, updateDto: UpdatePerformanceEvaluationDto) {
    const evaluation = await this.findOne(id);

    if (updateDto.employeeId) {
      const employee = await this.userRepository.findOne({ where: { id: updateDto.employeeId } });
      if (!employee) {
        throw new NotFoundException('Employee not found');
      }
      evaluation.employee = employee;
    }

    Object.assign(evaluation, updateDto);
    return this.performanceEvaluationRepository.save(evaluation);
  }

  async remove(id: number) {
    const evaluation = await this.findOne(id);
    return this.performanceEvaluationRepository.remove(evaluation);
  }

  async findByEmployee(employeeId: number) {
    return this.performanceEvaluationRepository.find({
      where: { employee: { id: employeeId } },
      relations: ['employee', 'evaluator'],
    });
  }
} 