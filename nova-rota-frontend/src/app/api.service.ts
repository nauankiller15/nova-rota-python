import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router, ɵangular_packages_router_router_n } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl = 'http://localhost:8000/api/';
  httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private router: Router, private http: HttpClient) {
    
    const token = localStorage.getItem('token');
    if (token) {
      this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `JWT ${token}`});
    }
  }

  listar(apiUrl): Observable<any> {
    return this.http.get(this.baseUrl + apiUrl, {
      headers: this.httpHeaders,
    });
  }

  selecionar(apiUrl, pk): Observable<any> {
    return this.http.post(this.baseUrl + apiUrl + pk, {
      headers: this.httpHeaders,
    });
  }

  inserir(apiUrl, dados): Observable<any> {
    return this.http.post(this.baseUrl + apiUrl, dados, {
      headers: this.httpHeaders,
    });
  }

  atualizar(apiUrl, dados): Observable<any> {
    return this.http.put(this.baseUrl + apiUrl + dados.id + '/', dados, {
      headers: this.httpHeaders,
    });
  }

  apagar(apiUrl, pk): Observable<any> {
    return this.http.delete(this.baseUrl + apiUrl + pk + '/', {
      headers: this.httpHeaders,
    });
  }
}
