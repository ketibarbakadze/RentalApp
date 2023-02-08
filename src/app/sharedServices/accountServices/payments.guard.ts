import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentsGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (JSON.parse(<string>localStorage.getItem('payments')) == null) {
      this.router.navigate(['**']);
    } else if (
      route.paramMap.get('id') !=
      JSON.parse(<string>localStorage.getItem('payments')).id
    ) {
      this.router.navigate(['**']);
    }
    {
    }
    return true;
  }
}
