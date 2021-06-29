import { HttpErrorResponse, HttpInterceptor } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../account/login/auth.service';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService, private router: Router, private toastr: ToastrService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    const authToken = this.auth.getAuthorizationToken();

    if (authToken) {
        // Clone the request and replace the original headers with
        // cloned headers, updated with the authorization.
        const authReq = req.clone({
          headers: req.headers.set('Authorization', `JWT ${authToken}`)
        });
    
        // send cloned request with header to the next handler.
        return next.handle(authReq).pipe(
          catchError(this.handleError)
        );
    }
    return next.handle(req).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Erro de client-side ou de rede
      this.toastr.error('Ocorreu um erro:', error.error.message);
      // Erro de autenticacao
    } else if (error.error['detail'] == "Signature has expired.") {
      
      // em implementacao
      this.router.navigate(['/']);
      
      // Erro retornando pelo backend
    } else {
      console.log(error.error)
      this.toastr.error(
      `Código do erro ${error.status}, ` +
        `Erro: ${JSON.stringify(error.error)}`);
    }

    // retornar um observable com uma mensagem amigavel.
    return throwError('Ocorreu um erro, tente novamente');
  }
}