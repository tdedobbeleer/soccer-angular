import {Component, Input, OnInit} from '@angular/core';
import {SecUtil} from '../../classes/sec-util';
import {TeamDTO} from '../../ws/soccer';

@Component({
    selector: 'app-team',
    styles: [`    
    .box.team {
        padding: 10px;
    }
    `],
    template: `
      <div class="box team">
         <div class="row">
            <div class="col-md-4 col-xs-12"><h4>{{team.name}}</h4></div>
            <div class="col-md-4 col-xs-12">
                <div class="row">
                    <div class="col-md-1 col-xs-1"><span class="fa fa-home"></span></div>
                    <div class="col-md-11 col-xs-11">
                        <div>{{team.address.address}}</div>
                        <div>{{team.address?.postalCode}}&nbsp;{{team.address?.city}}</div>
                    </div>
                </div>
            </div>
            <div class="col-md-4 col-xs-12 text-center">
            <div class="btn-group">
              <button *ngIf="team.address?.googleLink != null" type="button" class="btn" 
                      aria-label="Show map" (click)="showMap = !showMap" title="{{'tooltip.teams.location' | translate}}">
                  <span class="fa fa-map-marker" aria-hidden="true"></span>
              </button>
              <button *ngIf="isAdmin()" type="button" class="btn" 
                      aria-label="Edit team" [routerLink]="['/teams/edit', team.id]" title="{{'tooltip.teams.edit' | translate}}">
                  <span class="fa fa-edit" aria-hidden="true"></span>
              </button>
            </div>
        </div>
    </div>
      <div class="row" *ngIf="showMap">
      <hr>
      <iframe id="mapFrame" width="100%" height="450" scrolling="no" marginheight="0" marginwidth="0" [src]="team.address?.googleLink | safe" frameborder="0"></iframe>
      </div>    
    </div>
  `,
})
export class TeamComponent implements OnInit {
    showMap: boolean;
    @Input() team: TeamDTO;

    constructor() {
    }

    ngOnInit() {

    }

    isAdmin(): boolean {
        return SecUtil.isAdmin();
    }
}
