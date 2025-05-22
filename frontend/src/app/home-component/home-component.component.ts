import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartOptions, ChartType } from 'chart.js';
import {NgChartsModule } from 'ng2-charts';
import { LeaveService } from '../services/leave.service';
import { TimesheetService } from '../services/timesheet.service';
import { PerformanceEvaluationService } from '../services/performance-evaluation.service';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { StatisticsServiceService } from '../services/statistics-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home-component',
  imports: [NgChartsModule,CommonModule],
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.css'
})
export class HomeComponentComponent implements OnInit {

  userId: number | null = null;
  statistics: any = null;
  isGeneralStatistics: boolean = true;
  year: number = 2025; // Default year, can be dynamic

  // General statistics data
  demandByTypeLabels: string[] = [];
  demandByTypeCounts: number[] = [];
  demandByMonthLabels: string[] = [];
  demandByMonthCounts: number[] = [];
  demandByStatusLabels: string[] = [];
  demandByStatusCounts: number[] = [];
  timesheetByStatusLabels: string[] = [];
  timesheetByStatusCounts: number[] = [];
  evaluationScoreLabels: string[] = [];
  evaluationScoreCounts: number[] = [];

  // Employee-specific statistics data
  leaveTypeLabels: string[] = [];
  leaveTypeCounts: number[] = [];
  leaveStatusLabels: string[] = [];
  leaveStatusCounts: number[] = [];
  timesheetStatsLabels: string[] = [];
  timesheetStatsCounts: number[] = [];
  performanceScoreLabels: string[] = [];
  performanceScoreCounts: number[] = [];

  constructor(
    private leaveService: LeaveService,
    private authService: AuthService,
    private timesheetService: TimesheetService,
    private evalService: PerformanceEvaluationService,
    private statisticsService: StatisticsServiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Remove sessionStorage reload logic unless critical
    sessionStorage.removeItem('reloaded');

    this.route.paramMap.subscribe((params) => {
      this.userId = params.get('userId') ? +params.get('userId')! : null;
      this.isGeneralStatistics = !this.userId;
      this.loadStatistics();
    });
  }

  loadStatistics(): void {
    if (this.isGeneralStatistics) {
      // Load general statistics
      this.loadDemandByType();
      this.loadDemandByMonth();
      this.loadDemandByStatus();
      this.loadTimesheetByStatus();
      this.loadEvaluationStatsByScore();
    } else if (this.userId) {
      // Load employee-specific statistics
      this.statisticsService.getEmployeeStatistics(this.userId, this.year).subscribe({
        next: (data) => {
          this.statistics = data;
          // Leave Type Chart
          this.leaveTypeLabels = ['Congé payé', 'Congé maladie', 'Sans solde'];
          this.leaveTypeCounts = [
            data.leaveStatistics.paidLeaves,
            data.leaveStatistics.sickLeaves,
            data.leaveStatistics.unpaidLeaves,
          ];
          // Leave Status Chart
          this.leaveStatusLabels = ['En attente', 'Approuvé', 'Rejeté'];
          this.leaveStatusCounts = [
            data.leaveStatistics.pendingLeaves,
            data.leaveStatistics.approvedLeaves,
            data.leaveStatistics.rejectedLeaves,
          ];
          // Timesheet Stats Chart
          this.timesheetStatsLabels = ['Total Hours', 'Validated Hours'];
          this.timesheetStatsCounts = [
            data.timesheetStatistics.totalHoursWorked,
            data.timesheetStatistics.validatedHours,
          ];
          // Performance Score Chart
          this.performanceScoreLabels = ['Avg Score'];
          this.performanceScoreCounts = [data.performanceStatistics.avgPerformanceScore];
        },
        error: (error) => {
          console.error('Error loading employee statistics:', error);
        },
      });
    }
  }

  loadDemandByType() {
    this.leaveService.getDemandsByType().subscribe((data) => {
      this.demandByTypeLabels = data.map((item: any) => item.type);
      this.demandByTypeCounts = data.map((item: any) => parseInt(item.count));
    });
  }

  loadDemandByMonth() {
    this.leaveService.getDemandsByMonth().subscribe((data) => {
      this.demandByMonthLabels = data.map((item: any) => 'Month ' + item.month);
      this.demandByMonthCounts = data.map((item: any) => parseInt(item.count));
    });
  }

  loadDemandByStatus() {
    this.leaveService.getDemandsByStatus().subscribe((data) => {
      this.demandByStatusLabels = data.map((item: any) => item.status);
      this.demandByStatusCounts = data.map((item: any) => parseInt(item.count));
    });
  }

  loadTimesheetByStatus() {
    this.timesheetService.getTimesheetStatsByStatus().subscribe((data) => {
      this.timesheetByStatusLabels = data.map((item: any) => item.status);
      this.timesheetByStatusCounts = data.map((item: any) => parseInt(item.count));
    });
  }

  loadEvaluationStatsByScore() {
    this.evalService.getScoreStats().subscribe((data) => {
      this.evaluationScoreLabels = data.map((item: any) => 'Score ' + item.score);
      this.evaluationScoreCounts = data.map((item: any) => +item.count);
    });
  }
  isEmployee(): boolean {
    return this.authService.getUserRole() === 'EMPLOYE';
  }

  isRH(): boolean {
    return this.authService.getUserRole() === 'RH';
  }

}