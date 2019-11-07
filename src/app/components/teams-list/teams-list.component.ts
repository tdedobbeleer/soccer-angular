import {Component, OnInit} from '@angular/core';
import {ErrorHandlerService} from '../../services/error-handler.service';
import {SecUtil} from '../../classes/sec-util';
import {TeamDTO, TeamsRestControllerService} from '../../ws/soccer';

@Component({
  selector: 'app-teams-list',
  template: `
    <div class="container m-t-1">
    <ul class="breadcrumb">
        <li>
            <a [routerLink]="['/']" routerLinkActive="active"><span class="fa fa-user"></span>&nbsp;Home</a>
        </li>
        <li>
            {{'nav.teams' | translate }}
        </li>
    </ul>
    <div class="row">
      <div class="col-md-1 col-md-offset-11 m-b-1">
      <div class="pull-right m-b-1">
       <span class="btn-group" *ngIf="isAdmin()">
             <button type="button" class="btn btn-lg btn-danger" aria-label="Create team" 
                     [routerLink]="['/teams/create']" routerLinkActive="active" title="{{'tooltip.teams.add' | translate}}">
                 <span class="fa fa-plus" aria-hidden="true"></span>
             </button>
        </span>  
        </div>
      </div>
    </div>
    <app-loading [loading]="loading"></app-loading>
    <div *ngIf="!loading">
        <app-team *ngFor="let team of teamDTOList" [team]="team"></app-team>
      
        <div class="box" *ngIf="teamDTOList?.length == 0">
            <p>{{"text.teams.empty" | translate}}</p>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class TeamsListComponent implements OnInit {
  teamDTOList: TeamDTO[];
  showMap: any[] = [];
    loading: boolean;

    constructor(private _api: TeamsRestControllerService, private _errorHandler: ErrorHandlerService) {
  }

  isAdmin() {
    return SecUtil.isAdmin();
  }

  ngOnInit() {
      this.loading = true;
      this._api.getTeams().subscribe(l => {
          this.teamDTOList = l;
          this.loading = false;
      }, e => {
          this.loading = false;
          this._errorHandler.handle(e);
      });
  }

}
