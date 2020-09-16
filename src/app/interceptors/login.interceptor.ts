import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HTTP_INTERCEPTORS, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export class LoginInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(req);
    const token = localStorage.getItem('token');
    if (token) {
      let cloneReq = req.clone(
        {
          params : new HttpParams().set('access_token', token)
        }
      );
      console.log('1')
      console.log(cloneReq)
      //retourner la nouvelle requete cloner
      return next.handle(cloneReq);
    } else {
      //retourner la requete d'origine
      console.log('2')

      return next.handle(req);
    }

  }
}

export const loginInterceptorProvider = {
  provide : HTTP_INTERCEPTORS,
  useClass : LoginInterceptor,
  multi : true
}
