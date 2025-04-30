import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PerformanceEvaluationService } from '../../services/performance-evaluation.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-evaluations-one-employee',
  imports: [CommonModule],
  templateUrl: './evaluations-one-employee.component.html',
  styleUrl: './evaluations-one-employee.component.css'
})
export class EvaluationsOneEmployeeComponent implements OnInit {
  employeeId!: number;
  evaluations: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private evaluationService: PerformanceEvaluationService
  ) {}

  ngOnInit(): void {
    this.employeeId = +this.route.snapshot.paramMap.get('id')!;
    this.getEvaluations();
  }

  getEvaluations(): void {
    this.evaluationService.getEvaluationsByEmployeeId(this.employeeId)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.evaluations = Array.isArray(data) ? data : [data]; // If API returns ONE or LIST
        },
        error: (error) => {
          console.error('Error fetching evaluations:', error);
        }
      });
  }
  
}