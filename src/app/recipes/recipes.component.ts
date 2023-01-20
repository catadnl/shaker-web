import { Component, Inject, OnDestroy, OnInit, Optional } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, startWith, Subject, takeUntil, tap } from 'rxjs';
import { RECIPE_TEXTS_CONFIG, RecipesTextsConfig } from './app.config';
import { Recipe, RecipesService } from './recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
  // providers: [RecipesService],
})
export class RecipesComponent implements OnInit, OnDestroy {
  private destroyed$$ = new Subject<void>();

  recipes$ = this.recipesService.filteredRecipes$;

  selectedRecipe: Recipe | null = null;

  isCreate = false;

  constructor(
    private recipesService: RecipesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    @Optional() @Inject(RECIPE_TEXTS_CONFIG) public recipesTextsConfig?: RecipesTextsConfig
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(
        takeUntil(this.destroyed$$),
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        map((event) => event.url.includes('/create')),
        startWith(this.activatedRoute.snapshot.firstChild?.url.toString().includes('create') ?? false),
        tap((isCreate) => {
          this.isCreate = isCreate;
        })
      )
      .subscribe();

    this.router.events
      .pipe(
        takeUntil(this.destroyed$$),
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        map(() => {
          return this.activatedRoute.snapshot.firstChild?.paramMap.get('id');
        }),
        startWith(this.activatedRoute.snapshot.firstChild?.paramMap.get('id') ?? null),
        tap((recipeId) => {
          if (recipeId) {
            this.selectedRecipe = this.recipesService.getById(recipeId);
            if (!this.selectedRecipe) {
              this.router.navigate(['..'], { relativeTo: this.activatedRoute });
            }
          } else {
            this.selectedRecipe = null;
          }
        })
      )
      .subscribe();
  }

  get sideViewOpen(): boolean {
    return this.isCreate || !!this.selectedRecipe;
  }

  onSearchChanged(searchTerm: string) {
    this.recipesService.filterRecipes(searchTerm);
  }

  onItemSelected(recipe: Recipe) {
    if (!!this.selectedRecipe && this.selectedRecipe.id === recipe.id) {
      this.router.navigate(['..'], { relativeTo: this.activatedRoute });
    } else {
      this.router.navigate([recipe.id], { relativeTo: this.activatedRoute });
    }
  }

  onCreteRecipe() {
    this.router.navigateByUrl('/recipes/create');
  }

  onItemEdited(recipe: Recipe) {
    this.router.navigate([recipe.id, 'edit'], { relativeTo: this.activatedRoute });
  }

  onItemDeleted(recipe: Recipe) {
    if (this.selectedRecipe && this.selectedRecipe.id === recipe.id) {
      this.router.navigate(['..'], { relativeTo: this.activatedRoute });
    }
    this.recipesService.deleteRecipe(recipe.id);
  }

  ngOnDestroy(): void {
    this.recipesService.resetRecipes();
    this.destroyed$$.next();
    this.destroyed$$.complete();
  }
}
