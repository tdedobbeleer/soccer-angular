import {Component, OnInit} from "@angular/core";
import {PageDTONewsDTO} from "../../ws/soccer/model/PageDTONewsDTO";
import {NewsrestcontrollerApi} from "../../ws/soccer/api/NewsrestcontrollerApi";
import {SecUtil} from "../../classes/sec-util";
import {ErrorHandlerService} from "../../services/error-handler.service";

@Component({
  selector: 'app-messages',
  template: `
   <div class="container m-t-1">
    <ul class="breadcrumb">
        <li>Home
        </li>
    </ul>
    <div class="col-md-3 col-md-offset-9">
    <div class="row">
       <div class="input-group">
          <input type="text" [(ngModel)]="searchTerm" class="form-control" placeholder="{{'text.search' | translate}}">
          <span class="input-group-btn">
                  <button (click)="getPage(0)" class="btn btn-primary"><span class="glyphicon glyphicon-search"></span></button>
          </span>
        </div>
      </div>
    </div>
  </div>
  <div class="row m-t-1">
    <div class="col-md-2 col-md-offset-9 col-xs-12">
      <div class="pull-right">
       <span class="btn-group" *ngIf="isAdmin()">
            <button type="button" class="btn btn-lg btn-danger btn-circle" aria-label="Create message" [routerLink]="['/messages/create']" routerLinkActive="active">
                <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
            </button>
        </span>  
      </div>
    </div>
  </div>

  <div class="container">
    <div class="row m-t-1">
        <div class="col-md-12">
            <app-pagination (onClick)="getPage($event)" [page]="newsPage" *ngIf="!loading"></app-pagination>
            <div id="blog-homepage" ng-show="!loading">
                <div id="default">
                    <div class="news-div">
                      <app-message
                        *ngFor="let message of newsPage?.list" [message]="message">
                      </app-message>
                    </div>
                </div>
            </div>
            <app-pagination (onClick)="getPage($event)" [page]="newsPage" *ngIf="!loading"></app-pagination>
        </div>
    </div>
  </div> 
  `,
  styles: []
})
export class MessagesComponent implements OnInit {

  newsPage: PageDTONewsDTO;

  loading: boolean;

  searchTerm: string;
  currentPage: any = 0;

  constructor(private _api: NewsrestcontrollerApi, private _errorHandler: ErrorHandlerService) {
  }

  ngOnInit() {
    this.getPage(this.currentPage);
    SecUtil.userUpdated.subscribe(() => this.getPage(this.currentPage));
  }

  getPage(page: number) {
    this._api.getNewsPage(page, this.searchTerm, 10, SecUtil.getJwtHeaders())
        .subscribe(
            n => this.newsPage = n,
            err => this._errorHandler.handle(err));
  }

  isAdmin() {
    return SecUtil.isAdmin();
  }
}
