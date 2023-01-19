import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { debounceTime, distinctUntilChanged, map, Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  private destroyed$$ = new Subject<void>();

  private inputChanged$$ = new Subject<string>();

  @Input() placeholderText!: string;

  @Input() isDisabled = false;

  @Output() searchChanged = new EventEmitter<string>();

  ngOnInit(): void {
    this.inputChanged$$
      .pipe(
        takeUntil(this.destroyed$$),
        debounceTime(500),
        map((searchTerm) => {
          return searchTerm.trim().toLowerCase();
        }),
        distinctUntilChanged(),
        tap((searchTerm) => {
          this.searchChanged.emit(searchTerm);
        })
      )
      .subscribe();
  }

  onInput(event: Event) {
    this.inputChanged$$.next((event.target as HTMLInputElement).value);
  }

  ngOnDestroy(): void {
    this.destroyed$$.next();
    this.destroyed$$.complete();
  }
}
