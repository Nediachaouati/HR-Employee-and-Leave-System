import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {
  private apiUrl = 'http://localhost:3000/timesheet';

  constructor(private http:HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  addTimesheet(timesheet:any):Observable<any>{
    return this.http.post(this.apiUrl,timesheet, { headers: this.getAuthHeaders() });
  }
  getTimesheetsByEmployee(employeeId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/employee/${employeeId}`, { headers: this.getAuthHeaders() });
  }
  changeStat(employeeId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${employeeId}/validate`, { headers: this.getAuthHeaders() });
  }
  validateTimesheet(id: number, action: 'validate' | 'reject') {
    return this.http.patch(`http://localhost:3000/timesheet/${id}/validate`, { action }, { headers: this.getAuthHeaders() });
  }
  getTimesheetStatsByStatus(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/timesheet/stats/status', { headers: this.getAuthHeaders() });
  }
  
}
