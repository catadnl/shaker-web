import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { appEnvironment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { APP_ENVIRONMENT } from './app.config';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { RECIPE_TEXTS_CONFIG, RecipesTextsConfig } from './recipes/app.config';
import { ShoppingFormComponent } from './shopping/shopping-form/shopping-form.component';
import { ShoppingListComponent } from './shopping/shopping-list/shopping-list.component';
import { ShoppingComponent } from './shopping/shopping.component';

@NgModule({
  declarations: [AppComponent, ShoppingComponent, ShoppingListComponent, ShoppingFormComponent],
  imports: [BrowserAnimationsModule, AppRoutingModule, AuthModule, CoreModule],
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
