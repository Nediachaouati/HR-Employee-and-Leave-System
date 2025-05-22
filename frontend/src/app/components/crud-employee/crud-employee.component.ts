import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-crud-employee',
  imports: [CommonModule,RouterModule],
  templateUrl: './crud-employee.component.html',
  styleUrl: './crud-employee.component.css'
})
export class CrudEmployeeComponent implements OnInit {
  employees:any=[];
  successMessage: string | null = null;
  constructor( private userService:UserServiceService){}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.userService.getEmployees().subscribe({
      next: (data) => {
        this.employees = data;
      },
      error: (err) => {
        console.error('Error fetching employees:', err);
      }
    });
  }
deleteEmployee(id: number): void {
  if (confirm('Are you sure you want to delete this employee?')) {
    this.userService.deleteUser(id).subscribe({
      next: () => {
        console.log('Employee deleted:', id);
        this.successMessage = 'Employee deleted successfully!';
        this.loadEmployees(); // Refresh the list
        setTimeout(() => {
          this.successMessage = null;
        }, 3000); // Auto-dismiss after 3 seconds
      },
      error: (err) => {
        console.error('Error deleting employee:', err);
        // Optionally add error message
      }
    });
  }
}

  editEmployee(id: number): void {

  }
trackByEmployeeId(index: number, employee: any): number {
  return employee.id; // Use a unique identifier
}
}
