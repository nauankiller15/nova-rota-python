import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl = 'http://192.168.10.21:8000/api/';
  httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  getTitulares: any;

  constructor(private http: HttpClient) {}

  // TRAZENDO NOVIDADES
 
  getAllNovidades(): Observable<any> {
    return this.http.get(this.baseUrl + 'novidades/', {
      headers: this.httpHeaders,
    });
  }

  getNovidades(id: string): Observable<any> {
    return this.http.get(this.baseUrl + 'novidades/' + id + '/', {
      headers: this.httpHeaders,
    });
  }
}
