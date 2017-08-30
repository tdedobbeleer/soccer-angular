import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-activate-account',
    template: `
    
   <div class="container m-t-1">
      <ul class="breadcrumb">
          <li><a href="#" [routerLink]="['/']" routerLinkActive="active">{{'nav.home' | translate}}</a>
          <li>{{'nav.accounts.activate' | translate}}</li>
      </ul>

      <app-activate-account-form [accountId]="accountId"></app-activate-account-form>
  </div>
  `,
    styles: []
})
export class ActivateAccountComponent implements OnInit {

    accountId: number;

    constructor(private _route: ActivatedRoute) {
    }

    ngOnInit() {
        this._route.params.subscribe(params => {
            this.accountId = params['id'];
        });
    }

}
