import {Component, OnInit} from "@angular/core";

@Component({
    selector: 'app-create-message',
    template: `
  <div class="container">
      <div class="col-md-12">
            <ul class="breadcrumb">
                <li><a href="/">{{'nav.home' | translate}}</a>
                </li>
                <li>{{'nav.messages.create' | translate}}
                </li>
            </ul>
        </div>
        
      <div class="col-md-12">
        <app-message-form></app-message-form>
      </div>
  </div>

  `,
    styles: []
})
export class CreateMessageComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {

    }
}
