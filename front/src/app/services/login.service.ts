import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {SecUtil} from "../classes/sec-util";
import {AuthenticationControllerService, AuthenticationRequestDTO, Configuration} from "../ws/soccer";
import {map} from "rxjs/operators";

@Injectable()
export class LoginService {
    constructor(private _api: AuthenticationControllerService, private configuration: Configuration) {

    }

    init() {
        //Check if the user is truly loggedIn
        if (SecUtil.isLoggedIn()) {
            //Test if the user can be authenticated
            SecUtil.setApiKey(this.configuration);
            this._api.isFullyAuthenticated()
                .subscribe(
                    r => {
                        console.log("User is logged in");
                    },
                    err => {
                        SecUtil.setUser(undefined);
                        SecUtil.setApiKey(this.configuration);
                    }
                );

        }
    }

    login(username: string, password: string, rememberMe: boolean): Observable<boolean> {
        let r: AuthenticationRequestDTO = {username: username, password: password, rememberMe: rememberMe};

        return this._api.authenticate(r).pipe(
            map(response => {
                // login successful if there's a jwt token in the response
                let token = response && response.token;
                if (token) {
                    SecUtil.setUser(response);
                    SecUtil.setApiKey(this.configuration);
                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            })
        );

    }

    logout(): void {
        SecUtil.setUser(undefined);
        SecUtil.setApiKey(this.configuration);
    }
}
