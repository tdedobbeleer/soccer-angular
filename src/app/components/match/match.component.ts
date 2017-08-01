import {Component, OnInit, Input} from "@angular/core";
import {MatchDTO} from "../../ws/soccer/model/MatchDTO";
import {SecUtil} from "../../classes/sec-util";
import {MatchesrestcontrollerApi} from "../../ws/soccer/api/MatchesrestcontrollerApi";
import {ErrorHandlerService} from "../../services/error-handler.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-match',
    styles: [`    
    /* visited link */
    .expand:visited, .expand:hover, .expand:active, .expand:focus {
        background-color: white;
        border: 0;
    }
    .expand {
        border: 0;
    }
    .box.match {
        padding-bottom: 0px;
    }
  `],
    template: `
   
    <div class="box match" *ngIf="!deleted">
        <div class="row">
            <div class="col-md-12 col-xs-12">
                <div class="row m-b-1">
                    <div class="col-md-3 col-sm-12 col-xs-12 hidden-xs">
                    <h5><span class="glyphicon glyphicon-calendar" aria-hidden="true"></span>&nbsp;{{match?.date}} - <span class="glyphicon glyphicon-time" aria-hidden="true"></span>&nbsp;{{match?.hour}}</h5>
                    </div>
                    <div class="col-md-6">
                        <div class="row text-center">
                            <div class="col-md-5 col-xs-4 right"><h4>{{match?.homeTeam?.name}}</h4></div>
                            <div class="col-md-2 col-xs-4 text-center score"><h4 *ngIf="match.status != matchStatus.PLAYED">&nbsp;-&nbsp;</h4><h4 *ngIf="match.status == matchStatus.PLAYED">{{match?.htGoals}} - {{match?.atGoals}}</h4></div>
                            <div class="col-md-5 col-xs-4 left"><h4>{{match?.awayTeam?.name}}</h4></div>
                        </div>
                    </div>
                    <div class="col-md-3 col-xs-12 col-sm-12">
                      <div class="row text-center visible-sm visible-xs">
                          <h5><span class="glyphicon glyphicon-calendar" aria-hidden="true"></span>&nbsp;{{match?.date}} - <span class="glyphicon glyphicon-time" aria-hidden="true"></span>&nbsp;{{match?.hour}}</h5>
                      </div>
                      <div class="text-center">
                          <div class="btn-group">
                                  <button *ngIf="match.address?.googleLink" type="button" class="btn btn-sm" aria-label="Map" (click)="showMap = !showMap">
                                      <span class="glyphicon glyphicon-map-marker" aria-hidden="true"></span>
                                  </button>
                                  <button type="button" class="btn btn-sm" aria-label="Motm" (click)="showDetails = !showDetails">
                                      <span class="glyphicon glyphicon-user" aria-hidden="true"></span>
                                  </button>
                                  <button type="button" *ngIf="isAdmin()" class="btn btn-sm btn-warning" aria-label="Edit match" (click)="editMatch()">
                                    <span class="glyphicon glyphicon-edit" aria-hidden="true"></span>
                                  </button>
                                  <button type="button" *ngIf="isAdmin()" class="btn btn-sm btn-danger" aria-label="Delete match" (click)="deleteMatch()">
                                    <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
                                  </button>
                              </div>
                         </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                <div *ngIf="showDetails">
                    <div *ngFor="let g of match.goals">
                        <div>
                            <span *ngIf="g.scorer"><i class="fa fa-futbol-o"></i>&nbsp;{{g.scorer.name}}</span>
                            <span *ngIf="!g.scorer"><i class="fa fa-futbol-o"></i>&nbsp;{{'text.matches.ownGoal' | translate}}</span>
                            <span *ngIf="g.assist">({{g.assist.name}})</span>
                        </div>
                    </div>
                </div>
                <div *ngIf="showMap">
                    <iframe id="mapFrame" width="100%" height="450" scrolling="no" marginheight="0" marginwidth="0" [src]="match.address?.googleLink | safe" frameborder="0"></iframe>
                </div>
                </div>
            </div>
        </div>
        <a href="javascript:void(0)" class="btn btn-block btn-default expand" (click)="showDetails = !showDetails"><span class="glyphicon glyphicon-menu-down"></span></a>
    </div>
`
})
export class MatchComponent implements OnInit {
    @Input() match: MatchDTO;

    deleted: boolean;
    showDetails: boolean;
    showMap: boolean;

    matchStatus = MatchDTO.StatusEnum;

    constructor(private _api: MatchesrestcontrollerApi, private _errorHandler: ErrorHandlerService, private _router: Router) {
    }

    ngOnInit() {

    }

    isAdmin(): boolean {
        return SecUtil.isAdmin();
    }

    deleteMatch() {
        this._api.deleteMatch(this.match, SecUtil.getJwtHeaders()).subscribe(
            () => {
                this.deleted = true
            },
            e => {
                this._errorHandler.handle(e)
            }
        )
    }

    editMatch() {
        this._router.navigate(['/matches/edit'], {queryParams: {id: this.match.id}});
    }

}
