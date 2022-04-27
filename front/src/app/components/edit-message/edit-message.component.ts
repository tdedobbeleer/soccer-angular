import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-edit-message',
    template: `
    <div class="container">
        <app-edit-message-form [messageId]="messageId"></app-edit-message-form>
    </div>
  `,
    styles: []
})
export class EditMessageComponent implements OnInit {
    messageId: any;

    constructor(private _route: ActivatedRoute) {
    }

    ngOnInit() {
        this._route.params.subscribe(params => {
            this.messageId = params['id'];
        });
    }

}
