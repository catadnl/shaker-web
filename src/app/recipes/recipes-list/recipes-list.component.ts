import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from '../recipes.component';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss'],
})
export class RecipesListComponent {
  @Input() recipes!: Recipe[];

  // _selectedItem: Recipe | null = null;
  //
  // @Input() set selectedItem(selectediItem: Recipe | null) {
  //   console.log('Selected item changed in recipes list', selectediItem);
  //   this._selectedItem = selectediItem;
  // }
  //
  // get selectedItem(): Recipe | null {
  //   return this._selectedItem;
  // }

  @Input() selectedItem: Recipe | null = null;

  @Output() itemSelected = new EventEmitter<Recipe>();

  onItemSelected(recipe: Recipe) {
    this.itemSelected.emit(recipe);
  }
}
