import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { catchError, Observable } from "rxjs";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private toastr:ToastrService){}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      return next.handle(request)
      .pipe(catchError((err: any) => {
          if (err instanceof HttpErrorResponse) {
              this.toastr.show((err?.error?.message||err?.error?.messageList[0])||err?.message||"E' successo qualcosa nell'elaborazione della richiesta")
          }

        return new Observable<HttpEvent<any>>();
      }));
  }
}
