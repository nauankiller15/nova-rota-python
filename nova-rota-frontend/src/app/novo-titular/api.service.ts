import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl = 'http://localhost:8000/api/';
  httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  getTitulares: any;

  constructor(private http: HttpClient) {}

  // CRIAR TITULAR
  saveNewTitular(titular: any): Observable<any> {
    return this.http.post(this.baseUrl + 'titular/', titular, {
      headers: this.httpHeaders,
    });
  }
}
