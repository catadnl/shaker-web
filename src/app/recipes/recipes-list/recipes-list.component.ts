import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from '../recipes.component';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss'],
})
export class RecipesListComponent {
  @Input() recipes!: Recipe[];

  @Output() itemSelected = new EventEmitter<Recipe>();

  onItemSelected(recipe: Recipe) {
    this.itemSelected.emit(recipe);
  }
}
