import { InjectionToken } from '@angular/core';

export interface RecipesTextsConfig {
  searchPlaceholder: string;
  createButton: string;
}

export const RECIPE_TEXTS_CONFIG = new InjectionToken<RecipesTextsConfig>('RECIPE_TEXTS_CONFIG');
