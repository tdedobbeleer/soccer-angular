import {Component, OnInit} from "@angular/core";
import {PollrestcontrollerApi} from "../../ws/soccer/api/PollrestcontrollerApi";
import {PageDTOMatchPollDTO} from "../../ws/soccer/model/PageDTOMatchPollDTO";
import {SecUtil} from "../../classes/sec-util";
import {ErrorHandlerService} from "../../services/error-handler.service";

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
      <div class="box" *ngIf="motmPage?.totalPages == 0">
         <p>{{"text.motm.empty" | translate}}</p>
      </div>
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
    currentPage: any = 0;

    constructor(private _api: PollrestcontrollerApi, private _errorHandler: ErrorHandlerService) {
    }

    ngOnInit() {
        this.init();
        SecUtil.userUpdated.subscribe(() => this.init());

    }

    private init() {
        this.loading = true;
        this.getPage(this.currentPage);
    }

    getPage(page) {
        this.loading = true;
        this._api.getAllMatchPollsUsingGET(page, 5, "", SecUtil.getJwtHeaders()).subscribe(p => {
            this.motmPage = p;
            this.loading = true;
            this.currentPage = page;
            },
            e => {
                this._errorHandler.handle(e);
            }
        );
    }

}
