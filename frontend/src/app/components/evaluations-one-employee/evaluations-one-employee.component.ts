import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PerformanceEvaluationService } from '../../services/performance-evaluation.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';

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
    private evaluationService: PerformanceEvaluationService,
    @Inject(PLATFORM_ID) private platformId: Object

  ) {
    
  }

  ngOnInit(): void {
    this.employeeId = +this.route.snapshot.paramMap.get('id')!;
    this.getEvaluations();
  }

  deleteEvaluation(id: number): void {
    if (isPlatformBrowser(this.platformId) && confirm('Are you sure you want to delete this evaluation?')) {
      this.evaluationService.deleteEvaluation(id).subscribe({
        next: () => {
          this.evaluations = this.evaluations.filter((e) => e.id !== id);
          if (isPlatformBrowser(this.platformId)) {
            alert('Evaluation deleted successfully');
          }
        },
        error: (err) => {
          console.error('Error deleting evaluation:', err);
          if (isPlatformBrowser(this.platformId)) {
            alert('Failed to delete evaluation');
          }
        },
      });
    }
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