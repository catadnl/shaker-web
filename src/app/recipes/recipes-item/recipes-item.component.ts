import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from '../recipes.component';

@Component({
  selector: 'app-recipes-item',
  templateUrl: './recipes-item.component.html',
  styleUrls: ['./recipes-item.component.scss'],
})
export class RecipesItemComponent {
  @Input() recipe!: Recipe;

  @Output() itemSelected = new EventEmitter<Recipe>();

  onItemSelected(recipe: Recipe) {
    this.itemSelected.emit(recipe);
  }
}
