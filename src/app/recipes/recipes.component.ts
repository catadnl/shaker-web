import { Component, Inject, OnInit, Optional } from '@angular/core';
import { RECIPE_TEXTS_CONFIG, RecipesTextsConfig } from './app.config';
import { Recipe, RecipesService } from './recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
  // providers: [RecipesService],
})
export class RecipesComponent implements OnInit {
  recipes: Recipe[] = [];

  selectedRecipe: Recipe | null = null;

  mode: 'none' | 'details' | 'create' | 'edit' = 'none';

  placeholderText = 'Search recipes..';

  constructor(
    private recipesService: RecipesService,
    @Optional() @Inject(RECIPE_TEXTS_CONFIG) public recipesTextsConfig?: RecipesTextsConfig
  ) {}

  ngOnInit() {
    this.recipes = this.recipesService.getRecipes();
  }

  onSearchChanged(searchTerm: string) {
    console.log('Search changed', searchTerm);
  }

  onItemSelected(recipe: Recipe) {
    if (!!this.selectedRecipe && this.selectedRecipe.id === recipe.id) {
      this.selectedRecipe = null;
      this.mode = 'none';
    } else {
      this.mode = 'details';
      this.selectedRecipe = recipe;
    }
    console.log('Recipe selected', recipe);
  }

  onCreteRecipe() {
    this.mode = 'create';
    this.selectedRecipe = null;
  }

  onItemEdited(recipe: Recipe) {
    this.mode = 'edit';
    this.selectedRecipe = recipe;
  }

  onItemDeleted(recipe: Recipe) {
    if (this.selectedRecipe && this.selectedRecipe.id === recipe.id) {
      this.selectedRecipe = null;
      this.mode = 'none';
    }
    this.recipesService.deleteRecipe(recipe.id);
    this.recipes = this.recipesService.getRecipes();
  }
}
