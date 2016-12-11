import {Component, OnInit, Input} from "@angular/core";
import {SeasonDTO} from "../../ws/model/SeasonDTO";
import {MatchDTO} from "../../ws/model/MatchDTO";

@Component({
    selector: 'app-season',
    template: `
    <h3>{{season?.description}}</h3>
    <app-match *ngFor="let match of matches" [match]="match"></app-match>
  `,
    styles: []
})
export class SeasonComponent implements OnInit {
    @Input() season: SeasonDTO;
    @Input() matches: MatchDTO[];

    constructor() {
    }

    ngOnInit() {
    }

}
