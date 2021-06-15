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
  saveNewEmpresa(empresa: any): Observable<any> {
    return this.http.post(this.baseUrl + 'empresa/', empresa, {
      headers: this.httpHeaders,
    });
  }
}
