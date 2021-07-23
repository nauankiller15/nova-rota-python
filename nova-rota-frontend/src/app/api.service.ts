import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl = '//127.0.0.1:8000/api/';
  httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor( private http: HttpClient) { }

  listar(apiUrl): Observable<any> {
    return this.http.get(this.baseUrl + apiUrl, {
      headers: this.httpHeaders,
    });
  }

  selecionar(apiUrl, pk): Observable<any> {
    return this.http.get(this.baseUrl + apiUrl + pk + '/', {
      headers: this.httpHeaders,
    });
  }

  inserir(apiUrl:string, dados:any): Observable<any> {
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
