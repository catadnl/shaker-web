import { NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { RecipesDetailsComponent } from './recipes-details/recipes-details.component';
import { RecipesFormComponent } from './recipes-form/recipes-form.component';
import { RecipesItemComponent } from './recipes-item/recipes-item.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { RecipesComponent } from './recipes.component';

@NgModule({
  declarations: [RecipesComponent, RecipesListComponent, RecipesItemComponent, RecipesFormComponent, RecipesDetailsComponent],
  imports: [SharedModule, RouterOutlet],
  exports: [RecipesComponent],
  // providers: [RecipesService],
})
export class RecipesModule {}
