import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'app-add-employee',
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent {
  employee = {
    name: '',
    email: '',
    password: ''
  };
  showPassword = false;

  constructor(private employeeService: UserServiceService, private router: Router) {}

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(form: NgForm): void {
    this.employeeService.addemployee(this.employee).subscribe({
      next: (response) => {
        console.log('Employee added:', response);
        this.router.navigate(['/employees']);
      },
      error: (err) => {
        console.error('Error adding employee:', err);
        // Optionally display error to user (e.g., alert or UI message)
      }
    });
    form.resetForm();
    this.employee = { name: '', email: '', password: '' };
  }

  resetForm(form: NgForm): void {
    form.resetForm();
    this.employee = { name: '', email: '', password: '' };
    this.showPassword = false;
  }
}
