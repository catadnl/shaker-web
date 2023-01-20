import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, take, tap } from 'rxjs';
import { APP_ENVIRONMENT, AppEnvironment } from '../app.config';

export interface Ingredient {
  name: string;
  quantity: number;
}

export interface Recipe {
  id: string;
  name: string;
  description: string | null;
  image: string;
  ingredients: Ingredient[];
}

export type RecipeResponse = Omit<Recipe, 'id'>;

export type RecipeListResponse = Record<string, RecipeResponse>;

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  private filteredRecipes$$ = new BehaviorSubject<Recipe[]>([]);

  filteredRecipes$ = this.filteredRecipes$$.asObservable();

  constructor(private httpClient: HttpClient, @Inject(APP_ENVIRONMENT) private appEnvironment: AppEnvironment) {}

  fetchRecipes(searchTerm = ''): Observable<Recipe[]> {
    const url = `${this.appEnvironment.baseApiUrl}/recipes.json`;

    return this.httpClient.get<RecipeListResponse>(url).pipe(
      tap((response) => {
        console.log('RESPONSE', response);
      }),
      map((recipesResponse) => {
        return Object.entries(recipesResponse).map(([id, recipeResponse]) => {
          return {
            ...recipeResponse,
            id,
          };
        });
      }),
      map((recipes) => {
        return recipes.filter((recipe) => {
          return (
            recipe.name.toLowerCase().includes(searchTerm) || (recipe.description && recipe.description.toLowerCase().includes(searchTerm))
          );
        });
      }),
      tap((recipes) => {
        this.filteredRecipes$$.next(recipes);
      })
    );
  }

  deleteRecipe(recipeId: string) {
    this.filteredRecipes$$
      .pipe(
        take(1),
        tap((recipes) => {
          const filteredRecipes = recipes.filter((recipe) => recipe.id !== recipeId);
          this.filteredRecipes$$.next(filteredRecipes);
        })
      )
      .subscribe();
  }

  getById(id: string): Recipe | null {
    return null;
    // return this.recipes.find((recipe) => recipe.id === id) ?? null;
  }
}
