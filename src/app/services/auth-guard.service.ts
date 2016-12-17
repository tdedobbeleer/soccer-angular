import {Injectable} from "@angular/core";
import {Router, CanActivate} from "@angular/router";

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate() {
    let url : string = this.router.routerState.snapshot.url;
    let currentUser: any = localStorage.getItem('currentUser');
    if (currentUser && AuthGuardService.hasRole(currentUser.roles, "ROLE_ADMIN")) {
      // logged in and has role so true
      return true;
    }

    // not logged in so redirect to login page
    this.router.navigate(['/login'], {queryParams : {redirectUrl : url}});
    return false;
  }

  private static hasRole(roles: any[], role: string): boolean {
    return roles.indexOf(role) > -1
  }

}
