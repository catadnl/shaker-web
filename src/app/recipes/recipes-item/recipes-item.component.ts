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

  onItemSelected(recipe: Recipe) {
    this.itemSelected.emit(recipe);
  }

  onItemEdit(event: MouseEvent, recipe: Recipe) {
    event.stopPropagation();
    this.itemEdited.emit(recipe);
  }

  onItemDeleted(event: MouseEvent, recipe: Recipe) {
    event.stopPropagation();
    this.itemDeleted.emit(recipe);
  }

  // ngOnInit(): void {
  // this.recipe.description = this.ellipsisPipe.transform(this.recipe.description);
  // this.recipe.description = EllipsisPipe.addEllipsis(this.recipe.description ?? '');
  // }
}
