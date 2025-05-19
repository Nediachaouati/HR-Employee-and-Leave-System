import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerformanceEvaluationService {
  private apiUrl = 'http://localhost:3000/performance-evaluation';
  constructor(private http: HttpClient) {}

  // Helper function to get the auth headers with token
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }
  createPerformanceEvaluation(evaluation:any): Observable<any> {
    return this.http.post(this.apiUrl, evaluation, { headers: this.getAuthHeaders() });
  }
  getEvaluationsForEmployee(employeeId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${employeeId}`,{ headers: this.getAuthHeaders() });
  }
  // getEvaluationsByEmployeeId(employeeId: number) {
  //   return this.http.get<any>(`http://localhost:3000/performance-evaluation/${employeeId}`,{ headers: this.getAuthHeaders() });
  // }
  getEvaluationsByEmployeeId(employeeId: number) {
    return this.http.get<any[]>(`http://localhost:3000/performance-evaluation/employee/${employeeId}`,{ headers: this.getAuthHeaders() });
  }
  getScoreStats(): Observable<any>{
return this.http.get<any[]>(`${this.apiUrl}/stats/score`,{ headers: this.getAuthHeaders() });
  }
  deleteEvaluation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`,{ headers: this.getAuthHeaders() });
  }
}
