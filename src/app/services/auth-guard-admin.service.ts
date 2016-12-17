import {Injectable} from "@angular/core";
import {Router, CanActivate} from "@angular/router";
import {LoginService} from "./login.service";

@Injectable()
export class AuthGuardAdminService implements CanActivate {

    constructor(private router: Router, private _service: LoginService) {
    }

    canActivate() {
        let url: string = this.router.routerState.snapshot.url;
        let currentUser: any = this._service.getUser();
        if (this._service.isLoggedIn() && AuthGuardAdminService.hasRole(currentUser.roles, "ROLE_ADMIN")) {
            // logged in and has role so true
            return true;
        }

        // not logged in so redirect to login page
        this.router.navigate(['/login'], {queryParams: {redirectUrl: url}});
        return false;
    }

    private static hasRole(roles: any[], role: string): boolean {
        return roles.indexOf(role) > -1
    }

}
