import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticsServiceService {
  private apiUrl = 'http://localhost:3000/statistics';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getEmployeeStatistics(userId: number, year?: number): Observable<any> {
    const url = `${this.apiUrl}/employee/${userId}${year ? `?year=${year}` : ''}`;
    return this.http.get(url,{ headers: this.getAuthHeaders() });;
  }
  
}
