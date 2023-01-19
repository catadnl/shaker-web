import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, Observable } from 'rxjs';
import { Recipe, RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipes-details',
  templateUrl: './recipes-details.component.html',
  styleUrls: ['./recipes-details.component.scss'],
})
export class RecipesDetailsComponent implements OnInit {
  constructor(private route: ActivatedRoute, private recipesService: RecipesService) {}

  recipe$!: Observable<Recipe>;

  ngOnInit(): void {
    this.recipe$ = this.route.paramMap.pipe(
      filter((paramsMap) => paramsMap.has('id')),
      map((paramsMap) => paramsMap.get('id') as string),
      map((recipeId) => this.recipesService.getById(recipeId)),
      filter((recipe): recipe is Recipe => recipe !== null)
    );

    // if (this.route.snapshot.paramMap.has('id')) {
    //   const recipeId = this.route.snapshot.paramMap.get('id');
    //   this.recipe = this.recipesService.getById(recipeId as string);
    // }
  }
}
