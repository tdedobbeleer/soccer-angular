import {Component, OnInit} from "@angular/core";
import {ErrorHandlerService} from "../../services/error-handler.service";
import {AccountProfileRestControllerService, ProfileDTO} from "../../ws/soccer";
import PositionEnum = ProfileDTO.PositionEnum;

@Component({
    selector: 'app-player-list',
    template: `
  <div class="container">
    <app-loading [loading]="loading"></app-loading>
    <div *ngIf="!loading">
    <div class="row">
    <div id="carousel-team" class="carousel slide hidden-xs hidden-sm" data-ride="carousel">
        <!-- Wrapper for slides -->
        <div class="carousel-inner" role="listbox">
            <div class="item active thumbnail">
                <img src="https://res.cloudinary.com/dtwkkwtee/image/upload/v1449832072/public/team.jpg">
                <div class="carousel-caption">
                </div>
            </div>
        </div>
    </div>
    </div>
    <div class="team-row row well" *ngIf="goalkeepers">
        <h3 class="text-center">{{'text.goalKeepers' | translate}}</h3>
        <app-player *ngFor="let p of goalkeepers" [profile]="p"></app-player>
    </div>
    <div class="team-row row well" *ngIf="defenders">
        <h3 class="text-center">{{'text.defenders' | translate}}</h3>
        <app-player *ngFor="let p of defenders" [profile]="p"></app-player>
    </div>
    <div class="team-row row well" *ngIf="midfielders">
        <h3 class="text-center">{{'text.midfielders' | translate}}</h3>
        <app-player *ngFor="let p of midfielders" [profile]="p"></app-player>
    </div>
    <div class="team-row row well" *ngIf="forwards">
        <h3 class="text-center">{{'text.forwards' | translate}}</h3>
        <app-player *ngFor="let p of forwards" [profile]="p"></app-player>
    </div>
    <div class="team-row row well" *ngIf="unknown">
        <h3 class="text-center">{{'text.unknown' | translate}}</h3>
        <app-player *ngFor="let p of unknown" [profile]="p"></app-player>
    </div>
  </div>
  </div>
    
  `,
    styles: []
})
export class PlayerListComponent implements OnInit {
    forwards: ProfileDTO[] = [];
    goalkeepers: ProfileDTO[] = [];
    defenders: ProfileDTO[] = [];
    midfielders: ProfileDTO[] = [];
    unknown: ProfileDTO[] = [];
    loading: boolean;


    constructor(private _api: AccountProfileRestControllerService, private _errorHandler: ErrorHandlerService) {
    }

    ngOnInit() {
        this.loading = true;

        this._api.getAllProfiles().subscribe(
            list => {
                list.forEach(p => {
                    switch (p.position) {
                        case PositionEnum.FORWARD:
                            this.forwards.push(p);
                            break;
                        case PositionEnum.DEFENDER:
                            this.defenders.push(p);
                            break;
                        case PositionEnum.GOALKEEPER:
                            this.goalkeepers.push(p);
                            break;
                        case PositionEnum.MIDFIELDER:
                            this.midfielders.push(p);
                            break;
                        default:
                            this.unknown.push(p);
                            break;
                    }
                });
                this.loading = false;
            },
            e => {
                this.loading = false;
                this._errorHandler.handle(e);
            }
        )
    }

}
