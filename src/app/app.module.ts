import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { appEnvironment } from '../environments/environment';

import { AppComponent } from './app.component';
import { APP_ENVIRONMENT } from './app.config';
import { CoreModule } from './core/core.module';
import { RECIPE_TEXTS_CONFIG, RecipesTextsConfig } from './recipes/app.config';
import { RecipesModule } from './recipes/recipes.module';
import { ShoppingFormComponent } from './shopping/shopping-form/shopping-form.component';
import { ShoppingListComponent } from './shopping/shopping-list/shopping-list.component';
import { ShoppingComponent } from './shopping/shopping.component';

@NgModule({
  declarations: [AppComponent, ShoppingComponent, ShoppingListComponent, ShoppingFormComponent],
  imports: [BrowserAnimationsModule, CoreModule, RecipesModule],
  providers: [
    {
      provide: RECIPE_TEXTS_CONFIG,
      useValue: {
        searchPlaceholder: 'Search recipes..',
        createButton: 'Create recipe',
      } as RecipesTextsConfig,
    },
    {
      provide: APP_ENVIRONMENT,
      useValue: appEnvironment,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
