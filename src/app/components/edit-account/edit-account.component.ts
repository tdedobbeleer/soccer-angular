import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-edit-account',
    template: `
    <div class="container">
        <app-edit-account-form [profileId]="profileId"></app-edit-account-form>
    </div>
  `,
    styles: []
})
export class EditAccountComponent implements OnInit {
    profileId: any;

    constructor(private _route: ActivatedRoute) {
    }

    ngOnInit() {
        this._route.params.subscribe(params => {
            this.profileId = params['id'];
        });
    }

}
