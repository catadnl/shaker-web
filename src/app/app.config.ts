import { InjectionToken } from '@angular/core';

export interface AppEnvironment {
  baseApiUrl: string;
  baseImageUrl: string;
  imageUrlToken: string;
}

export const APP_ENVIRONMENT = new InjectionToken<AppEnvironment>('APP_ENVIRONMENT');
