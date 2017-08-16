import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-edit-team',
  template: `
    <div class="container m-t-1">
    <ul class="breadcrumb">
        <li>
            <a [routerLink]="['/']" routerLinkActive="active"><span class="glyphicon glyphicon-home"></span>&nbsp;Home</a>
        </li>
        <li>
            <a [routerLink]="['/teams']" routerLinkActive="active">{{'nav.teams' | translate }}</a>
        </li>
        <li>
            {{'nav.team.edit' | translate }}
        </li>
    </ul>
      <app-edit-team-form [teamId]="teamId"></app-edit-team-form>
    </div>
  `,
  styles: []
})
export class EditTeamComponent implements OnInit {

  teamId: any;

  constructor(private _route: ActivatedRoute) {
  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.teamId = params['id'];
    });
  }

}
