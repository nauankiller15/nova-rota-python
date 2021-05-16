import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl = 'http://localhost:8000/api/';
  httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  getAlltarefas(): Observable<any> {
    return this.http.get(this.baseUrl + 'tarefas/', {
      headers: this.httpHeaders,
    });
  }
  getTarefa(id): Observable<any> {
    return this.http.get(this.baseUrl + 'tarefas/' + id + '/', {
      headers: this.httpHeaders,
    });
  }
}
