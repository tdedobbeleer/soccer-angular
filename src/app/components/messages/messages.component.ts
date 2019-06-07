import {Component, OnInit} from '@angular/core';
import {SecUtil} from '../../classes/sec-util';
import {ErrorHandlerService} from '../../services/error-handler.service';
import {NewsRestControllerService, PageDTONewsDTO} from '../../ws/soccer';

@Component({
  selector: 'app-messages',
  template: `
   <div class="container m-t-1">
    <ul class="breadcrumb">
        <li>Home
        </li>
    </ul>
    
    <div class="row">
       <div class="col-md-4">
       <div class="input-group">
          <input type="text" [(ngModel)]="searchTerm" class="form-control" placeholder="{{'text.search' | translate}}">
          <span class="input-group-btn">
                  <button (click)="getPage(0)" class="btn btn-primary"><span class="glyphicon glyphicon-search"></span></button>
          </span>
        </div>
      </div>
      <div class="col-md-1 col-md-offset-11 m-t-1 m-b-1">
      <div class="pull-right">
       <span class="btn-group" *ngIf="isAdmin()">
            <button type="button" class="btn btn-lg btn-danger" aria-label="Create message" [routerLink]="['/messages/create']" routerLinkActive="active" title="{{'tooltip.news.add' | translate}}">
                <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
            </button>
        </span>  
        </div>
      </div>
    </div>
  </div>

  <div class="container">
    <div class="row m-t-1">
        <div class="col-md-12">
            <div class="box" *ngIf="newsPage?.totalPages == 0">
               <p>{{"text.messages.empty" | translate}}</p>
            </div>
            <app-loading [loading]="loading"></app-loading>
            <div *ngIf="!loading">
            <app-pagination (onClick)="getPage($event)" [page]="newsPage"></app-pagination>
            <div id="blog-homepage" *ngIf="!loading">
                <div id="default">
                    <div class="news-div">
                      <app-message
                        *ngFor="let message of newsPage?.list" [message]="message">
                      </app-message>
                    </div>
                </div>
            </div>
            <app-pagination (onClick)="getPage($event)" [page]="newsPage"></app-pagination>
            </div>
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

    constructor(private _api: NewsRestControllerService, private _errorHandler: ErrorHandlerService) {
  }

  ngOnInit() {
    this.getPage(this.currentPage);
    SecUtil.userUpdated.subscribe(() => this.getPage(this.currentPage));
  }

  getPage(page: number) {
    this.loading = true;

      this._api.getNewsPage(page, this.searchTerm, 10)
        .subscribe(
            n => {
              this.newsPage = n;
              this.loading = false;
            },
            err => this._errorHandler.handle(err));
  }

  isAdmin() {
    return SecUtil.isAdmin();
  }
}
