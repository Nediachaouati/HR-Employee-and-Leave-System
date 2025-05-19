import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private apiUrl = 'http://localhost:3000/notification';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }
  getNotifications(): Observable<Notification[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`
    });
    return this.http.get<Notification[]>(this.apiUrl, { headers });
  }
  markAsRead(notificationId: number): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/${notificationId}/read`,
      {}, 
      { headers: this.getAuthHeaders() } 
    );
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
