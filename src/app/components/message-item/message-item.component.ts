import {Component, OnInit} from '@angular/core';
import {ErrorHandlerService} from '../../services/error-handler.service';
import {ActivatedRoute} from '@angular/router';
import {NewsDTO, NewsRestControllerService} from '../../ws/soccer';

@Component({
    selector: 'app-message-item',
    template: `
    <div class="container">
        <ul class="breadcrumb">
        <li><a [routerLink]="['/']" routerLinkActive="active"><span class="fa fa-home"></span>&nbsp;Home</a></li>
        </ul>
        <app-loading [loading]="loading"></app-loading>    
        <div id="blog-homepage" *ngIf="!loading">
            <div id="default">
                <div class="news-div">
                    <app-message [message]="message"></app-message>
                </div>
            </div>
        </div>
       
    </div>
  `,
    styles: []
})
export class MessageItemComponent implements OnInit {
    message: NewsDTO;
    loading: boolean;

    constructor(private _api: NewsRestControllerService, private _errorHandler: ErrorHandlerService, private _route: ActivatedRoute) {
    }

    ngOnInit() {
        this.loading = true;
        this._route.params.subscribe(params => {

            this._api.getNews(params['id']).subscribe(
                n => {
                    this.message = n;
                    this.loading = false;
                },
                e => {
                    this.loading = false;
                    this._errorHandler.handle(e);
                }
            );
        });

    }

}
