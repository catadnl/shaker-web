import { Component, Input } from '@angular/core';
import { Recipe } from '../recipes.service';

@Component({
  selector: 'app-recipes-form',
  templateUrl: './recipes-form.component.html',
  styleUrls: ['./recipes-form.component.scss'],
})
export class RecipesFormComponent {
  @Input() recipe?: Recipe;
}
