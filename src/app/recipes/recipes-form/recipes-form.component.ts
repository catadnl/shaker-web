import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
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
    id: new FormControl<string | null>(null),
    name: new FormControl('', { nonNullable: true, validators: Validators.required }),
    description: new FormControl<string | null>(null),
    image: new FormControl('', { nonNullable: true, validators: Validators.required }),
    ingredients: new FormArray([this.getIngredientGroup(), this.getIngredientGroup()], [this.minLengthArray(2)]),
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

          if (recipe) {
            this.ingredientsFormArray.clear();
            recipe.ingredients
              .map((ingredient) => this.getIngredientGroup())
              .forEach((ingredientGroup) => {
                this.ingredientsFormArray.push(ingredientGroup);
              });

            this.recipeForm.setValue(recipe);
          }

          // this.recipeForm.valueChanges.subscribe((value) => {
          //   console.log('VALUE CHANGED', value);
          // });
          //
          // this.recipeForm.statusChanges.subscribe((status) => {
          //   console.log('STATUS CHANGED', status);
          // });
        })
      )
      .subscribe();
  }

  controlHasErrors(controlName: string, errorCode: string): boolean {
    const control = this.recipeForm.get(controlName) as AbstractControl;
    return control.touched && control.hasError(errorCode);
  }

  private minLengthArray(min: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value.length >= min) {
        return null;
      }

      return { 'array-length-invalid': true };
    };
  }

  private getIngredientGroup(name = '', quantity: number | null = null): FormGroup {
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

  onCancel() {
    this.router.navigateByUrl('/recipes');
  }

  onClear() {
    this.ingredientsFormArray.clear();
    this.ingredientsFormArray.push(this.getIngredientGroup());
    this.ingredientsFormArray.push(this.getIngredientGroup());

    this.recipeForm.reset();
  }

  onSubmit() {
    console.log('RECIPE TO SAVE', this.recipeForm.value);
  }
}
