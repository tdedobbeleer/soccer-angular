import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ErrorHandlerService} from "../../services/error-handler.service";
import {isNullOrUndefined} from "util";
import {MatchDoodleDTO, MatchDTO, MatchesRestControllerService, SeasonDTO} from '../../ws/soccer';
import MatchStatusEnum = MatchDoodleDTO.MatchStatusEnum;
import { TabsetComponent } from 'ngx-bootstrap';

@Component({
    selector: 'app-season',
    template: `
    <div class="box">
    <a (click)="getMatches();show = !show"><h3>{{'title.season' | translate}} {{season?.description}}</h3></a>
    <div *ngIf="show">
        <tabset #staticTabs>
            <tab heading="{{'text.matches.tocome' | translate}}">
                <div id="matchesToCome">
                    <app-match *ngFor="let match of matchesToCome" [match]="match"></app-match>
                    <div class="box" *ngIf="matchesToCome?.length == 0">
                        <p>{{"text.matches.tocome.empty" | translate}}</p>
                    </div>
                </div>
            </tab>
            <tab heading="{{'text.matches.played' | translate}}">
                <div id="matchesPlayed">
                    <app-match *ngFor="let match of matchesPlayed" [match]="match"></app-match>
                    <div class="box" *ngIf="matchesPlayed?.length == 0">
                        <p>{{"text.matches.played.empty" | translate}}</p>
                    </div>
                </div>
            </tab>
        </tabset>
    </div>
    </div>
  `,
    styles: []
})
export class SeasonComponent implements OnInit {
    @Input() season: SeasonDTO;
    @Input() show: boolean;
    @ViewChild('staticTabs') staticTabs: TabsetComponent;

    matchesPlayed: MatchDTO[];
    matchesToCome: MatchDTO[];

    constructor(private _matchesApi: MatchesRestControllerService,
                private _errorHandler: ErrorHandlerService) {
    }

    ngOnInit() {
        if (this.show) {
            this.getMatches();
        }
    }

    getMatches() {
        if (isNullOrUndefined(this.matchesPlayed) || isNullOrUndefined(this.matchesToCome)) {
            this.matchesToCome = [];
            this.matchesPlayed = [];
            this._matchesApi.matchesForSeason(this.season.id).subscribe(
                l => {
                    l.forEach(m => {
                        if (m.status === MatchStatusEnum.PLAYED || m.status === MatchStatusEnum.CANCELLED) {
                            this.matchesPlayed.push(m);
                        } else {
                            this.matchesToCome.push(m);
                        }
                    });
                    //Reverse collection
                    this.matchesPlayed = this.matchesPlayed.reverse();
                    if (this.matchesToCome.length > 0) {
                        this.staticTabs.tabs[0].active = true;
                    } else {
                        this.staticTabs.tabs[1].active = true;
                    }
                },
                e => {
                    this._errorHandler.handle(e);
                }
            )
        }

    }

}
