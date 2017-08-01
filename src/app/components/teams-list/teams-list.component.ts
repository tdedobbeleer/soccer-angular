import {Component, OnInit} from "@angular/core";
import {TeamsrestcontrollerApi} from "../../ws/soccer/api/TeamsrestcontrollerApi";
import {TeamDTO} from "../../ws/soccer/model/TeamDTO";
import {ErrorHandlerService} from "../../services/error-handler.service";

@Component({
  selector: 'app-teams-list',
  template: `
    <div class="container m-t-1">
    <ul class="breadcrumb">
        <li>
            <a [routerLink]="['/']" routerLinkActive="active"><span class="glyphicon glyphicon-user"></span>&nbsp;Home</a>
        </li>
        <li>
            {{'nav.teams' | translate }}
        </li>
    </ul>
        <app-team *ngFor="let team of teamDTOList" [team]="team"></app-team>
        <div class="box" *ngIf="teamDTOList?.length == 0">
            <p>{{"text.teams.empty" | translate}}</p>
        </div>
    </div>
  `,
  styles: []
})
export class TeamsListComponent implements OnInit {
  teamDTOList: TeamDTO[];

    constructor(private _api: TeamsrestcontrollerApi, private _errorHandler: ErrorHandlerService) {
  }

  ngOnInit() {
      this._api.getTeams().subscribe(l => this.teamDTOList = l, e => this._errorHandler.handle(e));
  }

}
