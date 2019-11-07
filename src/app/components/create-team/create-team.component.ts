import {Component, OnInit} from '@angular/core';
import {SecUtil} from '../../classes/sec-util';

@Component({
    selector: 'app-create-team',
    template: `
    <div class="container m-t-1">
    <ul class="breadcrumb">
        <li>
            <a [routerLink]="['/']" routerLinkActive="active"><span class="fa fa-user"></span>&nbsp;Home</a>
        </li>
        <li>
            <a [routerLink]="['/teams']" routerLinkActive="active">{{'nav.teams' | translate }}</a>
        </li>
        <li>
            {{'nav.teams.create' | translate }}
        </li>
    </ul>
    <app-create-team-form></app-create-team-form>


    </div>
  `,
    styles: []
})
export class CreateTeamComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

    isAdmin() {
        return SecUtil.isAdmin();
    }

}
