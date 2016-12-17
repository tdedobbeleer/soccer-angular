import {Injectable} from "@angular/core";
import {Router, CanActivate} from "@angular/router";
import {LoginService} from "./login.service";

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private _service: LoginService) {
  }

  canActivate() {
    let url: string = this.router.routerState.snapshot.url;
    if (this._service.isLoggedIn()) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page
    this.router.navigate(['/login'], {queryParams: {redirectUrl: url}});
    return false;
  }

}
