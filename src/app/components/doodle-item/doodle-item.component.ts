import {Component, OnInit} from '@angular/core';
import {DoodlerestcontrollerApi} from "../../ws/soccer/api/DoodlerestcontrollerApi";
import {ErrorHandlerService} from "../../services/error-handler.service";
import {MatchDoodleDTO} from "../../ws/soccer/model/MatchDoodleDTO";
import {ActivatedRoute} from "@angular/router";
import {SecUtil} from "../../classes/sec-util";

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

    constructor(private _api: DoodlerestcontrollerApi, private _errorHandler: ErrorHandlerService, private _route: ActivatedRoute) {
    }

    ngOnInit() {
        this.loading = true;
        this._route.params.subscribe(params => {
            this._api.matchDoodle(params['id'], SecUtil.getJwtHeaders()).subscribe(
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
