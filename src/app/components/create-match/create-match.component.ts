import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-create-match',
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
            {{'nav.match.create' | translate }}
        </li>
    </ul>
      <app-match-form></app-match-form>
    </div>
  `,
    styles: []
})
export class CreateMatchComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

}
