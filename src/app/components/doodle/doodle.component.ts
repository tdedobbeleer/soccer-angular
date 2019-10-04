import {Component, Input, OnInit} from '@angular/core';
import {ErrorHandlerService} from '../../services/error-handler.service';
import {Router} from '@angular/router';
import {SecUtil} from '../../classes/sec-util';
import {isNullOrUndefined} from 'util';
import {DoodleDTO, DoodleRestControllerService, MatchDoodleDTO, PresenceDTO} from '../../ws/soccer';

@Component({
    selector: 'app-doodle',
    template: `
        <div class="panel panel-default" *ngIf="matchDoodle"
             [ngClass]="{'panel-warning': force, 'panel-danger': matchDoodle?.matchStatus == matchStatus.CANCELLED && !force }"
             [ngClass]="{ }">
      <div class="panel-heading"><span class="glyphicon glyphicon-calendar" aria-hidden="true"></span>&nbsp;{{matchDoodle.date}} - {{matchDoodle.hour}}
      </div>
      <div class="panel-body">
        <alert [type]="'danger'" *ngIf="error">{{'text.doodle.error' | translate}}</alert>
        <div class="doodle-title">
          <h3>{{matchDoodle.description}}
              <span *ngIf="matchDoodle?.matchStatus == matchStatus.CANCELLED"
                    class="red">&nbsp;({{'text.match.status.cancelled' | translate}}!)</span>
          </h3>
        </div>
        <div class="doodle-badge btn-group btn-group-lg">
          <a class="btn btn-default doodle-users" data-toggle="tooltip" data-container="body"
             (click)="showUsers = !showUsers"
             title="{{'tooltip.doodle.presences' | translate}}" aria-hidden="true"><span
                  class="glyphicon glyphicon-user"></span> <span
                  class="count-badge">{{matchDoodle.doodle.total}}</span>
          </a>
          <a (click)="changePresence(matchDoodle.doodle.currentPresence, 'current')" data-toggle="tooltip" *ngIf="isLoggedIn() && isDoodleOpen()"
               data-container="body" title="{{'tooltip.doodle.changePresence' | translate}}" [ladda]="loading['current']"
               data-placement="top" class="btn btn-default"><span
                    [ngClass]="getPresenceClass(matchDoodle.doodle.currentPresence)"
                    aria-hidden="true"></span>
          </a>
          <a data-toggle="tooltip" *ngIf="isLoggedIn() && !isDoodleOpen()" disabled="disabled"
               data-container="body" title="{{'tooltip.doodle.changePresence.closed' | translate}}" [ladda]="loading['current']"
               data-placement="top" class="btn btn-default"><span
                    [ngClass]="getPresenceClass(matchDoodle.doodle.currentPresence)"
                    aria-hidden="true"></span>
              &nbsp;
              <span
                      class="glyphicon glyphicon-lock"
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
        <div *ngIf="isAdmin()"class="btn-group m-b-1 text-center-sm">
            <button class="btn btn-success" *ngIf="!force" (click)="force = true" data-toggle="tooltip" title="{{'tooltip.doodle.adminMode' | translate}}">{{'text.doodle.adminMode.enable' | translate}}</button>
            <button class="btn btn-warning" *ngIf="force" (click)="force = false" data-toggle="tooltip" title="{{'tooltip.doodle.adminMode' | translate}}">{{'text.doodle.adminMode.disable' | translate}}</button>
            <a class="btn btn-default" (click)="showModified = !showModified"
             aria-hidden="true">
            <span *ngIf="!showModified">{{'text.doodle.show.dates' | translate}}</span>
            <span *ngIf="showModified">{{'text.doodle.hide.dates' | translate}}</span>
          </a>
        </div>
        <div class="doodle-list" *ngFor="let presence of matchDoodle?.doodle?.presences">
            <span class="doodle-list-name">
              <div>{{presence.account.name}}</div>
              <div *ngIf="isAdmin() && presence.modified != null && showModified"><i>({{'text.doodle.modified' | translate}}:
                  {{presence.modified}})</i>
              </div>
            </span>
            <span class="doodle-list-btn">
            <a (click)="changePresence(presence, presence.account.id)" data-toggle="tooltip" [ladda]="loading[presence.account.id]"
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
            <a (click)="changePresence(presence, presence.account.id)" data-toggle="tooltip" [ladda]="loading[presence.account.id]"
               [class.disabled]="!presence.editable"
               data-container="body" class="btn btn-default"><span
                    [ngClass]="getPresenceClass(presence)"
                    aria-hidden="true"></span></a>
            </span>
        </div>
    </div>
    </div>
    </div>
  `,
    styles: ['.white {color: white !important;}']
})
export class DoodleComponent implements OnInit {
    @Input() matchDoodle: MatchDoodleDTO;
    @Input() showUsers: boolean = false;
    showModified: boolean = false;
    force: boolean = false;
    error: any = "";
    presenceEnum = PresenceDTO.TypeEnum;
    loading: boolean[] = [];

    matchStatus = MatchDoodleDTO.MatchStatusEnum;
    doodleStatus = DoodleDTO.StatusEnum;

    constructor(private _router: Router, private _api: DoodleRestControllerService, private _errorHandler: ErrorHandlerService) {
    }

    ngOnInit() {
        //this.setUserProperties();
        //this._loginService.userUpdated.subscribe(this.setUserProperties)
    }

    isDoodleOpen() {
        return this.matchDoodle.doodle.status === this.doodleStatus.OPEN || this.isAdmin();
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

    changePresence(presence: PresenceDTO, i) {
        if (presence.editable) {
            let timeoutId = setTimeout(() => {
                this.loading[i] = true;
            }, 500);

            this._api.changePresence(presence.account.id, this.matchDoodle.id, this.force)
                .subscribe(
                    r => {
                        this._api.matchDoodle(this.matchDoodle.id).subscribe(
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
                ).add(() => {
                clearTimeout(timeoutId);
                setTimeout(() => {
                    this.loading[i] = false;
                }, 500);
            });

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
