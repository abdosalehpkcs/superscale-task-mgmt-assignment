import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError, EMPTY, Observable, tap } from 'rxjs';

@Injectable()
export class GeneralHttpInterceptor implements HttpInterceptor {
  constructor(private messageService: MessageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap((evt: HttpEvent<any>) => {
        let message = '';
        let summary = '';

        if (evt instanceof HttpResponse) {
          summary = `Successful: ${evt.status}`;
          if (evt.status === 201) {
            message = `Task ${evt.body.name} was added successfully`;
          } else if (evt.status === 204) {
            message = `Task has been removed successfully`;
          } else if (evt.status === 200) {
            message = evt.body.length > 0 ? 'Tasks have been loaded successfully' : 'Task has been updated successfully';
          }
        }

        if (message !== '') {
          this.messageService.add({
            severity: 'success',
            summary: summary,
            detail: message,
            life: 3000,
          });
        }
      }),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';

        if (error.status === 400) {
          errorMessage = (error.message as any).fields?.fields ? (error.message as any).fields?.fields : 'Unknown Error';
        } else if (error.status === 404) {
          errorMessage = error.error.message;
        }

        if (errorMessage !== '') {
          this.messageService.add({
            severity: 'error',
            summary: `Error ${error.status}`,
            detail: errorMessage,
            life: 3000,
          });
        }

        return EMPTY;
      }),
    );
  }
}
