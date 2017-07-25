import { Component, OnInit } from '@angular/core';
import {PageDTOMatchDoodleDTO} from "../../ws/soccer/model/PageDTOMatchDoodleDTO";
import {DoodlerestcontrollerApi} from "../../ws/soccer/api/DoodlerestcontrollerApi";
import {ErrorHandlerService} from "../../services/error-handler.service";
import {LoginService} from "../../services/login.service";

@Component({
  selector: 'app-doodle-list',
  template: `
 <div class="container m-t-1">
      <ul class="breadcrumb">
          <li><a href="#" [routerLink]="['/']" routerLinkActive="active">{{'nav.home' | translate}}</a>
          </li>
          <li>{{'nav.doodles' | translate}}</li>
      </ul>
  </div>
  <div class="m-t-1 container">
        <app-pagination (onClick)="getPage($event)" [page]="doodlePage"></app-pagination>
        <app-doodle *ngFor="let doodle of doodlePage?.list" [matchDoodle]="doodle"></app-doodle>
        <app-pagination (onClick)="getPage($event)" [page]="doodlePage"></app-pagination>
  </div>
  `,
  styles: []
})
export class DoodleListComponent implements OnInit {
  doodlePage : PageDTOMatchDoodleDTO;

  constructor(private _api : DoodlerestcontrollerApi, private _errorHandler : ErrorHandlerService, private _loginService : LoginService) { }

  ngOnInit() {
    //Get the first page
    this.getPage(0);
  }

  getPage(page) {
    this._api.matchDoodlesPage(page,5, this._loginService.jwtHeader).subscribe(
        r => {
          this.doodlePage = r;
        },
        e => {
          this._errorHandler.handle(e, "doodles");
        }
    )
  }

}
