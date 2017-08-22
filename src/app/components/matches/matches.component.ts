import {Component, OnInit} from "@angular/core";
import {SeasonDTO} from "../../ws/soccer/model/SeasonDTO";
import {SeasonsrestcontrollerApi} from "../../ws/soccer/api/SeasonsrestcontrollerApi";
import {SecUtil} from "../../classes/sec-util";
import {ErrorHandlerService} from "../../services/error-handler.service";

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
        
        <div class="row">
          <div class="col-md-1 col-md-offset-11">
          <div class="pull-right">
           <span class="btn-group" *ngIf="isAdmin()">
                <button type="button" class="btn btn-lg btn-danger" aria-label="Create message" [routerLink]="['/matches/create']" routerLinkActive="active">
                    <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                </button>
            </span>  
            </div>
          </div>
        </div>
        <div *ngIf="loaded">
          <app-next-match></app-next-match>
          <app-season *ngFor="let season of seasons; let index = index" [season]="season" [show]="index == 0"></app-season>
        </div>
        <div class="box" *ngIf="loaded && seasons?.length == 0">
            <p>{{"text.seasons.empty" | translate}}</p>
        </div>
    </div>
  `,
    styles: []
})
export class MatchesComponent implements OnInit {
    seasons: SeasonDTO[];
    loaded: boolean = false;

    constructor(private _seasonsApi: SeasonsrestcontrollerApi,
                private _errorHandler: ErrorHandlerService) {
    }

    ngOnInit() {
        this.init();
        SecUtil.userUpdated.subscribe(() => this.init());
    }

    private init() {
        this._seasonsApi.getSeasons()
            .subscribe(
                s => {
                    this.seasons = s;
                    this.loaded = true;
                },
                e => {
                    this._errorHandler.handle(e);
                    this.loaded = true;
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