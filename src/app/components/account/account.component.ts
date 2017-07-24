import {Component, OnInit, Input} from "@angular/core";
import {AccountDTO} from "../../ws/soccer/model/AccountDTO";

@Component({
    selector: 'app-account',
    template: `
    <div class="box">
         <div class="row">
            <div class="col-md-1">{{account.id}}</div>
            <div class="col-md-2">{{account.username}}</div>
            <div class="col-md-2">{{account.name}}</div>
            <div class="col-md-1">
                <span *ngIf="account.role == 'ADMIN'" title="{{account.role}}" class="glyphicon glyphicon-king"></span>
                <span *ngIf="account.role == 'USER'" title="{{account.role}}" class="glyphicon glyphicon-pawn"></span>
            </div>
            <div class="col-md-2">{{account.activated}}</div>
            <div class="col-md-4 text-center m-t-1">
                <div class="btn-group">
                <button *ngIf="account.role == 'USER'" type="button" class="btn btn-circle" aria-label="Elevate">
                    <span class="glyphicon glyphicon-triangle-top" aria-hidden="true"></span>
                </button>
                <button *ngIf="account.role == 'ADMIN'" type="button" class="btn btn-circle" aria-label="Downgrade">
                    <span class="glyphicon glyphicon-triangle-bottom" aria-hidden="true"></span>
                </button>
                <button *ngIf="!account.activated" type="button" class="btn btn-circle" aria-label="Show map" (click)="showMap = !showMap">
                    <span class="glyphicon glyphicon glyphicon-off green" aria-hidden="true"></span>
                </button>
                <button *ngIf="account.activated" type="button" class="btn btn-circle" aria-label="Show map" (click)="showMap = !showMap">
                    <span class="glyphicon glyphicon glyphicon-off red" aria-hidden="true"></span>
                </button>
              </div>
            </div>
         </div>
    </div>
  `,
    styles: []
})
export class AccountComponent implements OnInit {
    @Input() account: AccountDTO;

    constructor() {
    }

    ngOnInit() {
    }

}
