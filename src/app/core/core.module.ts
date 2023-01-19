import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { HeaderLogoComponent } from './header-logo/header-logo.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [HeaderComponent, HeaderLogoComponent, ErrorComponent],
  imports: [CommonModule, RouterModule],
  exports: [HeaderComponent],
})
export class CoreModule {}
