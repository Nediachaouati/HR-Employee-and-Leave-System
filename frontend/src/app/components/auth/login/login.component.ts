import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

  user:any = {
    email: '',
    password: ''
  };

  login() {
    this.authService.login(this.user.email, this.user.password).subscribe({
      next: (response: any) => {
        console.log('login successful', response);
        const { access_token: token, role: userRole } = response;

        this.authService.saveToken(token);

        const redirectRoute = userRole === 'RH' ? '/home' : '/list-leave';
        this.router.navigate([redirectRoute]).then(() => {
          window.location.reload();
        });
      },
      error: (error) => {
        console.error('Login error', error);
        alert('Login failed. Please check your credentials and try again.');
      }
    });
  }

}
