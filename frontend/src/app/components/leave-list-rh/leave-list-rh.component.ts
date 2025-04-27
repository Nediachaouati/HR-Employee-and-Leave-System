import { Component } from '@angular/core';
import { LeaveService } from '../../services/leave.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-leave-list-rh',
  imports: [CommonModule],
  templateUrl: './leave-list-rh.component.html',
  styleUrl: './leave-list-rh.component.css'
})
export class LeaveListRhComponent {
  demandes: any[] = [];

  constructor(private leaveService: LeaveService) {}

  ngOnInit(): void {
   this.fetchDemands();
  }

  fetchDemands(){
    this.leaveService.getAllDemands().subscribe(
      (data) => {
        this.demandes = data;
      },
      (error) => {
        console.error('Error fetching demands', error);
      }
    );
  }
  selectedDemandId: number | null = null; // Store only the id
  updateStatus(demandId: number, newStatus: 'Approuvé' | 'Rejeté'): void {
    this.leaveService.updateDemandStatus(demandId, newStatus).subscribe({
      next: () => {
        alert('Status updated successfully!');
        this.fetchDemands(); // Refresh the list after update
      },
      error: (err) => {
        console.error(err);
        alert('Error updating status');
      }
    });
  }
  toggleDetails(demandId: number): void {
    if (this.selectedDemandId === demandId) {
      this.selectedDemandId = null; // Hide details
    } else {
      this.selectedDemandId = demandId; // Show clicked demand
    }
  }
}