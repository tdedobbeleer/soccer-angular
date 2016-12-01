import { Injectable } from '@angular/core';
import {AuthenticationRequestDTO} from "../ws/model/AuthenticationRequestDTO";
import {AuthenticationcontrollerApi} from "../ws/api/AuthenticationcontrollerApi";
import {Observable} from "rxjs";

@Injectable()
export class LoginService {
  private token: string;

  constructor(
      private _api: AuthenticationcontrollerApi
  ) {
    // set token if saved in local storage
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  login(username : string, password : string) : Observable<boolean> {
    let r: AuthenticationRequestDTO = { username :  username, password : password };
    return this._api.authenticate(r)
        .map((response) => {
          // login successful if there's a jwt token in the response
          let token = response && response.token;
          if (token) {
            // store username and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(response));
            // return true to indicate successful login
            return true;
          } else {
            // return false to indicate failed login
            return false;
          }
        });
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem('currentUser');
  }

}
