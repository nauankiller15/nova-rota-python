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
  
  getTarefa(id: string | number): Observable<any> {
    return this.http.get(this.baseUrl + 'tarefas/' + id + '/', {
      headers: this.httpHeaders,
    });
  }

  updateTarefa(tarefa: {
    titulo?: string;
    descricao?: string;
    feito?: string;
    id?: any;
  }): Observable<any> {
    return this.http.put(this.baseUrl + 'tarefas/' + tarefa.id + '/', tarefa, {
      headers: this.httpHeaders,
    });
  }

  deleteTarefa(id: string): Observable<any> {
    return this.http.delete(this.baseUrl + 'tarefas/' + id + '/', {
      headers: this.httpHeaders,
    });
  }
}
