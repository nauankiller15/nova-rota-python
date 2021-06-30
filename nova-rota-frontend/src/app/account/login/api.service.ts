import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '../../api.service';

@Injectable({
  providedIn: 'root',
})
export class LoginApiService extends ApiService {
  
  login(usuario: any): Observable<any> {
    if (this.httpHeaders['Authorization']) {
      this.router.navigate(['']);
    } else {
      return this.http.post(this.baseUrl + 'login/', usuario, {
        headers: this.httpHeaders,
      });
    }
  }
}
