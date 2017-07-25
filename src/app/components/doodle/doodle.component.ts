import {Component, OnInit, Input} from '@angular/core';
import {DoodleDTO} from "../../ws/soccer/model/DoodleDTO";
import {LoginService} from "../../services/login.service";
import {ErrorHandlerService} from "../../services/error-handler.service";
import {DoodlerestcontrollerApi} from "../../ws/soccer/api/DoodlerestcontrollerApi";
import {MatchDoodleDTO} from "../../ws/soccer/model/MatchDoodleDTO";
import {PresenceDTO} from "../../ws/soccer/model/PresenceDTO";
import {Router} from "@angular/router";

@Component({
  selector: 'app-doodle',
  template: `
    <div class="panel panel-default">
      <div class="panel-heading"><span class="glyphicon glyphicon-calendar" aria-hidden="true"></span>&nbsp;{{doodle.date}}
      </div>
      <div class="panel-body">
        <alert [type]="'danger'" *ngIf="error">{{'text.doodle.error' | translate}}</alert>
        <div class="doodle-title">
          <h3>{{doodle.description}}
            <span *ngIf="doodle.status == 'CANCELLED'">
              <b>({{'text.match.status.cancelled' | translate}}!)</b>
            </span>
          </h3>
        </div>
        <div class="doodle-badge btn-group btn-group-lg">
          <a class="btn btn-default doodle-users" data-toggle="tooltip" data-container="body"
             ng-click="showUsers = !showUsers"
             title="{{'tooltip.doodle.presences' | translate}}" aria-hidden="true"><span
                  class="glyphicon glyphicon-user"></span> <span
                  class="count-badge">{{doodle.doodle.total}}</span>
          </a>
          <a (click)="changePresence(doodle.doodle.currentPresence)" data-toggle="tooltip" *ngIf="isLoggedIn()"
               data-container="body" title="{{'tooltip.doodle.changePresence' | translate}}"
               data-placement="top" class="btn btn-default"><span
                    [ngClass]="getPresenceClass(doodle.doodle.currentPresence)"
                    aria-hidden="true"></span>
          </a>
          <a (click)="login()" data-toggle="tooltip" data-container="body" *ngIf="!isLoggedIn()"
               title="{{'tooltip.doodle.changePresence' | translate}}"
               data-placement="top" class="btn btn-default"><span class="glyphicon glyphicon-lock grey"
                                                                  aria-hidden="true"></span>
          </a>
        </div>
      </div>
      <div class="panel-body list" *ngIf="showUsers">
        <div class="doodle-list" *ngFor="let presence of doodle.doodle.presences">
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
    <div class="panel-body" *ngIf="showUsers">
          <a class="pull-right" data-toggle="tooltip" data-container="body"
             (click)="showModified = !showModified"
             title="{{'tooltip.doodle.time' | translate}}" aria-hidden="true">
            <span *ngIf="!showModified">{{'tooltip.doodle.show.dates' | translate}}</span>
            <span *ngIf="showModified">{{'tooltip.doodle.hide.dates' | translate}}</span>
          </a>
    </div>
    </div>
  `,
  styles: []
})
export class DoodleComponent implements OnInit {
  @Input() doodle:MatchDoodleDTO;
  showUsers : boolean = false;
  showModified: boolean = false;
  error : boolean = false;

  constructor(private _router: Router, private _api : DoodlerestcontrollerApi, private _errorHandler : ErrorHandlerService, private _loginService : LoginService) { }

  ngOnInit() {
  }

  isAdmin() {
    return this._loginService.isAdmin();
  }

  isLoggedIn() {
    return this._loginService.isLoggedIn();
  }

  login() {
    this._router.navigate(['/login'], {queryParams: {redirectUrl: "doodles"}});
  }

  changePresence(presence : PresenceDTO) {
    if (presence.editable) {
      this._api.changePresence(this.doodle.id, presence.account.id, this._loginService.jwtHeader)
          .subscribe(
              r => {
                presence.type = r.type;
              },
              e => {
                this._errorHandler.handle(e);
              }
          )
    }

  }

  getPresenceClass(presence : PresenceDTO) {
    switch (presence.type) {
      case PresenceDTO.TypeEnum.NOTFILLEDIN:
        return "glyphicon glyphicon-question-sign grey";
      case PresenceDTO.TypeEnum.PRESENT:
        return "glyphicon glyphicon-ok green";
      case PresenceDTO.TypeEnum.NOTPRESENT:
        return "glyphicon glyphicon-remove red";
      default:
        return "glyphicon glyphicon-lock grey";
    }
}

}
