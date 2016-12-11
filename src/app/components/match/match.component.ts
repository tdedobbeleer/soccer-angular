import {Component, OnInit, Input} from "@angular/core";
import {MatchDTO} from "../../ws/model/MatchDTO";

@Component({
    selector: 'app-match',
    template: `
    <p>{{match?.homeTeam}} - {{match?.awayTeam}}</p>
`
})
export class MatchComponent implements OnInit {
    @Input() match: MatchDTO;

    constructor() {
    }

    ngOnInit() {

    }

}
