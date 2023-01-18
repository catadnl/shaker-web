import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HoverBlurDirective } from './hover-blur.directive';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [SearchComponent, HoverBlurDirective],
  imports: [CommonModule],
  exports: [SearchComponent, HoverBlurDirective, CommonModule],
})
export class SharedModule {}
