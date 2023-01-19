import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HoverBlurDirective } from './hover-blur.directive';
import { EllipsisPipe } from './pipes/ellipsis.pipe';
import { ImageUrlPipe } from './pipes/image-url.pipe';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [SearchComponent, HoverBlurDirective, EllipsisPipe, ImageUrlPipe],
  imports: [CommonModule],
  exports: [SearchComponent, HoverBlurDirective, EllipsisPipe, ImageUrlPipe, CommonModule],
})
export class SharedModule {}
