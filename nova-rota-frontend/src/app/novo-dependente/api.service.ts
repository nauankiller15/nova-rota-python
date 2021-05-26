import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl = 'http://localhost:8000/api/';
  httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  getDependente: any;

  constructor(private http: HttpClient) {}

  // CRIAR TITULAR
  saveNewDependente(dependente: any): Observable<any> {
    return this.http.post(this.baseUrl + 'parentesco/', dependente, {
      headers: this.httpHeaders,
    });
  }

  getTitular(id: string): Observable<any> {
    return this.http.get(this.baseUrl + 'titular/' + id + '/', {
      headers: this.httpHeaders,
    });
  }
  
  getAlltitulares(): Observable<any> {
    return this.http.get(this.baseUrl + 'titular/', {
      headers: this.httpHeaders,
    });
  }
}
