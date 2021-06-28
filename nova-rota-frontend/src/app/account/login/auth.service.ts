import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  baseUrl = 'http://localhost:8000/api/';
  httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json'});
  token = localStorage.getItem('token');
  autenticado: boolean = false;

  constructor(private http: HttpClient) { }

  autenticar(usuario: Usuario) {
    this.logar(usuario).subscribe(
      data => {
        console.log('autenticado');
        this.autenticado = true;
      },
      error => {
        console.log('nao autenticado')
        this.autenticado = false;
      }
    );
  }

  logar(usuario: Usuario): Observable<any> {
    return this.http.post(this.baseUrl + 'login/', usuario, {
      headers: this.httpHeaders,
    });
  }
}


// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Router } from '@angular/router';

// @Injectable({
//   providedIn: 'root',
// })
// export class LoginApiService {


//   constructor(private router: Router, private http: HttpClient) {}
  
//   login(usuario: any): Observable<any> {
//     return this.http.post(this.baseUrl + 'login/', usuario, {
//       headers: this.httpHeaders,
//     });
//   }

//   autenticar(token): Observable<any> {
//     return this.http.post(this.baseUrl + 'verificar-token/', token, {
//       headers: this.httpHeaders,
//     });
//   }
// }
