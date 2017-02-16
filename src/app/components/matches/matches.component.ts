import {Component, OnInit} from "@angular/core";
import {SeasonDTO} from "../../ws/model/SeasonDTO";
import {MatchesrestcontrollerApi} from "../../ws/api/MatchesrestcontrollerApi";
import {SeasonsrestcontrollerApi} from "../../ws/api/SeasonsrestcontrollerApi";
import {LoginService} from "../../services/login.service";
import {Observable} from "rxjs";

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
          <app-season 
          *ngFor="let season of seasons" [season]="season.season" [matches]="season.matches"></app-season>
        </div>
    </div>
  `,
    styles: []
})
export class MatchesComponent implements OnInit {
    private seasons: Array<Season> = [];
    private loaded: boolean = false;

    constructor(private _matchesApi: MatchesrestcontrollerApi,
                private _seasonsApi: SeasonsrestcontrollerApi,
                private _loginService: LoginService) {
    }

    ngOnInit() {
        this._seasonsApi.getSeasonsUsingGET()
            .subscribe(r => {
                Observable.from(r).flatMap(
                    s => {
                        return this._matchesApi.matchesForSeason(s.id, this._loginService.jwtHeader)
                            .map(m => {
                                return {season: s, matches: m};
                            })
                    }
                )
                    .subscribe(seasonObject => {
                        this.seasons.push(seasonObject);
                        this.loaded = true;
                    })
            })
    }

    isAdmin() {
        return this._loginService.isAdmin();
    }
}

export interface Season {
    season?: SeasonDTO;

    matches?: any[];

}