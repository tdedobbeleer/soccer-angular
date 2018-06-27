import {Component, OnInit} from '@angular/core';
import {ErrorHandlerService} from "../../services/error-handler.service";
import {ActivatedRoute} from "@angular/router";
import {DoodleRestControllerService, MatchDoodleDTO} from "../../ws/soccer";

@Component({
    selector: 'app-doodle-item',
    template: `
        <div class="container">
            <ul class="breadcrumb">
                <li><a [routerLink]="['/']" routerLinkActive="active"><span class="glyphicon glyphicon-home"></span>&nbsp;Home</a>
                </li>
            </ul>

            <div class="m-t-1">
                <app-loading [loading]="loading"></app-loading>
                <app-doodle [matchDoodle]="doodle" [showUsers]="true" *ngIf="!loading"></app-doodle>
            </div>

        </div>
    `,
    styles: []
})
export class DoodleItemComponent implements OnInit {

    doodle: MatchDoodleDTO;
    loading: boolean;

    constructor(private _api: DoodleRestControllerService, private _errorHandler: ErrorHandlerService, private _route: ActivatedRoute) {
    }

    ngOnInit() {
        this.loading = true;

        this._route.params.subscribe(params => {
            this._api.matchDoodle(params['id']).subscribe(
                d => {
                    this.doodle = d;
                    this.loading = false;
                },
                e => {
                    this.loading = false;
                    this._errorHandler.handle(e);
                }
            );
        });

    }

}
