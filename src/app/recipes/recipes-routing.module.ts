import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { RecipesDetailsGuard } from './recipes-details-guard.service';
import { RecipesDetailsComponent } from './recipes-details/recipes-details.component';
import { RecipesFormComponent } from './recipes-form/recipes-form.component';
import { RecipesComponent } from './recipes.component';

const routes: Routes = [
  {
    path: 'details/:id',
    component: RecipesDetailsComponent,
  },
  {
    path: '',
    component: RecipesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'create', component: RecipesFormComponent },
      { path: ':id', component: RecipesDetailsComponent, canActivate: [RecipesDetailsGuard] },
      { path: ':id/edit', component: RecipesFormComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipesRoutingModule {}
