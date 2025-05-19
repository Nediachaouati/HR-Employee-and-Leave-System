import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

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

  getDemandsByStatus(): Observable<any> {
    return this.http.get(`${this.apiUrl}/stats/status`,{ headers: this.getAuthHeaders() });
  }
  
  
}
