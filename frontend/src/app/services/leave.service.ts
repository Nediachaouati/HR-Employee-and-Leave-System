import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { UpdateCongeComponent } from '../components/update-conge/update-conge.component';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {
  private apiUrl = 'http://localhost:3000/demand';


  constructor(private http: HttpClient) {}
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }
  getMyDemands(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/mydemands`,{ headers: this.getAuthHeaders() });
  }
  createDemand(demand: any): Observable<any> {
    return this.http.post('http://localhost:3000/demand', demand,{ headers: this.getAuthHeaders() });
  }
  updateDemandStatus(demandId: number, newStatus: 'Approuvé' | 'Rejeté') {
    return this.http.put(`http://localhost:3000/demand/${demandId}/status`, { status: newStatus },{ headers: this.getAuthHeaders() });
  }
  getAllDemands(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/demand',{ headers: this.getAuthHeaders() });
  }
  getDemandsByType(): Observable<any> {
    return this.http.get(`${this.apiUrl}/stats/type`,{ headers: this.getAuthHeaders() });
  }
  getDemandsByMonth(): Observable<any> {
    return this.http.get(`${this.apiUrl}/stats/monthly`,{ headers: this.getAuthHeaders() });
  }
  updateDemand(id: number, demand: Partial<any>): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, demand, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred. Please try again.';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      errorMessage = error.error.message || `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
  getDemandById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() }).pipe(catchError(this.handleError));
  }
  getDemandsByStatus(): Observable<any> {
    return this.http.get(`${this.apiUrl}/stats/status`,{ headers: this.getAuthHeaders() });
  }
  getLeaveRequests(type?: string, status?: string): Observable<any[]> {
    let url = `${this.apiUrl}/filter`;
    if (type || status) {
      const params: string[] = [];
      if (type) params.push(`type=${encodeURIComponent(type)}`);
      if (status) params.push(`status=${encodeURIComponent(status)}`);
      url += `?${params.join('&')}`;
    }
    return this.http.get<any[]>(url, { headers: this.getAuthHeaders() });
  }

  getLeaveRequest(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  updateLeaveRequest(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data, { headers: this.getAuthHeaders() });
  }
  deleteleave(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}
