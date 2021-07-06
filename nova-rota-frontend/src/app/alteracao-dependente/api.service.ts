import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl = '';
  httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  getDependente(id: string): Observable<any> {
    return this.http
      .get(this.baseUrl + 'lista-parentesco/' + id + '/', {
        headers: this.httpHeaders,
      })
      .pipe(
        tap(() => {
          this._refreshNeeded$.next();
        })
      );
  }

  getTitular(id: string): Observable<any> {
    return this.http
      .get(this.baseUrl + 'titular/' + id + '/', {
        headers: this.httpHeaders,
      })
      .pipe(
        tap(() => {
          this._refreshNeeded$.next();
        })
      );
  }



  getAlltitulares(): Observable<any> {
    return this.http
      .get(this.baseUrl + 'titular/', {
        headers: this.httpHeaders,
      })
      .pipe(
        tap(() => {
          this._refreshNeeded$.next();
        })
      );
  }

  

  // ATUALIZAR DEPENDENTE
  updateDependente(dependente: any): Observable<any> {
    let body = {
      CPF: dependente.CPF,
      cod_empresa: dependente.cod_empresa,
      data_recebimento: dependente.data_recebimento,
      tipo: dependente.tipo,
      nome_dependente: dependente.nome_dependente,
      data_nascimento: dependente.data_nascimento,
      sexo: dependente.sexo,
      estado_civil: dependente.estado_civil,
      nome_mae: dependente.nome_mae,
      data_admissao: dependente.data_admissao,
      data_casamento: dependente.data_casamento,
      tipo_parentesco: dependente.tipo_parentesco,
      CEP: dependente.CEP,
      celular: dependente.celular,
      cidade: dependente.cidade,
      estado: dependente.estado,
      declaracao_saude: dependente.declaracao_saude,
      status: dependente.status,
      desc_declarao_saude: dependente.desc_declarao_saude,
      observacoes: dependente.observacoes,
    };
    return this.http.put(
      this.baseUrl + 'parentesco/' + dependente.id + '/',
      body,
      {
        headers: this.httpHeaders,
      }
    );
  }
}
