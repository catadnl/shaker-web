import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // constructor(@Inject(APP_ENVIRONMENT) appEnvironment: AppEnvironment) {
  //   console.log('APP ENV', appEnvironment);
  // }

  tabs = ['Recipes', 'Shopping'];

  selectedTab: string | null = 'Recipes';

  onTabSelected(tab: string) {
    console.log('Selected tab', tab);
    this.selectedTab = tab;
  }
}
