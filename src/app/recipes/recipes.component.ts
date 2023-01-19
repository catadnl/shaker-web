import { Component, Inject, OnDestroy, Optional } from '@angular/core';
import { RECIPE_TEXTS_CONFIG, RecipesTextsConfig } from './app.config';
import { Recipe, RecipesService } from './recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
  // providers: [RecipesService],
})
export class RecipesComponent implements OnDestroy {
  recipes$ = this.recipesService.filteredRecipes$;

  selectedRecipe: Recipe | null = null;

  mode: 'none' | 'details' | 'create' | 'edit' = 'none';

  constructor(
    private recipesService: RecipesService,
    @Optional() @Inject(RECIPE_TEXTS_CONFIG) public recipesTextsConfig?: RecipesTextsConfig
  ) {}

  ngOnDestroy(): void {
    this.recipesService.resetRecipes();
  }

  onSearchChanged(searchTerm: string) {
    this.recipesService.filterRecipes(searchTerm);
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
  }
}
