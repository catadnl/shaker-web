import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from '../recipes.service';

@Component({
  selector: 'app-recipes-item',
  templateUrl: './recipes-item.component.html',
  styleUrls: ['./recipes-item.component.scss'],
})
export class RecipesItemComponent {
  @Input() recipe!: Recipe;

  @Input() isSelected = false;

  @Output() itemSelected = new EventEmitter<Recipe>();

  @Output() itemDeleted = new EventEmitter<Recipe>();

  @Output() itemEdited = new EventEmitter<Recipe>();

  deleting = false;

  onItemSelected(recipe: Recipe) {
    this.itemSelected.emit(recipe);
  }

  onItemEdit(event: MouseEvent, recipe: Recipe) {
    event.stopPropagation();
    this.itemEdited.emit(recipe);
  }

  onDeleteStarted(event: MouseEvent) {
    event.stopPropagation();
    this.deleting = true;
  }

  onDeleteConfirmed(event: MouseEvent, recipe: Recipe) {
    event.stopPropagation();
    this.deleting = false;
    this.itemDeleted.emit(recipe);
  }

  onDeleteCanceled(event: MouseEvent) {
    event.stopPropagation();
    this.deleting = false;
  }
}
