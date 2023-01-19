import { Injectable } from '@angular/core';
import { BehaviorSubject, take, tap } from 'rxjs';

export interface Ingredient {
  name: string;
  quantity: number;
}

export interface Recipe {
  id: string;
  name: string;
  description?: string;
  image: string;
  ingredients: Ingredient[];
}

const RECIPES = [
  {
    id: '1',
    name: 'Negroni',
    description:
      'To make the perfect classic negroni cocktail all you need is balance: use equal parts gin, vermouth and Campari, and choose the best products you have in reach',
    image: 'negroni.jpg',
    ingredients: [
      {
        name: 'gin',
        quantity: 1,
      },
      {
        name: 'sweet vermouth',
        quantity: 1,
      },
      {
        name: 'Campari',
        quantity: 1,
      },
      {
        name: 'ice',
        quantity: 2,
      },
    ],
  },
  {
    id: '2',
    name: 'Vodka martini',
    description:
      'Make an easy vodka martini with our simple recipe for an elegant party tipple. Serve your cool cocktail with an olive or a twist of lemon peel',
    image: 'vodka-martini.jpg',
    ingredients: [
      {
        name: 'vodka',
        quantity: 1,
      },
      {
        name: 'dry vermouth',
        quantity: 1,
      },
      {
        name: 'lemon peel',
        quantity: 1,
      },
    ],
  },
  {
    id: '3',
    name: 'Old fashioned',
    description: 'A traditional whisky cocktail with bitters, soda water and a simple orange garnish',
    image: 'old-fashioned.jpg',
    ingredients: [
      {
        name: 'Scotch whiskey',
        quantity: 1,
      },
      {
        name: 'Angostura bitters',
        quantity: 1,
      },
      {
        name: 'soda',
        quantity: 1,
      },
      {
        name: 'orange slice',
        quantity: 2,
      },
      {
        name: 'maraschino cherry',
        quantity: 1,
      },
    ],
  },
  {
    id: '4',
    name: 'Sidecar Mocktail',
    description:
      'Serve up a sophisticated alcohol-free sidecar mocktail. It’s made with lapsang souchong tea, lemon juice, marmalade and honey',
    image: 'sidecar-mocktail.jpg',
    ingredients: [
      {
        name: 'cold tea',
        quantity: 1,
      },
      {
        name: 'lemon juice',
        quantity: 1,
      },
      {
        name: 'marmalade',
        quantity: 1,
      },
      {
        name: 'honey',
        quantity: 1,
      },
      {
        name: 'ice',
        quantity: 2,
      },
    ],
  },
  {
    id: '5',
    name: 'Fruity Mocktail',
    description: 'Make this fruit-flavoured mocktail with grenadine and orange juice',
    image: 'fruity-mocktail.jpg',
    ingredients: [
      {
        name: 'green grapes',
        quantity: 1,
      },
      {
        name: 'blueberries',
        quantity: 3,
      },
      {
        name: 'grenadine',
        quantity: 1,
      },
      {
        name: 'sparkling water',
        quantity: 1,
      },
    ],
  },
];

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  private recipes: Recipe[] = RECIPES;

  private filteredRecipes$$ = new BehaviorSubject<Recipe[]>(this.recipes);

  filteredRecipes$ = this.filteredRecipes$$.asObservable();

  resetRecipes() {
    this.filteredRecipes$$.next(this.recipes);
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

  filterRecipes(searchTerm: string) {
    const filteredRecipes = this.recipes.filter((recipe) => {
      return (
        recipe.name.toLowerCase().includes(searchTerm) || (recipe.description && recipe.description.toLowerCase().includes(searchTerm))
      );
    });
    this.filteredRecipes$$.next(filteredRecipes);
  }
}
