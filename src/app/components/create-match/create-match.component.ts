import {Component, OnInit} from "@angular/core";

@Component({
    selector: 'app-create-match',
    template: `
    <div class="container">
      <app-match-form></app-match-form>
    </div>
  `,
    styles: []
})
export class CreateMatchComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

}
