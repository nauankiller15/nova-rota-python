import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  private readonly baseUrl = environment.baseUrl;

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

  inserirComArquivo(apiUrl:string, dados:any): Observable<any> {
    let formData = new FormData();

    for (let campo in dados) {
      if (dados[campo]) {
        formData.append(campo, dados[campo]);
      }
    };

    return this.http.post(this.baseUrl + apiUrl, formData);
  }

  atualizarComArquivo(apiUrl, dados): Observable<any> {
    let formData = new FormData();

    for (let campo in dados) {
      if (dados[campo]) {
        formData.append(campo, dados[campo]);
      }
    };

    return this.http.put(this.baseUrl + apiUrl + dados.id + '/', formData);
  }

  atualizarCampo(apiUrl, dados): Observable<any> {

    return this.http.patch(this.baseUrl + apiUrl + dados.id + '/', dados, {
      headers: this.httpHeaders,
    });
  }
}
