import { Component, Input } from '@angular/core';
import { Recipe } from '../recipes.service';

@Component({
  selector: 'app-recipes-details',
  templateUrl: './recipes-details.component.html',
  styleUrls: ['./recipes-details.component.scss'],
})
export class RecipesDetailsComponent {
  @Input() recipe!: Recipe;
}
