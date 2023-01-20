import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  recipeForm = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: Validators.required }),
    description: new FormControl<string | null>(null),
    image: new FormControl('', { nonNullable: true, validators: Validators.required }),
    ingredients: new FormArray([this.getIngredientGroup(), this.getIngredientGroup()], [Validators.required]),
  });

  get ingredientsFormArray(): FormArray {
    return this.recipeForm.controls.ingredients;
  }

  constructor(
    private router: Router,
    private recipesService: RecipesService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

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

  getIngredientGroup(name = '', quantity: number | null = null): FormGroup {
    return this.formBuilder.group({
      name: this.formBuilder.control(name, { nonNullable: true, validators: Validators.required }),
      quantity: this.formBuilder.control(quantity, { validators: [Validators.required, Validators.min(1)] }),
    });
  }

  ngOnDestroy(): void {
    this.destroyed$$.next();
    this.destroyed$$.complete();
  }

  onAddIngredientGroup() {
    this.ingredientsFormArray.push(this.getIngredientGroup());
  }

  onDeleteIngredientGroup(formGroupIndex: number) {
    this.ingredientsFormArray.removeAt(formGroupIndex);
  }
}
