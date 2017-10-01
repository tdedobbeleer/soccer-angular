import {Component, OnInit, Input} from "@angular/core";
import {ErrorHandlerService} from "../../services/error-handler.service";
import {DoodlerestcontrollerApi} from "../../ws/soccer/api/DoodlerestcontrollerApi";
import {MatchDoodleDTO} from "../../ws/soccer/model/MatchDoodleDTO";
import {PresenceDTO} from "../../ws/soccer/model/PresenceDTO";
import {Router} from "@angular/router";
import {SecUtil} from "../../classes/sec-util";
import {isNullOrUndefined} from "util";

@Component({
    selector: 'app-doodle',
    template: `
    <div class="panel panel-default">
      <div class="panel-heading"><span class="glyphicon glyphicon-calendar" aria-hidden="true"></span>&nbsp;{{matchDoodle.date}} - {{matchDoodle.hour}}
      </div>
      <div class="panel-body">
        <alert [type]="'danger'" *ngIf="error">{{'text.doodle.error' | translate}}</alert>
        <div class="doodle-title">
          <h3>{{matchDoodle.description}}
          </h3>
        </div>
        <div class="doodle-badge btn-group btn-group-lg">
          <a class="btn btn-default doodle-users" data-toggle="tooltip" data-container="body"
             (click)="showUsers = !showUsers"
             title="{{'tooltip.doodle.presences' | translate}}" aria-hidden="true"><span
                  class="glyphicon glyphicon-user"></span> <span
                  class="count-badge">{{matchDoodle.doodle.total}}</span>
          </a>
          <a (click)="changePresence(matchDoodle.doodle.currentPresence)" data-toggle="tooltip" *ngIf="isLoggedIn()"
               data-container="body" title="{{'tooltip.doodle.changePresence' | translate}}"
               data-placement="top" class="btn btn-default"><span
                    [ngClass]="getPresenceClass(matchDoodle.doodle.currentPresence)"
                    aria-hidden="true"></span>
          </a>
          <a (click)="login()" data-toggle="tooltip" data-container="body" *ngIf="!isLoggedIn()"
               title="{{'tooltip.doodle.changePresence' | translate}}"
               data-placement="top" class="btn btn-default"><span class="glyphicon glyphicon-lock grey"
                                                                  aria-hidden="true"></span>
          </a>
        </div>
        <div class="clearfix"></div>
        <div class="pull-right" *ngIf="matchDoodle?.doodle?.currentPresence?.type === presenceEnum.RESERVE" [innerHtml]="'text.doodle.reserve.info' | safeHtml"></div>
      </div>
      <div class="panel-body list" *ngIf="showUsers">
        <div class="doodle-list" *ngFor="let presence of matchDoodle?.doodle?.presences">
            <span class="doodle-list-name">
              <div>{{presence.account.name}}</div>
              <div *ngIf="isAdmin() && presence.modified != null && showModified"><i>({{'text.doodle.modified' | translate}}:
                  {{presence.modified}})</i>
              </div>
            </span>
            <span class="doodle-list-btn">
            <a (click)="changePresence(presence)" data-toggle="tooltip"
               [class.disabled]="!presence.editable"
               data-container="body" class="btn btn-default"><span
                    [ngClass]="getPresenceClass(presence)"
                    aria-hidden="true"></span></a>
            </span>
        </div>
        <div class="clearfix"></div>
        <div *ngIf="matchDoodle?.doodle?.reserves?.length > 0">
        <hr/>
        <h4>{{'text.doodle.reserves' | translate}}</h4>
        <div class="doodle-list" *ngFor="let presence of matchDoodle?.doodle?.reserves">
            <span class="doodle-list-name">
              <div>{{presence.account.name}}</div>
              <div *ngIf="isAdmin() && presence.modified != null && showModified"><i>({{'text.doodle.modified' | translate}}:
                  {{presence.modified}})</i>
              </div>
            </span>
            <span class="doodle-list-btn">
            <a (click)="changePresence(presence)" data-toggle="tooltip"
               [class.disabled]="!presence.editable"
               data-container="body" class="btn btn-default"><span
                    [ngClass]="getPresenceClass(presence)"
                    aria-hidden="true"></span></a>
            </span>
        </div>
    </div>
    </div>
    <div class="panel-body" *ngIf="showUsers && isAdmin()">
          <a class="pull-right" data-toggle="tooltip" data-container="body"
             (click)="showModified = !showModified"
             title="{{'tooltip.doodle.time' | translate}}" aria-hidden="true">
            <span *ngIf="!showModified">{{'text.doodle.show.dates' | translate}}</span>
            <span *ngIf="showModified">{{'text.doodle.hide.dates' | translate}}</span>
          </a>
    </div>
    </div>
  `,
    styles: []
})
export class DoodleComponent implements OnInit {
    @Input() matchDoodle: MatchDoodleDTO;
    showUsers: boolean = false;
    showModified: boolean = false;
    error: any = "";
    presenceEnum = PresenceDTO.TypeEnum;

    constructor(private _router: Router, private _api: DoodlerestcontrollerApi, private _errorHandler: ErrorHandlerService) {
    }

    ngOnInit() {
        //this.setUserProperties();
        //this._loginService.userUpdated.subscribe(this.setUserProperties)
    }

    isAdmin() {
        return SecUtil.isAdmin();
    }

    isLoggedIn() {
        return SecUtil.isLoggedIn();
    }

    login() {
        this._router.navigate(['/login'], {queryParams: {redirectUrl: "doodles"}});
    }

    changePresence(presence: PresenceDTO) {
        if (presence.editable) {
            this._api.changePresence(this.matchDoodle.id, presence.account.id, SecUtil.getJwtHeaders())
                .subscribe(
                    r => {
                        this._api.matchDoodle(this.matchDoodle.id, SecUtil.getJwtHeaders()).subscribe(
                            r => {
                                this.matchDoodle = r;
                            },
                            e => {
                                this.error = this._errorHandler.handle(e);
                            }
                        )
                    },
                    e => {
                        //Something went terribly wrong...
                        this.error = this._errorHandler.handle(e);
                    }
                )
        }

    }

    getPresenceClass(presence: PresenceDTO) {
        //console.log("Creating presence class");
        if (!isNullOrUndefined(presence)) {
            switch (presence.type) {
                case PresenceDTO.TypeEnum.NOTFILLEDIN:
                    return "glyphicon glyphicon-question-sign grey";
                case PresenceDTO.TypeEnum.PRESENT:
                    return "glyphicon glyphicon-ok green";
                case PresenceDTO.TypeEnum.RESERVE:
                    return "glyphicon glyphicon-ok green";
                case PresenceDTO.TypeEnum.NOTPRESENT:
                    return "glyphicon glyphicon-remove red";
                default:
                    return "glyphicon glyphicon-lock grey";
            }
        } else {
            return "glyphicon glyphicon-lock grey";
        }

    }

}
