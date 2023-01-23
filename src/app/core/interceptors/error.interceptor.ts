import { HttpContextToken, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';

export const SHOULD_ADD_HEADER = new HttpContextToken(() => true);

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const shouldAddHeader = request.context.get(SHOULD_ADD_HEADER);

    const mappedRequest = shouldAddHeader
      ? request.clone({
          headers: request.headers.set('X-MY-HEADER', 'VALUE'),
        })
      : request.clone();

    return next.handle(mappedRequest).pipe(
      tap((response) => {
        console.log('RESPONSE', response);
      }),
      catchError((error) => this.handleError(error))
    );
  }
}
