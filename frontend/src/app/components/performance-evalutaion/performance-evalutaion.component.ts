import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
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
  employee: any;
  evaluation = {
    employeeId: null as number | null,
    evaluationPeriod: 'ANNUAL',
    evaluationYear: new Date().getFullYear(),
    overallScore: 0,
    comments: '',
    month: null, // New property for month
  };
  evaluationSubmitted = false;
  errorMessage: string | null = null; // Add errorMessage property

  constructor(
    private route: ActivatedRoute,
    private performanceEvaluationService: PerformanceEvaluationService,
    private router: Router,
    private usersService: UserServiceService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const employeeId = params.get('employeeId');
      if (employeeId) {
        this.evaluation.employeeId = +employeeId;

        // Fetch and store employee object
        this.usersService.getUserById(employeeId).subscribe({
          next: (data) => {
            this.employee = data;
          },
          error: (err) => {
            console.error('Error fetching employee:', err);
            this.router.navigate(['/employees']);
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
    this.errorMessage = null; // Clear previous error message
    this.evaluationSubmitted = false; // Reset success message
    if (this.evaluation.evaluationPeriod === 'MONTHLY' && !this.evaluation.month) {
      this.errorMessage = 'Please select a month for monthly evaluation';
      return;
    }
    const evaluationData = {
      employeeId: this.employee.id,
      evaluationPeriod: this.evaluation.evaluationPeriod,
      evaluationYear: this.evaluation.evaluationYear,
      month: this.evaluation.evaluationPeriod === 'MONTHLY' ? this.evaluation.month : null,
      overallScore: this.evaluation.overallScore,
      comments: this.evaluation.comments,
    };
    this.performanceEvaluationService.createPerformanceEvaluation(this.evaluation).subscribe({
      next: (response) => {
        this.evaluationSubmitted = true;
        this.errorMessage = null; // Clear error on success
        this.evaluation = {
          employeeId: this.evaluation.employeeId,
          evaluationPeriod: 'ANNUAL',
          evaluationYear: new Date().getFullYear(),
          overallScore: 0,
          comments: '',
          month: null,
        }; // Reset form
        console.log('Evaluation submitted successfully:', response);
      },
      error: (error) => {
        console.error('Error submitting evaluation:', error);
        if (isPlatformBrowser(this.platformId)) {
          this.errorMessage = error.error?.message || 'Failed to submit evaluation. Please try again.';
        }
      }
    });
  }
  months: { value: number; label: string }[] = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' },
  ];
  onPeriodChange(): void {
    if (this.evaluation.evaluationPeriod !== 'MONTHLY') {
      this.evaluation.month = null;
    }
  }
}