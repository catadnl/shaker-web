import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './core/error/error.component';
import { RecipesDetailsComponent } from './recipes/recipes-details/recipes-details.component';
import { RecipesFormComponent } from './recipes/recipes-form/recipes-form.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingComponent } from './shopping/shopping.component';

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },

  {
    path: 'recipes',
    component: RecipesComponent,
    children: [
      { path: 'create', component: RecipesFormComponent },
      { path: ':id', component: RecipesDetailsComponent },
      { path: ':id/edit', component: RecipesFormComponent },
    ],
  },

  { path: 'shopping', component: ShoppingComponent },

  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
