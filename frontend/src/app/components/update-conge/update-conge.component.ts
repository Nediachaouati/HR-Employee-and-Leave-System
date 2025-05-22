import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LeaveService } from '../../services/leave.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-conge',
  imports: [CommonModule,FormsModule],
  templateUrl: './update-conge.component.html',
  styleUrl: './update-conge.component.css'
})
export class UpdateCongeComponent implements OnInit {
  
    leaveRequest: any = {
      start_date: '',
      end_date: '',
      type: '',
      comments: '',
    };
    typeOptions: string[] = ['Congé payé', 'Congé maladie', 'Sans solde'];
    successMessage: string | null = null;
    errorMessage: string | null = null;
    demandId: number | null = null;
  
    constructor(
      private route: ActivatedRoute,
      private router: Router,
      private demandCongeService: LeaveService
    ) {}
  
    ngOnInit(): void {
      this.route.paramMap.subscribe((params) => {
        const id = params.get('id');
        if (id) {
          this.demandId = +id;
          this.loadDemand(this.demandId);
        } else {
          this.errorMessage = 'Invalid demand ID';
          this.router.navigate(['/leave-list']);
        }
      });
    }
  
    loadDemand(id: number): void {
      this.demandCongeService.getDemandById(id).subscribe({
        next: (demand) => {
          this.leaveRequest = { ...demand };
        },
        error: (error) => {
          this.errorMessage = error.message || 'Failed to load leave request';
          console.error('Error loading demand:', error);
        },
      });
    }
  
    onSubmit(): void {
      if (this.demandId) {
        const updateData: Partial<any> = {
          start_date: this.leaveRequest.start_date,
          end_date: this.leaveRequest.end_date,
          type: this.leaveRequest.type,
          comments: this.leaveRequest.comments,
        };
  
        this.demandCongeService.updateDemand(this.demandId, updateData).subscribe({
          next: (response) => {
            this.successMessage = 'Leave request updated successfully';
            this.errorMessage = null;
            setTimeout(() => {
              this.successMessage = null;
              this.router.navigate(['/demand-conge']);
            }, 2000);
          },
          error: (error) => {
            this.errorMessage = error.message || 'Failed to update leave request';
            this.successMessage = null;
            console.error('Error updating demand:', error);
          },
        });
      }
    }
  
    cancel(): void {
      this.router.navigate(['/demand-conge']);
    }
  }
