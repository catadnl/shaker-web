import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { RecipesDetailsComponent } from './recipes/recipes-details/recipes-details.component';
import { RecipesFormComponent } from './recipes/recipes-form/recipes-form.component';
import { RecipesItemComponent } from './recipes/recipes-item/recipes-item.component';
import { RecipesListComponent } from './recipes/recipes-list/recipes-list.component';
import { RecipesComponent } from './recipes/recipes.component';
import { SharedModule } from './shared/shared.module';
import { ShoppingFormComponent } from './shopping/shopping-form/shopping-form.component';
import { ShoppingListComponent } from './shopping/shopping-list/shopping-list.component';
import { ShoppingComponent } from './shopping/shopping.component';

@NgModule({
  declarations: [
    AppComponent,
    RecipesComponent,
    RecipesListComponent,
    RecipesItemComponent,
    RecipesFormComponent,
    RecipesDetailsComponent,
    ShoppingComponent,
    ShoppingListComponent,
    ShoppingFormComponent,
  ],
  imports: [BrowserAnimationsModule, CoreModule, SharedModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
