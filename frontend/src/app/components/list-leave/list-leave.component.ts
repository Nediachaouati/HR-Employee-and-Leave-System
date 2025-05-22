import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { LeaveService } from '../../services/leave.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-leave',
  imports: [CommonModule],
  templateUrl: './list-leave.component.html',
  styleUrl: './list-leave.component.css'
})
export class ListLeaveComponent {
  demandes: any[] = [];
  successMessage: string | null = null;

  constructor(private leaveService: LeaveService,private router:Router,private http:HttpClient) {}

  ngOnInit(): void {
   this.fetchDemands();
  }

  fetchDemands(){
    this.leaveService.getMyDemands().subscribe(
      (data) => {
        this.demandes = data;
      },
      (error) => {
        console.error('Error fetching demands', error);
      }
    );
  }
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }
  async deleteleave(id: number): Promise<void> {
    try {
      await this.http.delete(`http://localhost:3000/demand/${id}`,{ headers: this.getAuthHeaders() }).toPromise();
      this.demandes = this.demandes.filter((demand) => demand.id !== id);
      this.successMessage = 'Leave demand deleted successfully';
      setTimeout(() => (this.successMessage = null), 3000);
    } catch (error) {
      console.error('Error deleting leave demand:', error);
      this.successMessage = 'Failed to delete leave demand';
    }
  }
  
    editEmployee(id: number): void {
  
    }
    editRequest(id: number): void {
      this.router.navigate(['/update-conge', id]);
    }
  updateStatus(demandId: number, newStatus: 'Approuvé' | 'Rejeté'): void {
    this.leaveService.updateDemandStatus(demandId, newStatus).subscribe({
      next: () => {
        alert('Status updated successfully!');
        this.fetchDemands(); 
      },
      error: (err) => {
        console.error(err);
        alert('Error updating status');
      }
    });
  }
  
}
