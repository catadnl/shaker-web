import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent {
  constructor(private activatedRoute: ActivatedRoute) {}

  errorMessage$ = this.activatedRoute.data.pipe(
    filter((data) => !!data['errorMessage']),
    map((data) => data['errorMessage'])
  );
}
