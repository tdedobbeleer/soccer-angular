import {Component, OnInit} from "@angular/core";

@Component({
    selector: 'app-create-match',
    template: `
    <p>
      <app-match-form (match)="[]" (update)="false"></app-match-form>
    </p>
  `,
    styles: []
})
export class CreateMatchComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

}
