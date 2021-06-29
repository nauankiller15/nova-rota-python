import { HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders, HttpInterceptor } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../account/login/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  
  constructor(private auth: AuthService, private http: HttpClient, private router: Router ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>  {
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
        tap(() => {},
          (err: any) => {
            if (err instanceof HttpErrorResponse) {
              if (err.status !== 401) {
                return;
              }
              this.router.navigate(['login']);
            }
          }
        )
      );
    }

    return next.handle(req);
  }
}