import {Component, OnInit, Input} from "@angular/core";
import {ProfileDTO} from "../../ws/soccer/model/ProfileDTO";
import {SecUtil} from "../../classes/sec-util";

@Component({
    selector: 'app-player',
    template: `
    <div class="col-sm-4 col-lg-4 col-md-4">
        <div class="thumbnail avatar">
              <img *ngIf="profile.image?.url" src="{{profile.image?.url | safe}}">
              <img *ngIf="!profile.image?.url" src="https://placeholdit.imgix.net/~text?txtsize=24&txt={{'profile.image.unavailable | translate'}}&w=200&h=200" alt="">
           
            <div class="caption">
                <div *ngIf="!isLoggedIn()"><h4>{{profile.account.firstName}}</h4></div>
                <div *ngIf="isLoggedIn()"><h4>{{profile.account.name}}</h4></div>
                <div *ngIf="profile.account.username"><span class="glyphicon glyphicon-envelope"></span>&nbsp;{{profile.account.username}}</div>
                <div *ngIf="profile.phone"><span class="glyphicon glyphicon-phone-alt"></span>&nbsp;{{profile.phone}}</div>
                <div *ngIf="profile.mobilePhone"><span class="glyphicon glyphicon-phone"></span>&nbsp;{{profile.mobilePhone}}</div>
                <div *ngIf="profile.address">
                    <span class="glyphicon glyphicon-home"></span>&nbsp;{{profile.address?.address}}<br/>{{profile.address?.postalCode}} {{profile.address?.city}}
                </div>
            </div>
        </div>
    </div>
  `,
    styles: []
})
export class PlayerComponent implements OnInit {
    @Input() profile: ProfileDTO;

    constructor() {
    }

    ngOnInit() {
    }

    isLoggedIn() {
        return SecUtil.isLoggedIn();
    }

}
