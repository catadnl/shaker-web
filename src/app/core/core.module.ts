import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderLogoComponent } from './header-logo/header-logo.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [HeaderComponent, HeaderLogoComponent],
  imports: [CommonModule],
  exports: [HeaderComponent],
})
export class CoreModule {}
