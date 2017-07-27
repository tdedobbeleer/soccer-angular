import {Headers} from "@angular/http";
import {isNullOrUndefined, isUndefined} from "util";
import {EventEmitter} from "@angular/core";
export class SecUtil {
    private static LOCAL_STORAGE_USER: string = 'currentUser';
    public static userUpdated: EventEmitter<any> = new EventEmitter();

    static getUser() {
        if (this.isLoggedIn()) {
            return JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_USER));
        }
        return undefined;
    }

    static isLoggedIn() {
        return !isNullOrUndefined(localStorage.getItem(this.LOCAL_STORAGE_USER));
    }

    static isAdmin() {
        return (this.isLoggedIn() && -1 !== this.getUser().roles.indexOf("ROLE_ADMIN"));
    }

    static setUser(user: any) {
        if (isUndefined(user)) {
            localStorage.removeItem(this.LOCAL_STORAGE_USER);
        }
        else {
            //store username and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem(this.LOCAL_STORAGE_USER, JSON.stringify(user));
        }
        this.userUpdated.emit(user);
    }

    static getJwtHeaders() {
        if (this.isLoggedIn()) {
            let token = this.getUser().token;
            return this.getHeaders(token);
        }
        return undefined;
    }

    private static getHeaders(token: string) {
        let headers: Headers = new Headers();
        headers.append('X-Auth-Token', token);
        headers.append("Content-Type", "application/json");
        return {headers: headers};
    }
}
