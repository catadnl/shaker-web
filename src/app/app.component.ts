import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  selectedTab: string | null = null;

  onTabSelected(tab: string) {
    console.log('Selected tab', tab);
    this.selectedTab = tab;
  }
}
