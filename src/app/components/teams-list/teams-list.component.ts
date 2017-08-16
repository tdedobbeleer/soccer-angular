import {Component, OnInit} from "@angular/core";
import {TeamsrestcontrollerApi} from "../../ws/soccer/api/TeamsrestcontrollerApi";
import {TeamDTO} from "../../ws/soccer/model/TeamDTO";
import {ErrorHandlerService} from "../../services/error-handler.service";
import {SecUtil} from "../../classes/sec-util";

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
    <div class="row">
      <div class="col-md-1 col-md-offset-11 m-b-1">
      <div class="pull-right">
       <span class="btn-group" *ngIf="isAdmin()">
             <button type="button" class="btn btn-lg btn-danger" aria-label="Create team" [routerLink]="['/teams/create']" routerLinkActive="active">
                 <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
             </button>
        </span>  
        </div>
      </div>
    </div>
      <div>
          <table  *ngIf="teamDTOList?.length > 0" class="table table-responsive table-striped">
           <tbody>
          <template ngFor let-team [ngForOf]="teamDTOList">
            <tr>
              <td><h4>{{team.name}}</h4></td>
                <td>
                    <div>{{team.address?.address}}</div>
                    <div>{{team.address?.postalCode}}&nbsp;{{team.address?.city}}</div>
                </td>
                <td class="text-center">
                    <div class="btn-group">
                      <button *ngIf="team.address?.googleLink != null" type="button" class="btn" aria-label="Show map" (click)="showMap[team.id] = !showMap[team.id]">
                          <span class="glyphicon glyphicon-map-marker" aria-hidden="true"></span>
                      </button>
                      <button *ngIf="isAdmin()" type="button" class="btn" aria-label="Edit team">
                          <span class="glyphicon glyphicon-edit" aria-hidden="true"></span>
                      </button>
                    </div>
                </td>
            </tr>
            
            <tr *ngIf="showMap[team.id]">
                <td colspan="3">
                <iframe id="mapFrame" width="100%" height="450" scrolling="no" marginheight="0" marginwidth="0" [src]="team.address?.googleLink | safe" frameborder="0"></iframe>
                </td>
            </tr>
          </template>
        
        </tbody>
          </table>
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

    constructor(private _api: TeamsrestcontrollerApi, private _errorHandler: ErrorHandlerService) {
  }

  isAdmin() {
    return SecUtil.isAdmin();
  }

  ngOnInit() {
      this._api.getTeams().subscribe(l => this.teamDTOList = l, e => this._errorHandler.handle(e));
  }

}
