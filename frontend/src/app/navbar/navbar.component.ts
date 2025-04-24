import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-navbar',
  standalone:true,
  imports: [CommonModule,RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  LOGO: string = 'https://upload.wikimedia.org/wikipedia/commons/2/2b/RH_logo.svg';
  logoUrl: string = 'https://upload.wikimedia.org/wikipedia/commons/2/2b/RH_logo.svg'; // Update the path to the rh.jpg image

  user: any ;
  dropdownOpen = false;
  constructor(public authService: AuthService,private router: Router,private userService:UserServiceService) {}
  ngOnInit() {
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
   goToProfile() {
    this.router.navigate(['/profile'], { state: { user: this.user } });
  }
  logout() {
    this.authService.logout();
  }


  // isAdmin(): boolean {
  //   return this.authService.getUserRole()=='ADMIN';
  // }
    isEmployee(): boolean {
    return this.authService.getUserRole()=='EMPLOYE';
  }
}


