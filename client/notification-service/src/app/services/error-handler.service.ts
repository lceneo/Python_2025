import {ErrorHandler, inject, Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements ErrorHandler {

  private snackbar = inject(MatSnackBar);

  handleError(error: any): void {
    let mess: string;
    if (error instanceof HttpErrorResponse) {
      mess = error.error.detail;
    } else {
      mess = error?.detail ?? error.message ?? error
    }
    this.snackbar.open(mess, 'Закрыть', { duration: 1000 });
  }
}
