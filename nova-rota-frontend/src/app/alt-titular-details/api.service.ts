import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl = 'http://localhost:8000/api/';
  httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  getTitular(id: string): Observable<any> {
    return this.http.get(this.baseUrl + 'titular/' + id + '/', {
      headers: this.httpHeaders,
    });
  }

  updateTitular(titular: any): Observable<any> {
    return this.http.put(
      this.baseUrl + 'titular/' + titular.id + '/',
      titular,
      {
        headers: this.httpHeaders,
      }
    );
  }
}
