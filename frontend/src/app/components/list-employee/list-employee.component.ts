import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from '../../services/user-service.service';


@Component({
  selector: 'app-list-employee',
  imports: [CommonModule],
  templateUrl: './list-employee.component.html',
  styleUrl: './list-employee.component.css'
})
export class ListEmployeeComponent {
  employees: any[] = [];
  evaluations: any[] = [];
  constructor(private router: Router,private userServices:UserServiceService) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(){
    this.userServices.getEmployees().subscribe(
      (data) => {
        this.employees = data;
      },
      (error) => {
        console.error('Error fetching demands', error);
      }
    );
  }
  viewTimesheet(employeeId: number) {
    this.router.navigate(['/timesheet', employeeId]);
  }
  
  
  evaluateEmployee(employeeId: number): void {
    // Correct the navigation to pass the employeeId directly in the route array
    this.router.navigate(['/performance-evaluation', employeeId]);
  }

  viewEvaluations(employeeId: number) {
    // Navigate to the evaluations page with the employee ID
    this.router.navigate(['/evaluations', employeeId]);
  }
}

