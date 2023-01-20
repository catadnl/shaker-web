import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { ErrorComponent } from './core/error/error.component';
import { ShoppingComponent } from './shopping/shopping.component';

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },

  { path: 'recipes', loadChildren: () => import('src/app/recipes/recipes.module').then((m) => m.RecipesModule) },

  { path: 'shopping', component: ShoppingComponent, canActivate: [AuthGuard] },

  {
    path: 'auth-error',
    component: ErrorComponent,
    data: {
      errorMessage: 'You are not authenticated',
    },
  },
  {
    path: '404-error',
    component: ErrorComponent,
    data: {
      errorMessage: 'The page you requested was not found',
    },
  },

  { path: '**', redirectTo: '/404-error' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
