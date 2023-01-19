import { InjectionToken } from '@angular/core';

export interface AppEnvironment {
  baseImageUrl: string;
  imageUrlToken: string;
}

export const APP_ENVIRONMENT = new InjectionToken<AppEnvironment>('APP_ENVIRONMENT');
