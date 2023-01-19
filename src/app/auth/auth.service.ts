import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

export interface User {
  name: string;
}

const USER: User = { name: 'Test user' };

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user$$ = new BehaviorSubject<User | null>(USER);

  currentUser$ = this.user$$.asObservable();

  isAuthenticated$: Observable<boolean> = this.currentUser$.pipe(map((user) => !!user));
}
