import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { HeaderLogoComponent } from '../header-logo/header-logo.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @ViewChild(HeaderLogoComponent) headerLogoComponent?: HeaderLogoComponent;
  // @ViewChild(HeaderLogoComponent, { static: true }) headerLogoComponent!: HeaderLogoComponent;

  tabs = ['Recipes', 'Shopping', 'User'];

  @Output() tabSelected = new EventEmitter<string>();

  // ngOnInit(): void {
  //   console.log('[ngOnInit] HeaderComponent', this.headerLogoComponent);
  // }
  //
  // ngAfterViewInit(): void {
  //   console.log('[ngAfterViewInit] HeaderComponent', this.headerLogoComponent);
  // }

  onImageLoadFinished(imageLoaded: boolean) {
    if (imageLoaded) {
      console.log('Logo loaded successfully');
    } else {
      console.log('Logo was not loaded');
    }
  }

  onSelectTab(tab: string) {
    this.tabSelected.emit(tab);
  }
}
