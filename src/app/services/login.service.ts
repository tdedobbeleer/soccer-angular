import {Injectable} from "@angular/core";
import {AuthenticationRequestDTO} from "../ws/model/AuthenticationRequestDTO";
import {AuthenticationcontrollerApi} from "../ws/api/AuthenticationcontrollerApi";
import {Observable} from "rxjs";
import {Headers} from "@angular/http";

@Injectable()
export class LoginService {
    public jwtHeader;

    private user: any = null;
    private LOCAL_STORAGE_USER: string = 'currentUser';

    constructor(private _api: AuthenticationcontrollerApi) {

    }

    init() {
        // set token if saved in local storage
        let currentUser = this.getUserFromStorage();
        //Set user
        this.setUser(currentUser);
        //set default headers
        if (currentUser) {
            //Test if the user can be authenticated
            this._api.isFullyAuthenticated(this.getHeaders(currentUser.token))
                .subscribe(r => {
                    if (r) {
                        this.setUser(currentUser);
                    } else {
                        localStorage.removeItem(this.LOCAL_STORAGE_USER);
                        this.resetHeaders();
                    }
                });
        } else {
            this.resetHeaders();
        }
    }

    login(username: string, password: string): Observable<boolean> {
        let r: AuthenticationRequestDTO = {username: username, password: password};
        return this._api.authenticate(r)
            .map(response => {
                // login successful if there's a jwt token in the response
                let token = response && response.token;
                if (token) {
                    this.setUser(response);
                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
    }

    logout(): void {
        this.resetHeaders();
        this.user = null;
        localStorage.removeItem(this.LOCAL_STORAGE_USER);
    }

    isLoggedIn(): boolean {
        return this.user != null;
    }

    getUser() {
        return this.user;
    }

    isAdmin() {
        return (-1 !== this.user.roles.indexOf("ROLE_ADMIN"));
    }

    private getUserFromStorage() {
        return JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_USER));
    }

    private resetHeaders() {
        this.jwtHeader = {};
    }

    private getHeaders(token: string) {
        let headers: Headers = new Headers();
        headers.append('X-Auth-Token', token);
        headers.append("Content-Type", "application/json");
        return {headers: headers};
    }

    private setUser(user: any) {
        if (user != null) {
            //store username and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem(this.LOCAL_STORAGE_USER, JSON.stringify(user));
            this.jwtHeader = this.getHeaders(user.token);
            this.user = user;
        }
    }
}
