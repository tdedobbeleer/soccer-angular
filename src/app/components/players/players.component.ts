import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-players',
  template: `
    <div class="container m-t-1">
    <ul class="breadcrumb">
        <li>
            <a [routerLink]="['/']" routerLinkActive="active">Home</a>
        </li>
        <li>
            {{'nav.players' | translate }}
        </li>
    </ul>
        <app-team *ngFor="let team of teamDTOList" [team]="team"></app-team>
    </div>
  `,
  styles: []
})
export class PlayersComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
