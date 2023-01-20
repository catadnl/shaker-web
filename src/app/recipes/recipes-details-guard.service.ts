import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RecipesDetailsGuard implements CanActivate {
  private static readonly SCREEN_THRESHOLD = 768;

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    if (window.innerWidth > RecipesDetailsGuard.SCREEN_THRESHOLD) {
      return true;
    }

    return this.router.createUrlTree(['/', 'recipes', 'details', route.paramMap.get('id')]);
  }
}
