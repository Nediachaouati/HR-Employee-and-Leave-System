import { Injectable } from '@nestjs/common';
import { CreateTimesheetDto } from './dto/create-timesheet.dto';
import { UpdateTimesheetDto } from './dto/update-timesheet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Timesheet, TimesheetStatus } from './entities/timesheet.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';


@Injectable()
export class TimesheetService {
  constructor(
    @InjectRepository(Timesheet)
    private timesheetRepository: Repository<Timesheet>,
  ) {}

  async create(createDto: CreateTimesheetDto, user: User) {
    const timesheet = this.timesheetRepository.create({
      ...createDto,
      createdBy:user,// validatedBy is RH
    });
    return this.timesheetRepository.save(timesheet);
  }
  async validate(id: number, user: User, action: 'validate' | 'reject') {
    const timesheet = await this.timesheetRepository.findOne({ where: { id } });

    if (!timesheet) {
      throw new Error('Timesheet not found');
    }

    // Only RH can validate or reject
    if (user.role !== 'RH') {
      throw new Error('Only RH can validate or reject the timesheet');
    }

    // Perform the action (validate or reject)
    if (action === 'validate') {
      timesheet.status = TimesheetStatus.VALIDATED;
    } else if (action === 'reject') {
      timesheet.status = TimesheetStatus.REJECTED;
    }

    // Set the validatedBy field to the RH user
    timesheet.validatedBy = user;

    // Save the updated timesheet
    return this.timesheetRepository.save(timesheet);
  }
  async getTimesheetsByEmployee(employeeId:number):Promise<Timesheet[]>{
    return this.timesheetRepository.find({
      where:{
        createdBy:{id:employeeId},
      },
    });

  }
  async getMyTimesheets(userId: number) {
    return this.timesheetRepository.find({
      where: { createdBy: { id: userId } },
      order: { date: 'DESC' }, // optional: newest first
    });
  }
  findAll() {
    return `This action returns all timesheet`;
  }
  async getAllTimesheets() {
    return this.timesheetRepository.find({
      relations: ['createdBy', 'validatedBy'], // optional: include related user data
      order: { date: 'DESC' }, // optional sorting
    });
  }
  
  findOne(id: number) {
    return `This action returns a #${id} timesheet`;
  }

  update(id: number, updateTimesheetDto: UpdateTimesheetDto) {
    return `This action updates a #${id} timesheet`;
  }

  remove(id: number) {
    return `This action removes a #${id} timesheet`;
  }
  async getTimesheetStats() {
    return await this.timesheetRepository
      .createQueryBuilder('timesheet')
      .select('timesheet.status', 'status')
      .addSelect('COUNT(*)', 'count')
      .groupBy('timesheet.status')
      .getRawMany();
  }
}
