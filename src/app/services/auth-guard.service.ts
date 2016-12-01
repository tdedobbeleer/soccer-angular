import { Injectable } from '@angular/core';
import {Router, CanActivate, RouterState} from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate() {
    let url : string = this.router.routerState.snapshot.url;
    if (localStorage.getItem('currentUser')) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page
    this.router.navigate(['/login'], {queryParams : {redirectUrl : url}});
    return false;
  }
}
