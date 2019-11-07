import {Component, Input, OnInit} from '@angular/core';
import {SecUtil} from '../../classes/sec-util';
import {TranslationService} from '../../services/translation.service';
import {ProfileDTO} from '../../ws/soccer';

@Component({
    selector: 'app-player',
    template: `
    <div class="col-sm-4 col-lg-4 col-md-4">
        <div class="thumbnail avatar" [style.height]="isLoggedIn() ? '427px' : '100%'">
              <img *ngIf="profile.image?.url" [attr.src]="profile.image?.url | safe">
              <img *ngIf="!profile.image?.url" [attr.src]="getPlaceHolderImg() | safe" alt="">
           
            <div class="caption">
                <div *ngIf="!isLoggedIn()"><h4>{{profile.account.firstName}}</h4></div>
                <div *ngIf="isLoggedIn()"><h4>{{profile.account.name}}</h4></div>
                <div *ngIf="profile.account.username"><span class="fa fa-envelope"></span>&nbsp;{{profile.account.username}}</div>
                <div *ngIf="profile.phone"><span class="fa fa-phone"></span>&nbsp;{{profile.phone}}</div>
                <div *ngIf="profile.mobilePhone"><span class="fa fa-mobile"></span>&nbsp;{{profile.mobilePhone}}</div>
                <div *ngIf="profile.address">
                    <span class="fa fa-home"></span>&nbsp;{{profile.address?.address}}<br/>{{profile.address?.postalCode}} {{profile.address?.city}}
                </div>
            </div>
        </div>
    </div>
  `,
    styles: []
})
export class PlayerComponent implements OnInit {
    @Input() profile: ProfileDTO;

    constructor(private _trans: TranslationService) {
    }

    ngOnInit() {
    }

    getPlaceHolderImg() {
        return "https://placeholdit.imgix.net/~text?txtsize=24&txt=" + this._trans.instant('text.profile.image.unavailable') + "&w=200&h=200";
    }

    isLoggedIn() {
        return SecUtil.isLoggedIn();
    }

}
