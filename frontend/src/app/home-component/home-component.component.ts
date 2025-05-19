import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartOptions, ChartType } from 'chart.js';
import {NgChartsModule } from 'ng2-charts';
import { LeaveService } from '../services/leave.service';
import { TimesheetService } from '../services/timesheet.service';
import { PerformanceEvaluationService } from '../services/performance-evaluation.service';

@Component({
  selector: 'app-home-component',
  imports: [NgChartsModule],
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.css'
})
export class HomeComponentComponent implements OnInit {

  demandByTypeLabels: string[] = [];
  demandByTypeCounts: number[] = [];

  demandByMonthLabels: string[] = [];
  demandByMonthCounts: number[] = [];

  demandByStatusLabels: string[] = [];
  demandByStatusCounts: number[] = [];

  timesheetByStatusLabels: string[] = [];
  timesheetByStatusCounts: number[] = [];

  timesheetByMonthLabels: string[] = [];
  timesheetByMonthCounts: number[] = [];

  evaluationScoreLabels: string[] = [];
  evaluationScoreCounts: number[] = [];
  constructor(private leaveService: LeaveService,private timesheetsService:TimesheetService,private evalService:PerformanceEvaluationService) {
    
  }

  ngOnInit(): void {
    if (!sessionStorage.getItem('reloaded')) {
      sessionStorage.setItem('reloaded', 'true');
      location.reload();
    }
    this.loadDemandByType();
    this.loadDemandByMonth();
    this.loadDemandByStatus();
    this.loadTimesheetByStatus();
    this.loadEvaluationStatsByScore();


  }
  loadEvaluationStatsByScore() {
    this.evalService.getScoreStats().subscribe(data => {
      this.evaluationScoreLabels = data.map((item: any) => 'Score ' + item.score);
      this.evaluationScoreCounts = data.map((item: any) => +item.count);
    });
  }
  loadDemandByType() {
    this.leaveService.getDemandsByType().subscribe(data => {
      this.demandByTypeLabels = data.map((item: any) => item.type);
      this.demandByTypeCounts = data.map((item: any) => parseInt(item.count));
    });
  }

  loadDemandByMonth() {
    this.leaveService.getDemandsByMonth().subscribe(data => {
      this.demandByMonthLabels = data.map((item: any) => 'Month ' + item.month);
      this.demandByMonthCounts = data.map((item: any) => parseInt(item.count));
    });
  }

  loadDemandByStatus() {
    this.leaveService.getDemandsByStatus().subscribe(data => {
      this.demandByStatusLabels = data.map((item: any) => item.status);
      this.demandByStatusCounts = data.map((item: any) => parseInt(item.count));
    });
  }
   loadTimesheetByStatus() {
    this.timesheetsService.getTimesheetStatsByStatus().subscribe((data) => {
      this.timesheetByStatusLabels = data.map((item: any) => item.status);
      this.timesheetByStatusCounts = data.map((item: any) => parseInt(item.count));
    });
  }


}