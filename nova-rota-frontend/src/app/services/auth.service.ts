import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  api_url = 'http://localhost:8000/';
  constructor(private http: HttpClient) {}

  login(nome: string, senha: string) {
    return this.http
      .post<any>(
        this.api_url + `accounts/api/auth`,
        { nome, senha },
        httpOptions
      )
      .pipe(
        map((user) => {
          if (user && user.token) {
            localStorage.setItem('currentUser', JSON.stringify(user));
          }
          return user;
        })
      );
  }

  logout() {
    localStorage.removeItem('currentUser');
  }
}
