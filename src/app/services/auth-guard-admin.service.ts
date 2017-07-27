import {Injectable, Inject} from "@angular/core";
import {Router, CanActivate} from "@angular/router";
import {LoginService} from "./login.service";
import {DOCUMENT} from "@angular/common";
import {SecUtil} from "../classes/sec-util";

@Injectable()
export class AuthGuardAdminService implements CanActivate {

    constructor(private _router: Router, private _service: LoginService, @Inject(DOCUMENT) private document: any) {
    }

    canActivate() {
        let remoteUrl = document.location.pathname ? document.location.pathname.slice(1) : "";
        let url: string = this._router.routerState.snapshot.url;
        if (SecUtil.isAdmin()) {
            // logged in and has role so true
            return true;
        }

        // not logged in so redirect to login page
        this._router.navigate(['/login'], {queryParams: {redirectUrl: url ? url : remoteUrl}});
        return false;
    }
}
