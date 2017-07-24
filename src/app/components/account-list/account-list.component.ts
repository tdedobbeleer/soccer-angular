import {Component, OnInit} from "@angular/core";
import {AccountrestcontrollerApi} from "../../ws/soccer/api/AccountrestcontrollerApi";
import {AccountDTO} from "../../ws/soccer/model/AccountDTO";
import {ErrorHandlerService} from "../../services/error-handler.service";
import {Response} from "@angular/http";
import {LoginService} from "../../services/login.service";

@Component({
    selector: 'app-account-list',
    template: `
   <div class="container m-t-1">
      <ul class="breadcrumb">
          <li><a href="#" [routerLink]="['/']" routerLinkActive="active">{{'nav.home' | translate}}</a>
          <li>{{'nav.accounts' | translate}}</li>
      </ul>
  </div>
  <div class="m-t-1 container">
    <app-account *ngFor="let account of accountList" [account]="account"></app-account>
  </div>
  `,
    styles: []
})
export class AccountListComponent implements OnInit {
    accountList: AccountDTO[];

    constructor(private _api: AccountrestcontrollerApi, private _loginService: LoginService, private _errorService: ErrorHandlerService) {
    }

    ngOnInit() {
        this._api.getAccounts(this._loginService.jwtHeader).subscribe(
            a => {
                this.accountList = a;
            },
            (error: Response) => {
                this._errorService.handle(error);
            }
        )
    }

}
