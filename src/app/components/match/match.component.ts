import {Component, OnInit, Input} from "@angular/core";
import {MatchDTO} from "../../ws/model/MatchDTO";

@Component({
    selector: 'app-match',
    styles: [`
    .right {
      text-align: right;
    }
    .left {
      text-align: left;
    }
    .score {
        color: #ffffff;
        background-color: #4fbfa8;
    }
    .row.match-my-cols {
    overflow: hidden; 
    }
    .row.match-my-cols [class*="col-"]{
        margin-top: -99999px;
        padding-top: 99999px;
        margin-bottom: -99999px;
        padding-bottom: 99999px;
    }
  `],
    template: `
   
    <div class="box">
        <div class="row visible-xs text-center">
            <span class="col-xs-12"><h3>{{match?.date}}</h3></span>
        </div>
        <div class="row match-my-cols">
            <span class="col-md-2 col-xs-2 hidden-xs"><h3>{{match?.date}}</h3></span>
            <span class="col-md-4 col-xs-4 right"><h3>{{match?.homeTeam}}</h3></span>
            <span class="col-md-1 col-xs-2 right score"><h2>{{match?.htGoals}}</h2></span>
            <span class="col-md-1 col-xs-2 left score"><h2>{{match?.atGoals}}</h2></span>
            <span class="col-md-4 col-xs-4 left"><h3>{{match?.awayTeam}}</h3></span>
        </div>
        <div class="row text-center">
            <span class="col-md-12 col-xs-12 text-center">actions</span>
        </div>
    </div>
`
})
export class MatchComponent implements OnInit {
    @Input() match: MatchDTO;

    constructor() {
    }

    ngOnInit() {

    }

}
