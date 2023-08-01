import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError, EMPTY, Observable, tap } from 'rxjs';
const MESSAGE_NOTIFICATION_LIFE_TIME = 5000;
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
            life: MESSAGE_NOTIFICATION_LIFE_TIME,
          });
        }
      }),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = this.buildErrorMessage(error.error);

        if (error.status === 400 || error.status === 404) {
          errorMessage = this.buildErrorMessage(error.error);
        }

        if (errorMessage !== '') {
          this.messageService.add({
            severity: 'error',
            summary: `Error ${error.status}`,
            detail: errorMessage,
            life: MESSAGE_NOTIFICATION_LIFE_TIME,
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: `Error ${error.status}`,
            detail: error.statusText,
            life: MESSAGE_NOTIFICATION_LIFE_TIME,
          });
        }

        return EMPTY;
      }),
    );
  }

  buildErrorMessage(errorObj: { [key: string]: any }): string {
    let errorMessage = 'Validation Error:\n';

    for (const key in errorObj) {
      errorMessage += `- ${key}:\n`;

      if (typeof errorObj[key] === 'string') {
        errorMessage += `  - ${errorObj[key]}\n`;
      } else {
        for (const subKey in errorObj[key]) {
          errorMessage += `  - ${errorObj[key][subKey]}\n`;
        }
      }
    }

    return errorMessage;
  }
}
