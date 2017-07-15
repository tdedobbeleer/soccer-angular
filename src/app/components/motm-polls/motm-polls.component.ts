import {Component, OnInit} from "@angular/core";
import {PollrestcontrollerApi} from "../../ws/soccer/api/PollrestcontrollerApi";
import {LoginService} from "../../services/login.service";
import {PageDTOMatchPollDTO} from "../../ws/soccer/model/PageDTOMatchPollDTO";

@Component({
    selector: 'app-motm-polls',
    template: `
  <div class="container m-t-1">
      <ul class="breadcrumb">
          <li><a href="#" [routerLink]="['/']" routerLinkActive="active">{{'nav.home' | translate}}</a>
          <li><a href="#" [routerLink]="['/matches']" routerLinkActive="active">{{'nav.matches' | translate}}</a>
          </li>
          <li>{{'nav.motm' | translate}}</li>
      </ul>
  </div>
  <div class="m-t-1 container">
      <div class="row m-b-1">
          <app-pagination (onClick)="getPage($event)" [page]="motmPage" *ngIf="!loading"></app-pagination>
      </div>
      <div *ngIf="!loading && motmPage?.list.length == 0">
        <div class="alert alert-warning">
            {{'text.no.match.polls' | translate}}
        </div>
      </div>
      <div  *ngFor="let poll of motmPage?.list">
        <div class="clearfix" *ngIf="$index % 2 == 0"></div>
        <app-motm-poll [poll]="poll"></app-motm-poll>
      </div>
      <div class="clearfix"></div>
      <div class="row m-t-1">
          <app-pagination (onClick)="getPage($event)" [page]="motmPage" *ngIf="!loading"></app-pagination>
      </div>
  </div>
  `,
    styles: []
})
export class MotmPollsComponent implements OnInit {
    motmPage: PageDTOMatchPollDTO;
    loading: boolean;

    constructor(private _api: PollrestcontrollerApi, private _loginService: LoginService) {
    }

    ngOnInit() {
        this.loading = true;
        this._api.getAllMatchPollsUsingGET(0, 5, "", this._loginService.jwtHeader).subscribe(p => {
            this.motmPage = p;
            this.loading = false;
        })
    }

    getPage(page) {
        this.loading = true;
        this._api.getAllMatchPollsUsingGET(page, 5, "", this._loginService.jwtHeader).subscribe(p => {
            this.motmPage = p;
            this.loading = true;
        })
    }

}
