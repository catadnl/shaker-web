import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  @Input() placeholderText!: string;

  @Output() searchChanged = new EventEmitter<string>();

  searchTerm = '';

  onInput(event: Event) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.searchChanged.emit(this.searchTerm);
  }
}
