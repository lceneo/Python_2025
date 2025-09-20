import {
  ApplicationConfig,
  ErrorHandler, LOCALE_ID,
  provideZonelessChangeDetection
} from '@angular/core';
import {provideRouter, withDebugTracing} from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient} from '@angular/common/http';
import {ErrorHandlerService} from './services/error-handler.service';
import {provideNativeDateAdapter} from '@angular/material/core';
import {registerLocaleData} from '@angular/common';
import localeRu from '@angular/common/locales/ru';

registerLocaleData(localeRu);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(),
    provideNativeDateAdapter(),
    { provide: ErrorHandler, useClass: ErrorHandlerService },
    { provide: LOCALE_ID, useValue: 'ru' }
  ]
};
