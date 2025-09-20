import {ErrorHandler, inject, Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements ErrorHandler {

  private snackbar = inject(MatSnackBar);

  handleError(error: any): void {
    this.snackbar.open(error?.detail ?? error.message ?? error);
  }
}
