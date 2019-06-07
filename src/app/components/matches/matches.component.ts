import {Component, OnInit} from '@angular/core';
import {SecUtil} from '../../classes/sec-util';
import {ErrorHandlerService} from '../../services/error-handler.service';
import {SeasonDTO, SeasonsRestControllerService} from '../../ws/soccer';

@Component({
    selector: 'app-matches',
    template: `
  
    <div class="container">
        <ul class="breadcrumb">
            <li>
                <a [routerLink]="['/']" routerLinkActive="active"><span class="glyphicon glyphicon-home"></span>&nbsp;Home</a>
            </li>
            <li>
                {{'nav.matches' | translate }}
            </li>
        </ul>
        
        <div class="row m-b-1">
          <div class="col-md-1 col-md-offset-11">
          <div class="pull-right">
           <span class="btn-group" *ngIf="isAdmin()">
                <button type="button" class="btn btn-lg btn-danger" aria-label="Create message" [routerLink]="['/matches/create']" routerLinkActive="active" title="{{'tooltip.matches.add' | translate}}">
                    <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                </button>
            </span>  
            </div>
          </div>
        </div>
        <app-loading [loading]="loading"></app-loading>
        <div *ngIf="!loading">
          <app-next-match></app-next-match>
          <app-season *ngFor="let season of seasons; let index = index" [season]="season" [show]="index == 0"></app-season>
        </div>
        <div class="box" *ngIf="seasons?.length == 0">
            <p>{{"text.seasons.empty" | translate}}</p>
        </div>
    </div>
  `,
    styles: []
})
export class MatchesComponent implements OnInit {
    seasons: SeasonDTO[];
    loading: boolean;

    constructor(private _seasonsApi: SeasonsRestControllerService,
                private _errorHandler: ErrorHandlerService) {
    }

    ngOnInit() {
        this.init();
        SecUtil.userUpdated.subscribe(() => this.init());
    }

    private init() {
        this.loading = true;
        this._seasonsApi.getSeasons()
            .subscribe(
                s => {
                    this.seasons = s;
                    this.loading = false;
                },
                e => {
                    this._errorHandler.handle(e);
                    this.loading = false;
                }
            );
    }

    isAdmin() {
        return SecUtil.isAdmin();
    }
}

export interface Season {
    season?: SeasonDTO;

    matches?: any[];

}
