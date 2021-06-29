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

  getEmpresa(id: string): Observable<any> {
    return this.http.get(this.baseUrl + 'empresa/' + id + '/', {
      headers: this.httpHeaders,
    });
  }
  updateEmpresa(empresa: any): Observable<any> {
    return this.http.put(
      this.baseUrl + 'empresa/' + empresa.id + '/',
      empresa,
      {
        headers: this.httpHeaders,
      }
    );
  }

  getAllEmpresas(): Observable<any> {
    return this.http.get(this.baseUrl + 'empresa/', {
      headers: this.httpHeaders,
    });
  }
}
