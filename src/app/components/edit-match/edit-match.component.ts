import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-edit-match',
    template: `
    <div class="container m-t-1">
    <ul class="breadcrumb">
        <li>
            <a [routerLink]="['/']" routerLinkActive="active"><span class="fa fa-home"></span>&nbsp;Home</a>
        </li>
        <li>
            <a [routerLink]="['/matches']" routerLinkActive="active">{{'nav.matches' | translate }}</a>
        </li>
        <li>
            {{'nav.match.edit' | translate }}
        </li>
    </ul>
      <app-edit-match-form [matchId]="matchId"></app-edit-match-form>
    </div>
  `,
    styles: []
})
export class EditMatchComponent implements OnInit {
    matchId: any;

    constructor(private _route: ActivatedRoute) {
    }

    ngOnInit() {
        this._route.params.subscribe(params => {
            this.matchId = params['id'];
        });
    }

}
