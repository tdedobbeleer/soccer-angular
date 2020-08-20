import {Component, OnInit} from '@angular/core';
import {ErrorHandlerService} from '../../services/error-handler.service';
import {LoginService} from '../../services/login.service';
import {AccountDTO, AccountRestControllerService} from '../../ws/soccer';

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
  <div class="box">
  <app-loading [loading]="loading"></app-loading>
  <alert [type]="'danger'" [hidden]="!globalError"><span [innerHtml]="globalError | safeHtml"></span></alert>
  <div class="table-responsive">
  <table class="table table-responsive table-striped" *ngIf="!loading">
        <tr>
            <th>Id</th>
            <th>{{"label.email" | translate}}</th>
            <th>{{"label.name" | translate}}</th>
            <th>{{"label.role" | translate}}</th>
            <th></th>
        </tr>
        <tr *ngFor="let account of accountList">
            <td>{{account.id}}</td>
            <td>{{account.username}}</td>
            <td>{{account.name}}</td>
            <td>
                <span *ngIf="account.role == 'ADMIN'" title="{{account.role}}" class="glyphicon glyphicon-king"></span>
                <span *ngIf="account.role == 'USER'" title="{{account.role}}" class="glyphicon glyphicon-pawn"></span>
            </td>
            <td>
                <div class="btn-group">
                    <button *ngIf="account.role == 'USER'" type="button" class="btn" aria-label="Elevate"
                            title="{{'tooltip.accounts.elevate' | translate}}" (click)="changeRole(account)">
                        <span class="glyphicon glyphicon-triangle-top" aria-hidden="true"></span>
                    </button>
                    <button *ngIf="account.role == 'ADMIN'" type="button" class="btn" aria-label="Downgrade"
                            title="{{'tooltip.accounts.downgrade' | translate}}" (click)="changeRole(account)">
                        <span class="glyphicon glyphicon-triangle-bottom" aria-hidden="true"></span>
                    </button>
                    <button *ngIf="account.activated" type="button" class="btn" aria-label="Activate"
                            title="{{'tooltip.accounts.disable' | translate}}" (click)="changeActivation(account)">
                        <span class="glyphicon glyphicon-off" aria-hidden="true"></span>
                    </button>
                    <button *ngIf="!account.activated" type="button" class="btn" aria-label="Disable"
                            title="{{'tooltip.accounts.enable' | translate}}" (click)="changeActivation(account)">
                        <span class="glyphicon glyphicon-play-circle" aria-hidden="true"></span>
                    </button>
                </div>
            </td>
        </tr>

  </table>
  </div>
  </div>
  </div>
  `,
    styles: ['td {padding-top: 3px;}']
})
export class AccountListComponent implements OnInit {
    accountList: AccountDTO[];
    globalError: any;
    loading: boolean;

    constructor(private _api: AccountRestControllerService, private _loginService: LoginService, private _errorService: ErrorHandlerService) {
    }

    ngOnInit() {
        this.loading = true;

        this._api.getAccounts().subscribe(
            a => {
                this.accountList = a;
                this.loading = false;
            },
            (error: Response) => {
                this.loading = false;
                this._errorService.handle(error);
            }
        )
    }

    changeActivation(account: AccountDTO) {
        this._api.changeActivation(account.id, !account.activated).subscribe(
            r => {
                account.activated = !account.activated;
            },
            e => {
                this.globalError = this._errorService.handle(e);
            }
        )
    }

    changeRole(account: AccountDTO) {
        if (account.role == "ADMIN") {
            this._api.demote(account.id).subscribe(
                r => {
                    account.role = "USER";
                },
                e => {
                    this.globalError = this._errorService.handle(e);
                }
            )
        }
        else {
            this._api.elevate(account.id).subscribe(
                r => {
                    account.role = "ADMIN";
                },
                e => {
                    this.globalError = this._errorService.handle(e);
                }
            )
        }

    }

}
