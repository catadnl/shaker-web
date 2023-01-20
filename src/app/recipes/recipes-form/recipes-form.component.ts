import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil, tap } from 'rxjs';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipes-form',
  templateUrl: './recipes-form.component.html',
  styleUrls: ['./recipes-form.component.scss'],
})
export class RecipesFormComponent implements OnInit, OnDestroy {
  private destroyed$$ = new Subject<void>();

  constructor(private router: Router, private recipesService: RecipesService, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.paramMap
      .pipe(
        takeUntil(this.destroyed$$),
        tap((paramsMap) => {
          const recipe = paramsMap.has('id') ? this.recipesService.getById(paramsMap.get('id') as string) : null;
          console.log(recipe);
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroyed$$.next();
    this.destroyed$$.complete();
  }
}
