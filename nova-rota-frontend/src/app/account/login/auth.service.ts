import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Login, User } from './models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private baseUrl = 'http://localhost:8000/api/';
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
      }
    }
    
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

  getUser() {
    const token = this.getAuthorizationToken()
    const tokenDecode = jwtDecode(token);
    let usuario: User = new User;

    if (tokenDecode['username']) {
      usuario.username = tokenDecode['username'];
    }

    if (tokenDecode['email']) {
      usuario.email = tokenDecode['email'];
    }

    return usuario
  }
}
