import { Injectable } from '@angular/core';

export interface Ingredient {
  name: string;
  quantity?: number;
}

export interface Recipe {
  id: string;
  name: string;
  description?: string;
  image: string;
  ingredients: Ingredient[];
}

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  // index = Math.random() * 10;

  private recipes: Recipe[] = [
    {
      id: '1',
      name: 'Negroni',
      description:
        'To make the perfect classic negroni cocktail all you need is balance: use equal parts gin, vermouth and Campari, and choose the best products you have in reach',
      image: 'assets/images/negroni.jpg',
      ingredients: [
        {
          name: 'gin',
        },
        {
          name: 'sweet vermouth',
        },
        {
          name: 'Campari',
        },
        {
          name: 'ice',
        },
      ],
    },
    {
      id: '2',
      name: 'Vodka martini',
      description:
        'Make an easy vodka martini with our simple recipe for an elegant party tipple. Serve your cool cocktail with an olive or a twist of lemon peel',
      image: 'assets/images/vodka-martini.jpg',
      ingredients: [
        {
          name: 'vodka',
        },
        {
          name: 'dry vermouth',
        },
        {
          name: 'lemon peel',
        },
      ],
    },
    {
      id: '3',
      name: 'Old fashioned',
      description: 'A traditional whisky cocktail with bitters, soda water and a simple orange garnish',
      image: 'assets/images/old-fashioned.jpg',
      ingredients: [
        {
          name: 'Scotch whiskey',
        },
        {
          name: 'Angostura bitters',
        },
        {
          name: 'soda',
        },
        {
          name: 'orange slice',
        },
        {
          name: 'maraschino cherry',
        },
      ],
    },
    {
      id: '4',
      name: 'Sidecar Mocktail',
      description:
        'Serve up a sophisticated alcohol-free sidecar mocktail. It’s made with lapsang souchong tea, lemon juice, marmalade and honey',
      image: 'assets/images/sidecar-mocktail.jpg',
      ingredients: [
        {
          name: 'cold tea',
        },
        {
          name: 'lemon juice',
        },
        {
          name: 'marmalade',
        },
        {
          name: 'honey',
        },
        {
          name: 'ice',
        },
      ],
    },
    {
      id: '5',
      name: 'Fruity Mocktail',
      description: 'Make this fruit-flavoured mocktail with grenadine and orange juice',
      image: 'assets/images/fruity-mocktail.jpg',
      ingredients: [
        {
          name: 'green grapes',
        },
        {
          name: 'blueberries',
        },
        {
          name: 'grenadine',
        },
        {
          name: 'sparkling water',
        },
      ],
    },
  ];

  getRecipes(): Recipe[] {
    return [...this.recipes];
  }

  deleteRecipe(recipeId: string) {
    this.recipes = this.recipes.filter((recipe) => recipe.id !== recipeId);
  }
}
