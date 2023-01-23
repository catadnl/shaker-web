import { HttpClient, HttpContext } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, tap, throwError, withLatestFrom } from 'rxjs';
import { APP_ENVIRONMENT, AppEnvironment } from '../app.config';
import { SHOULD_ADD_HEADER } from '../core/interceptors/error.interceptor';

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

export type RecipeCreate = Omit<Recipe, 'id'>;

export type RecipeListResponse = Record<string, RecipeResponse>;

export interface RecipeIdResponse {
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  private filteredRecipes$$ = new BehaviorSubject<Recipe[]>([]);

  filteredRecipes$ = this.filteredRecipes$$.asObservable();

  private loading$$ = new BehaviorSubject<boolean>(false);

  loading$ = this.loading$$.asObservable();

  constructor(private httpClient: HttpClient, @Inject(APP_ENVIRONMENT) private appEnvironment: AppEnvironment) {}

  fetchRecipes(searchTerm = ''): Observable<Recipe[]> {
    const url = `${this.appEnvironment.baseApiUrl}/recipes.json`;

    this.loading$$.next(true);
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
        this.loading$$.next(false);
        this.filteredRecipes$$.next(recipes);
      }),
      catchError((err) => {
        this.loading$$.next(false);
        return throwError(() => err);
      })
    );
  }

  deleteRecipe(deletedRecipe: Recipe): Observable<null> {
    return this.httpClient.delete<null>(`${this.appEnvironment.baseApiUrl}/recipes/${deletedRecipe.id}.json`).pipe(
      withLatestFrom(this.filteredRecipes$),
      tap(([, filteredRecipes]) => {
        const newRecipes = filteredRecipes.filter((recipe) => {
          return recipe.id !== deletedRecipe.id;
        });
        this.filteredRecipes$$.next(newRecipes);
      }),
      map(() => null)
    );
  }

  getById(id: string): Observable<Recipe> {
    const url = `${this.appEnvironment.baseApiUrl}/recipes/${id}.json`;

    return this.httpClient
      .get<RecipeResponse>(url, {
        context: new HttpContext().set(SHOULD_ADD_HEADER, false),
      })
      .pipe(
        map((recipeResponse) => {
          return { ...recipeResponse, id };
        })
      );
  }

  createRecipe(recipe: RecipeCreate): Observable<null> {
    return this.httpClient.post<RecipeIdResponse>(`${this.appEnvironment.baseApiUrl}/recipes.json`, recipe).pipe(
      withLatestFrom(this.filteredRecipes$),
      tap(([response, filteredRecipes]) => {
        this.filteredRecipes$$.next([...filteredRecipes, { ...recipe, id: response.name }]);
      }),
      map(() => null)
    );
  }

  editRecipe(editedRecipe: Recipe): Observable<null> {
    return this.httpClient.put<RecipeIdResponse>(`${this.appEnvironment.baseApiUrl}/recipes/${editedRecipe.id}.json`, editedRecipe).pipe(
      withLatestFrom(this.filteredRecipes$),
      tap(([, filteredRecipes]) => {
        const newRecipes = filteredRecipes.map((recipe) => {
          return recipe.id === editedRecipe.id ? { ...editedRecipe } : recipe;
        });
        this.filteredRecipes$$.next(newRecipes);
      }),
      map(() => null)
    );
  }
}
