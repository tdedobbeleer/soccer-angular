import {Component, OnInit} from "@angular/core";
import {ErrorHandlerService} from "../../services/error-handler.service";
import {SecUtil} from "../../classes/sec-util";
import {DoodleRestControllerService, PageDTOMatchDoodleDTO} from "../../ws/soccer";

@Component({
  selector: 'app-doodle-list',
  template: `
 <div class="container m-t-1">
      <ul class="breadcrumb">
          <li><a href="#" [routerLink]="['/']" routerLinkActive="active">{{'nav.home' | translate}}</a>
          </li>
          <li>{{'nav.doodle' | translate}}</li>
      </ul>
  </div>
  <div class="m-t-1 container">
        <app-loading [loading]="loading"></app-loading>
        <div *ngIf="!loading">
            <app-pagination (onClick)="getPage($event)" [page]="doodlePage"></app-pagination>
            <app-doodle *ngFor="let doodle of doodlePage?.list" [matchDoodle]="doodle"></app-doodle>
            <app-pagination (onClick)="getPage($event)" [page]="doodlePage"></app-pagination>
            <div class="box" *ngIf="doodlePage?.totalPages == 0">
               <p>{{"text.doodles.empty" | translate}}</p>
            </div>
        </div>
  </div>
  `,
  styles: []
})
export class DoodleListComponent implements OnInit {
  doodlePage : PageDTOMatchDoodleDTO;
    currentPage: any = 0;
    loading: boolean;

    constructor(private _api: DoodleRestControllerService, private _errorHandler: ErrorHandlerService) {
    }

  ngOnInit() {
    //Get the first page
      this.getPage(this.currentPage);
      SecUtil.userUpdated.subscribe(() => this.getPage(this.currentPage));
  }

  getPage(page) {
      this.loading = true;

      this._api.matchDoodlesPage(page, 5).subscribe(
        r => {
            this.doodlePage = r;
            this.currentPage = page;
            this.loading = false;
        },
        e => {
            this._errorHandler.handle(e, "doodles");
            this.loading = false;
        }
    )
  }

}
