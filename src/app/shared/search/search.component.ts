import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  private destroyed$$ = new Subject<void>();

  @Input() placeholderText!: string;

  @Input() set isDisabled(isDisabled: boolean) {
    if (isDisabled) {
      this.searchControl.disable();
    } else {
      this.searchControl.enable();
    }
  }

  @Output() searchChanged = new EventEmitter<string>();

  searchControl = new FormControl('', { nonNullable: true });

  ngOnInit(): void {
    this.searchControl.valueChanges
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

  ngOnDestroy(): void {
    this.destroyed$$.next();
    this.destroyed$$.complete();
  }
}
