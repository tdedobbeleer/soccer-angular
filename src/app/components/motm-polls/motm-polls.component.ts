import {Component, OnInit} from "@angular/core";
import {SecUtil} from "../../classes/sec-util";
import {ErrorHandlerService} from "../../services/error-handler.service";
import {PageDTOMatchPollDTO, PollRestControllerService} from "../../ws/soccer";

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
      <app-loading [loading]="loading"></app-loading>
      <div class="box" *ngIf="motmPage?.totalPages == 0">
         <p>{{"text.motm.empty" | translate}}</p>
      </div>
      <div  *ngIf="!loading">
      <div class="row m-b-1">
          <app-pagination (onClick)="getPage($event)" [page]="motmPage"></app-pagination>
      </div>
      <div class="row">
      <div  *ngFor="let poll of motmPage?.list; let i = index">
        <div class="col-md-6">
            <app-motm-poll [poll]="poll"></app-motm-poll>
        </div>
        <div [ngClass]="{clearfix: (i+1)%2==0}"></div>
      </div>
      </div>
      <div class="clearfix"></div>
      <div class="row m-t-1">
          <app-pagination (onClick)="getPage($event)" [page]="motmPage"></app-pagination>
      </div>
      </div>
  </div>
  `,
    styles: []
})
export class MotmPollsComponent implements OnInit {
    motmPage: PageDTOMatchPollDTO;
    loading: boolean;
    currentPage: any = 0;

    constructor(private _api: PollRestControllerService, private _errorHandler: ErrorHandlerService) {
    }

    ngOnInit() {
        this.init();
        SecUtil.userUpdated.subscribe(() => this.init());

    }

    private init() {
        this.getPage(this.currentPage);
    }

    getPage(page) {
        this.loading = true;

        this._api.getMatchPolls(page, 6, "").subscribe(p => {
            this.motmPage = p;
                this.loading = false;
            this.currentPage = page;
            },
            e => {
                this._errorHandler.handle(e);
            }
        );
    }

}
