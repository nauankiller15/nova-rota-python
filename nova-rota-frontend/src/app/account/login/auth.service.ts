import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { Login } from './models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private baseUrl = '//127.0.0.1:8000/api/';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json'});
  
  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) {}
  
  async autenticar(usuario: Login) {
    const resp = await this.http.post(this.baseUrl + 'login/', usuario, {
      headers: this.httpHeaders,
    }).toPromise();
    
    if (resp && resp['token']) {
      localStorage.setItem('token', resp['token']);
      return true;
    }
    return false;
  }

  autenticado() {
    const token = this.getAuthorizationToken();
    
    if (token) {
      const expirado = this.tokenExpirado(token);
      if (!expirado) {
        return true;
      } else {
        localStorage.removeItem('token');
      }
    }
    localStorage.removeItem('token');
    return false;
  }

  getAuthorizationToken() {
    const token = localStorage.getItem('token');
    return token;
  }

  tokenExpirado(token: string) {
    const tokenDecode = jwtDecode(token);
    
    if (tokenDecode['exp']) {
      const expiracao = tokenDecode['exp']
      const dataExpiracao = new Date(0);
      dataExpiracao.setUTCSeconds(expiracao);

      if ( dataExpiracao.valueOf() < new Date().valueOf()) {
        return true;
      } else {
        return false
      }
    }
  }

  getUserId() {
    const token = this.getAuthorizationToken()
    const tokenDecode = jwtDecode(token);

    return tokenDecode['user_id']
  }
}
