import {Component, OnInit, Input} from "@angular/core";
import {SeasonDTO} from "../../ws/soccer/model/SeasonDTO";
import {MatchDTO} from "../../ws/soccer/model/MatchDTO";
import {MatchesrestcontrollerApi} from "../../ws/soccer/api/MatchesrestcontrollerApi";
import {ErrorHandlerService} from "../../services/error-handler.service";
import {isNullOrUndefined} from "util";
import {SecUtil} from "../../classes/sec-util";

@Component({
    selector: 'app-season',
    template: `
    <div class="box">
    <a (click)="getMatches();show = !show"><h3>{{'title.season' | translate}} {{season?.description}}</h3></a>
    <div *ngIf="show">
    <app-match *ngFor="let match of matches" [match]="match"></app-match>
     <div class="box" *ngIf="matches?.length == 0">
            <p>{{"text.matches.empty" | translate}}</p>
    </div>
    </div>
    </div>
  `,
    styles: []
})
export class SeasonComponent implements OnInit {
    @Input() season: SeasonDTO;
    @Input() show: boolean;

    matches: MatchDTO[];

    constructor(private _matchesApi: MatchesrestcontrollerApi,
                private _errorHandler: ErrorHandlerService) {
    }

    ngOnInit() {
        if (this.show) {
            this.getMatches();
        }
    }

    getMatches() {
        if (isNullOrUndefined(this.matches)) {
            this._matchesApi.matchesForSeason(this.season.id, SecUtil.getJwtHeaders()).subscribe(
                m => {
                    this.matches = m;
                },
                e => {
                    this._errorHandler.handle(e);
                }
            )
        }

    }

}
