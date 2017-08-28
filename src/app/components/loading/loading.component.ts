import {Component, OnInit, Input} from "@angular/core";

@Component({
    selector: 'app-loading',
    template: `
    <div class="text-center" *ngIf="loading">
        <img src="../../../assets/images/loading-ball.gif">
    </div>
  `,
    styles: []
})
export class LoadingComponent implements OnInit {
    @Input() loading: boolean;

    constructor() {
    }

    ngOnInit() {
    }

}
