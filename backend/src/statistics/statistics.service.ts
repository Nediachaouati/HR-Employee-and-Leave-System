import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DemandConge } from 'src/demand-conge/entities/demand-conge.entity';
import { PerformanceEvaluation } from 'src/performance-evaluation/performance-evaluation.entity';
import { Timesheet } from 'src/timesheet/entities/timesheet.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
@Injectable()
export class StatisticsService {
    constructor(
        @InjectRepository(DemandConge)
        private demandCongeRepository: Repository<DemandConge>,
        @InjectRepository(Timesheet)
        private timesheetRepository: Repository<Timesheet>,
        @InjectRepository(PerformanceEvaluation)
        private performanceEvaluationRepository: Repository<PerformanceEvaluation>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
      ) {}
    
      async getEmployeeStatistics(userId: number, year?: number) {
        // Fetch the user
        const employee = await this.userRepository.findOne({ where: { id: userId } });
        if (!employee) {
          throw new NotFoundException(`User with ID ${userId} not found`);
        }
    
        // Leave Statistics
        const leaveQuery = this.demandCongeRepository
          .createQueryBuilder('demand')
          .select([
            'COUNT(*) as totalLeaves',
            `SUM(CASE WHEN demand.type = 'Congé payé' THEN 1 ELSE 0 END) as paidLeaves`,
            `SUM(CASE WHEN demand.type = 'Congé maladie' THEN 1 ELSE 0 END) as sickLeaves`,
            `SUM(CASE WHEN demand.type = 'Sans solde' THEN 1 ELSE 0 END) as unpaidLeaves`,
            `SUM(CASE WHEN demand.status = 'En attente' THEN 1 ELSE 0 END) as pendingLeaves`,
            `SUM(CASE WHEN demand.status = 'Approuvé' THEN 1 ELSE 0 END) as approvedLeaves`,
            `SUM(CASE WHEN demand.status = 'Rejeté' THEN 1 ELSE 0 END) as rejectedLeaves`,
            `SUM(DATEDIFF(demand.end_date, demand.start_date) + 1) as totalLeaveDays`,
          ])
          .where('demand.userId = :userId', { userId })
          .andWhere('demand.deleted_at IS NULL');
    
        if (year) {
          leaveQuery.andWhere('YEAR(demand.start_date) = :year', { year });
        }
    
        const leaveStats = await leaveQuery.getRawOne();
    
        // Timesheet Statistics
        const timesheetQuery = this.timesheetRepository
          .createQueryBuilder('timesheet')
          .select([
            'SUM(timesheet.hoursWorked) as totalHoursWorked',
            'AVG(timesheet.hoursWorked) as avgHoursWorked',
            `SUM(CASE WHEN timesheet.status = 'VALIDATED' THEN timesheet.hoursWorked ELSE 0 END) as validatedHours`,
          ])
          .where('timesheet.createdBy = :userId', { userId });
    
        if (year) {
          timesheetQuery.andWhere('YEAR(timesheet.date) = :year', { year });
        }
    
        const timesheetStats = await timesheetQuery.getRawOne();
    
        // Performance Evaluation Statistics
        const performanceQuery = this.performanceEvaluationRepository
          .createQueryBuilder('performance')
          .select(['AVG(performance.overallScore) as avgPerformanceScore'])
          .where('performance.employeeId = :userId', { userId });
    
        if (year) {
          performanceQuery.andWhere('performance.evaluationYear = :year', { year });
        }
    
        const performanceStats = await performanceQuery.getRawOne();
    
        return {
          employeeId: employee.id,
          employeeName: employee.name,
          leaveStatistics: {
            totalLeaves: parseInt(leaveStats.totalLeaves) || 0,
            paidLeaves: parseInt(leaveStats.paidLeaves) || 0,
            sickLeaves: parseInt(leaveStats.sickLeaves) || 0,
            unpaidLeaves: parseInt(leaveStats.unpaidLeaves) || 0,
            pendingLeaves: parseInt(leaveStats.pendingLeaves) || 0,
            approvedLeaves: parseInt(leaveStats.approvedLeaves) || 0,
            rejectedLeaves: parseInt(leaveStats.rejectedLeaves) || 0,
            totalLeaveDays: parseInt(leaveStats.totalLeaveDays) || 0,
          },
          timesheetStatistics: {
            totalHoursWorked: parseFloat(timesheetStats.totalHoursWorked) || 0,
            avgHoursWorked: parseFloat(timesheetStats.avgHoursWorked) || 0,
            validatedHours: parseFloat(timesheetStats.validatedHours) || 0,
          },
          performanceStatistics: {
            avgPerformanceScore: parseFloat(performanceStats.avgPerformanceScore) || 0,
          },
        };
      }
    }