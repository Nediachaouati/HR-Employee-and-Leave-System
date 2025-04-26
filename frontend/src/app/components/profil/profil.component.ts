import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserServiceService } from '../../services/user-service.service';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-profil',
  imports: [
    CommonModule,
    FormsModule, 
    RouterModule
  ],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent  implements OnInit {
  user: User = {
    id: 0,                 // Default value for id
    name: '',              // Default empty value for name
    email: '',             // Default empty value for email
    photo: '',             // Default empty value for photo
    role: 'EMPLOYE',              // Default empty value for role
    created_at: new Date(), // Default current date for created_at
    updated_at: new Date()  // Default current date for updated_at
  };
  isEditing: boolean = true;
  loading: boolean = true;

  constructor(private authService: AuthService, private router: Router, private http: HttpClient, private userService: UserServiceService) {}

  ngOnInit(): void {
    this.userService.getProfile().subscribe({
      next: (user) => {
        this.user = user;
        console.log('User data:', this.user); // Check if all fields are populated
      },
      error: (err) => {
        console.error('Failed to fetch user profile', err);
      }
    });

  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing; 
    console.log('Edit mode:', this.isEditing);
  }

  updateProfile(profileForm: any): void {
    if (profileForm.valid && this.user) {
      const { password, ...userWithoutPassword } = this.user; // Exclude password
      console.log('Payload being sent:', userWithoutPassword);
      
      this.userService.updateProfile(userWithoutPassword).subscribe({
        next: (updatedUser) => {
          console.log('Profile updated successfully:', updatedUser);
          alert('Profile updated successfully!');
          this.isEditing = true;
        },
        error: (err) => {
          console.error('Error updating profile:', err);
          alert('Failed to update profile. Please try again.');
        }
      });
    }
  }


}
