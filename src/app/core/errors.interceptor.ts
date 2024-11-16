import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, Observable } from 'rxjs';
import { FormsService } from '../shared/services/forms.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private toastr: ToastrService,
    private formsService: FormsService,
    private router: Router
  ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (
            (err.error &&
              err.error.message &&
              err.error.message ==
                'Il token non è valido! Per favore effettua nuovamente il login o refresha la pagina!') ||
            (err.error &&
              err.error.message &&
              err.error.message ==
                'Il token non è valido.')
          ) {
            let trasportatore = localStorage.getItem('TrAccessToken');
            let trasportatoreR = localStorage.getItem('TrRefreshToken');
            let aziendaR = localStorage.getItem('AzRefreshToken');
            let location = localStorage.getItem('location');
            if (trasportatore) {
              this.formsService
                .verifyTrasportatoreRToken(trasportatoreR!)
                .subscribe({
                  next: (tokens: any) => {
                    localStorage.setItem('TrAccessToken', tokens.accessToken);
                    localStorage.setItem('TrRefreshToken', tokens.refreshToken);
                    this.formsService.setToken(tokens.accessToken);
                    this.formsService
                      .verifyTrasportatoreToken(tokens.accessToken)
                      .subscribe({
                        next: (t: any) => {
                          localStorage.setItem(
                            'trasportatore',
                            JSON.stringify(t)
                          );
                          this.formsService.setToken(tokens.accessToken);
                          this.formsService.authenticateUser(true);
                          this.formsService.setUser(
                            JSON.parse(localStorage.getItem('trasportatore')!)
                          );
                          this.router.navigate([`${location || '/home'}`]);
                        },
                      });
                  },
                  error: () => {},
                  complete: () => {},
                });
            } else {
              this.formsService.verifyAziendaRToken(aziendaR!).subscribe({
                next: (tokens: any) => {
                  localStorage.setItem('AzAccessToken', tokens.accessToken);
                  localStorage.setItem('AzRefreshToken', tokens.refreshToken);
                  this.formsService.setToken(tokens.accessToken);
                  this.formsService
                    .verifyAziendaToken(tokens.accessToken)
                    .subscribe({
                      next: (a: any) => {
                        localStorage.setItem('azienda', JSON.stringify(a));
                        this.formsService.setToken(tokens.accessToken);
                        this.formsService.authenticateUser(true);
                        this.formsService.setUser(
                          JSON.parse(localStorage.getItem('azienda')!)
                        );
                        this.router.navigate([`${location || '/home'}`]);
                      },
                    });
                },
                error: (error: any) => {},
                complete: () => {},
              });
            }
          } else {
            this.toastr.show(
              err?.error?.message ||
                err?.error?.messageList[0] ||
                err?.message ||
                "E' successo qualcosa nell'elaborazione della richiesta"
            );
          }
        }

        return new Observable<HttpEvent<any>>();
      })
    );
  }
}
