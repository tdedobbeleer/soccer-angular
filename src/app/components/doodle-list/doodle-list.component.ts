import {Component, OnInit} from "@angular/core";
import {PageDTOMatchDoodleDTO} from "../../ws/soccer/model/PageDTOMatchDoodleDTO";
import {DoodlerestcontrollerApi} from "../../ws/soccer/api/DoodlerestcontrollerApi";
import {ErrorHandlerService} from "../../services/error-handler.service";
import {LoginService} from "../../services/login.service";
import {SecUtil} from "../../classes/sec-util";

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
        <div class="box" *ngIf="doodlePage?.totalPages == 0">
           <p>{{"text.doodles.empty" | translate}}</p>
        </div>
  </div>
  `,
  styles: []
})
export class DoodleListComponent implements OnInit {
  doodlePage : PageDTOMatchDoodleDTO;
    currentPage: any = 0;

  constructor(private _api : DoodlerestcontrollerApi, private _errorHandler : ErrorHandlerService, private _loginService : LoginService) { }

  ngOnInit() {
    //Get the first page
      this.getPage(this.currentPage);
      SecUtil.userUpdated.subscribe(() => this.getPage(this.currentPage));
  }

  getPage(page) {
      this._api.matchDoodlesPage(page, 5, SecUtil.getJwtHeaders()).subscribe(
        r => {
          this.doodlePage = r;
            this.currentPage = page;
        },
        e => {
          this._errorHandler.handle(e, "doodles");
        }
    )
  }

}
