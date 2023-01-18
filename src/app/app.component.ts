import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  tabs = ['Recipes', 'Shopping'];

  selectedTab: string | null = 'Recipes';

  onTabSelected(tab: string) {
    console.log('Selected tab', tab);
    this.selectedTab = tab;
  }
}
