import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'app-change-password',
  imports: [ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent{
  updatePasswordForm: FormGroup;
  currentUser: User | null = null;

  constructor(private userService: UserServiceService, private fb: FormBuilder) {
    this.updatePasswordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.userService.getProfile().subscribe({
      next: (user) => {
        this.currentUser = user;
      },
      error: (err) => {
        console.error('Failed to fetch user profile', err);
      }
    });
  }
    // Update the user's password

  logout(): void {
   
    localStorage.clear();
    alert('You have been logged out.');
    window.location.href = '/login'; 
  }

  stayOnPage(): void {
   
    alert('Redirecting to the home page.');
    window.location.href = '/'; 
  }
}


