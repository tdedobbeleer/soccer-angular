import {Injectable} from "@angular/core";
import {AuthenticationRequestDTO} from "../ws/soccer/model/AuthenticationRequestDTO";
import {AuthenticationcontrollerApi} from "../ws/soccer/api/AuthenticationcontrollerApi";
import {Observable} from "rxjs";
import {SecUtil} from "../classes/sec-util";

@Injectable()
export class LoginService {
    constructor(private _api: AuthenticationcontrollerApi) {

    }

    init() {
        //Check if the user is truly loggedIn
        if (SecUtil.isLoggedIn()) {
            //Test if the user can be authenticated
            this._api.isFullyAuthenticated(SecUtil.getJwtHeaders())
                .subscribe(
                    r => {
                        console.log("User is logged in");
                    },
                    err => {
                        SecUtil.setUser(undefined);
                });

        }
    }

    login(username: string, password: string, rememberMe: boolean): Observable<boolean> {
        let r: AuthenticationRequestDTO = {username: username, password: password, rememberMe: rememberMe};
        return this._api.authenticate(r)
            .map(response => {
                // login successful if there's a jwt token in the response
                let token = response && response.token;
                if (token) {
                    SecUtil.setUser(response);
                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
    }

    logout(): void {
        SecUtil.setUser(undefined);
    }
}
