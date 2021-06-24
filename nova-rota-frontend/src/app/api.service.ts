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
    console.log('api-service','token: ', token);
    if (token) {
      console.log(this.httpHeaders['headers'])
      this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `JWT ${token}`});
    }
  }

  // LOGIN
  login(usuario: any): Observable<any> {
    if (this.httpHeaders['Authorization']) {
      console.log('autorizado')
      this.router.navigate(['dashboard']);
    } else {
      console.log('nao autorizado')
      return this.http.post(this.baseUrl + 'login/', usuario, {
        headers: this.httpHeaders,
      });
    }
  }
  
  // CRIAR TITULAR
  saveNewTitular(titular: any): Observable<any> {
    return this.http.post(this.baseUrl + 'titular/', titular, {
      headers: this.httpHeaders,
    });
  }


  // CRIAR DEPENDNETE
  saveNewDependente(dependente: any): Observable<any> {
    return this.http.post(this.baseUrl + 'parentesco/', dependente, {
      headers: this.httpHeaders,
    });
  }

  // ATUALIZAR TITULAR
  updateTitular(titular: any): Observable<any> {
    let body = {
      CPF: titular.CPF,
      cod_empresa: titular.cod_empresa,
      data_recebimento: titular.data_recebimento,
      carteirinha: titular.carteirinha,
      tipo: titular.tipo,
      nome_benef: titular.nome_benef,
      data_nascimento: titular.data_nascimento,
      sexo: titular.sexo,
      estado_civil: titular.estado_civil,
      nome_mae: titular.nome_mae,
      data_admissao: titular.data_admissao,
      data_casamento: titular.data_casamento,
      tipo_parentesco: titular.tipo_parentesco,
      CEP: titular.CEP,
      celular: titular.celular,
      cidade: titular.cidade,
      estado: titular.estado,
      declaracao_saude: titular.declaracao_saude,
      status: titular.status,
      desc_declarao_saude: titular.desc_declarao_saude,
      observacoes: titular.observacoes,
    };
    return this.http.put(this.baseUrl + 'titular/' + titular.id + '/', body, {
      headers: this.httpHeaders,
    });
  }

  // ATUALIZAR DEPENDENTE
  updateDependente(dependente: any): Observable<any> {
    let body = {
      CPF: dependente.CPF,
      titular: dependente.titular,
      carteirinha: dependente.carteirinha,
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

  // TRAZENDO TITULARES

  getAlltitulares(): Observable<any> {
    console.log(this.httpHeaders)
    console.log('trazendo titulares')
    return this.http.get(this.baseUrl + 'titular/', {
      headers: this.httpHeaders,
    });
  }

  getTitular(id: string): Observable<any> {
    return this.http.get(this.baseUrl + 'titular/' + id + '/', {
      headers: this.httpHeaders,
    });
  }

  // TRAZENDO DEPENDENTES

  getAlldependentes(): Observable<any> {
    return this.http.get(this.baseUrl + 'parentesco/', {
      headers: this.httpHeaders,
    });
  }

  getDependente(id: string): Observable<any> {
    return this.http.get(this.baseUrl + 'parentesco/' + id + '/', {
      headers: this.httpHeaders,
    });
  }

  getDependenteTitular(id: string): Observable<any> {
    return this.http.get(this.baseUrl + 'titular/' + id + '/', {
      headers: this.httpHeaders,
    });
  }


  // TRAZENDO TAREFAS

  getAlltarefas(): Observable<any> {
    return this.http.get(this.baseUrl + 'tarefas/', {
      headers: this.httpHeaders,
    });
  }
  getTarefa(id: string): Observable<any> {
    return this.http.get(this.baseUrl + 'tarefas/' + id + '/', {
      headers: this.httpHeaders,
    });
  }

  saveNewTarefa(tarefa: {
    titulo: string;
    descricao: string;
    status_tarefa: any;
  }): Observable<any> {
    return this.http.post(this.baseUrl + 'tarefas/', tarefa, {
      headers: this.httpHeaders,
    });
  }

  // ATUALZIANDO TAREFAS

  updateTarefa(tarefa: {
    titulo?: string;
    descricao?: string;
    status_tarefa?: any;
    id?: number;
  }): Observable<any> {
    return this.http.put(this.baseUrl + 'tarefas/' + tarefa.id + '/', tarefa, {
      headers: this.httpHeaders,
    });
  }

  // DELETANDO TAREFAS

  deleteTarefa(id: string): Observable<any> {
    return this.http.delete(this.baseUrl + 'tarefas/' + id + '/', {
      headers: this.httpHeaders,
    });
  }
}
