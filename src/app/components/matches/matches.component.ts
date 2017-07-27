import {Component, OnInit} from "@angular/core";
import {SeasonDTO} from "../../ws/soccer/model/SeasonDTO";
import {MatchesrestcontrollerApi} from "../../ws/soccer/api/MatchesrestcontrollerApi";
import {SeasonsrestcontrollerApi} from "../../ws/soccer/api/SeasonsrestcontrollerApi";
import {Observable} from "rxjs";
import {SecUtil} from "../../classes/sec-util";

@Component({
    selector: 'app-matches',
    template: `
    <div class="col-md-2 col-md-offset-9">
        <div class="pull-right">
            <span class="btn-group" *ngIf="isAdmin()">
                <button type="button" class="btn btn-lg btn-danger btn-circle" aria-label="Create message" [routerLink]="['/matches/create']" routerLinkActive="active">
                    <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                </button>
            </span>  
        </div>
    </div>
    <div class="container">
        <div *ngIf="loaded">
          <app-next-match></app-next-match>
          <app-season *ngFor="let season of seasons" [season]="season.season" [matches]="season.matches"></app-season>
        </div>
    </div>
  `,
    styles: []
})
export class MatchesComponent implements OnInit {
    seasons: Array<Season> = [];
    loaded: boolean = false;

    constructor(private _matchesApi: MatchesrestcontrollerApi,
                private _seasonsApi: SeasonsrestcontrollerApi) {
    }

    ngOnInit() {
        this.init();
        SecUtil.userUpdated.subscribe(() => this.init());
    }

    private init() {
        this._seasonsApi.getSeasons()
            .subscribe(r => {
                Observable.from(r).flatMap(
                    s => {
                        return this._matchesApi.matchesForSeason(s.id, SecUtil.getJwtHeaders())
                            .map(m => {
                                return {season: s, matches: m};
                            })
                    }
                )
                    .subscribe(seasonObject => {
                        this.seasons.push(seasonObject);
                        this.loaded = true;
                    })
            });
    }

    isAdmin() {
        return SecUtil.isAdmin();
    }
}

export interface Season {
    season?: SeasonDTO;

    matches?: any[];

}