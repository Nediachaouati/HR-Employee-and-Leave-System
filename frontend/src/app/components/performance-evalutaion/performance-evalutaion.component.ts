import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PerformanceEvaluationService } from '../../services/performance-evaluation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'app-performance-evalutaion',
  imports: [CommonModule,FormsModule],
  templateUrl: './performance-evalutaion.component.html',
  styleUrl: './performance-evalutaion.component.css'
})
export class PerformanceEvalutaionComponent implements OnInit {
  stars: number[] = [1, 2, 3, 4, 5]; // 5 stars
employee:any;
  evaluation = {
    employeeId: null as number | null,
    evaluationPeriod: 'ANNUAL',
    evaluationYear: new Date().getFullYear(),
    overallScore: 0, // 👈 make sure it's number, not null
    comments: ''
  };
  evaluationSubmitted = false;

  constructor(
    private route: ActivatedRoute,
    private performanceEvaluationService: PerformanceEvaluationService,
    private router: Router,
    private usersService:UserServiceService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const employeeId = params.get('employeeId');
      if (employeeId) {
        this.evaluation.employeeId = +employeeId;
  
        // Fetch and store employee object
        this.usersService.getUserById(employeeId).subscribe({
          next: (data) => {
            this.employee = data; // 👈 Store the full employee object
          },
          error: (err) => {
            console.error('Error fetching employee:', err);
          }
        });
      } else {
        this.router.navigate(['/employees']);
      }
    });
  }
  

  setScore(score: number): void {
    this.evaluation.overallScore = score;
  }
  submitEvaluation(): void {
    this.performanceEvaluationService.createPerformanceEvaluation(this.evaluation)
      .subscribe({
        next: (response) => {
          this.evaluationSubmitted = true;
          console.log('Evaluation submitted successfully:', response);
        },
        error: (error) => {
          console.error('Error submitting evaluation:', error);
        }
      });
  }
}