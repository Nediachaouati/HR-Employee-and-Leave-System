import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserServiceService } from '../services/user-service.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  LOGO: string = 'https://upload.wikimedia.org/wikipedia/commons/2/2b/RH_logo.svg';
  logoUrl: string = 'https://upload.wikimedia.org/wikipedia/commons/2/2b/RH_logo.svg';
  pendingLeaveCount = 0;
  user: any;
  dropdownOpen = false;
  isNavbarCollapsed = true;
  userDropdownOpen = false;
  showNotifications = false;
  notifications: Notification[] = [];
  unreadNotificationCount = 0;

  constructor(
    public authService: AuthService,
    private router: Router,
    private userService: UserServiceService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.userService.getProfile().subscribe({
      next: (user) => {
        this.user = user;
        console.log('User data:', this.user);
        if (this.isEmployee() && this.authService.isLoggedIn()) {
          this.fetchNotifications();
        }
      },
      error: (err) => {
        console.error('Failed to fetch user profile', err);
      }
    });
  }
  markAsRead(notificationId: number): void {
    this.notificationService.markAsRead(notificationId).subscribe({
      next: (updatedNotification) => {
        const notification = this.notifications.find((n) => n.id === notificationId);
        if (notification) {
          notification.read = true; 
        }
      },
      error: (err) => {
        console.error('Error marking notification as read:', err); 
      },
    });
  }

  fetchNotifications() {
    this.notificationService.getNotifications().subscribe({
      next: (notifications) => {
        console.log('Notifications:', notifications);
        this.notifications = notifications;
        this.unreadNotificationCount = notifications.filter(n => !n.read).length;
      },
      error: (err) => {
        console.error('Failed to fetch notifications:', err);
      }
    });
  }

  toggleUserDropdown() {
    this.userDropdownOpen = !this.userDropdownOpen;
  }

  toggleNotifications(event: Event) {
    event.preventDefault();
    this.showNotifications = !this.showNotifications;
  }

  goToProfile() {
    this.router.navigate(['/profile'], { state: { user: this.user } });
  }

  logout() {
    this.authService.logout();
  }

  isEmployee(): boolean {
    return this.authService.getUserRole() === 'EMPLOYE';
  }

  isRH(): boolean {
    return this.authService.getUserRole() === 'RH';
  }
}

interface Notification {
  id: number;
  message: string;
  read: boolean;
  userId: number;
  demandId: number;
  created_at: string;
}
