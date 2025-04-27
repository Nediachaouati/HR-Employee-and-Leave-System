import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {
  private apiUrl = 'http://localhost:3000/demand/mydemands';


  constructor(private http: HttpClient) {}
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }
  getMyDemands(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl,{ headers: this.getAuthHeaders() });
  }
  createDemand(demand: any): Observable<any> {
    return this.http.post('http://localhost:3000/demand', demand,{ headers: this.getAuthHeaders() });;
  }
  
}
