import {Component, OnInit, Input} from "@angular/core";
import {MatchDTO} from "../../ws/soccer/model/MatchDTO";
import {SecUtil} from "../../classes/sec-util";

@Component({
    selector: 'app-match',
    styles: [`  
  `],
    template: `
   
    <div class="box">
        <div class="row visible-xs text-center">
            <div class="col-xs-12"><h3><span class="glyphicon glyphicon-calendar" aria-hidden="true"></span>&nbsp;{{match?.date}}</h3></div>
        </div>
        <div class="row">
            <div class="col-md-12 col-xs-12">
                <div class="row">
                    <div class="col-md-2 col-sm-12 col-xs-12 hidden-xs"><h4><span class="glyphicon glyphicon-calendar" aria-hidden="true"></span>&nbsp;{{match?.date}}</h4></div>
                    <div class="col-md-8">
                        <div class="row">
                            <div class="col-md-4 col-xs-4 right"><h3>{{match?.homeTeam?.name}}</h3></div>
                            <div class="col-md-2 col-xs-4 text-center score"><h3>{{match?.htGoals}} - {{match?.atGoals}}</h3></div>
                            <div class="col-md-4 col-xs-4 left"><h3>{{match?.awayTeam?.name}}</h3></div>
                        </div>
                    </div>
                    <div class="col-md-2 col-xs-12 col-sm-12">
                      <div class="row text-center visible-sm visible-xs">
                          <h3><span class="glyphicon glyphicon-time" aria-hidden="true"></span>&nbsp;{{match?.hour}}</h3>
                      </div>
                   <div class="row text-center m-t-1">
                      <div class="btn-group" *ngIf="isAdmin()">
                          <button type="button" class="btn btn-circle" aria-label="Edit comment" (click)="showEditComment = !showEditComment">
                              <span class="glyphicon glyphicon-edit" aria-hidden="true"></span>
                          </button>
                          <button type="button" class="btn btn-circle btn-danger" aria-label="Edit comment" (click)="showEditComment = !showEditComment">
                              <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
                          </button>
                      </div>
                      <div class="row text-center m-t-1">
                          <div class="btn-group">
                              <button type="button" class="btn btn-circle" aria-label="Edit comment" (click)="showEditComment = !showEditComment">
                                  <span class="glyphicon glyphicon-map-marker" aria-hidden="true"></span>
                              </button>
                              <button type="button" class="btn btn-circle" aria-label="Edit comment" (click)="showEditComment = !showEditComment">
                                  <span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span>
                              </button>
                              <button type="button" class="btn btn-circle" aria-label="Edit comment" (click)="showEditComment = !showEditComment">
                                  <span class="glyphicon glyphicon-list" aria-hidden="true"></span>
                              </button>
                              <button type="button" class="btn btn-circle" aria-label="Edit comment" (click)="showEditComment = !showEditComment">
                                  <span class="glyphicon glyphicon-user" aria-hidden="true"></span>
                              </button>
                          </div>
                      </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row text-center hidden-sm hidden-xs">
            <div class="col-md-8 col-md-offset-2 col-xs-12">
                <div class="row">
                    <div class="col-md-2 col-md-offset-4 col-xs-offset-4 col-xs-4 text-center">
                        <h3><span class="glyphicon glyphicon-time" aria-hidden="true"></span>&nbsp;{{match?.hour}}</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
`
})
export class MatchComponent implements OnInit {
    @Input() match: MatchDTO;

    showEditComment: boolean;

    constructor() {
    }

    ngOnInit() {

    }

    isAdmin(): boolean {
        return SecUtil.isAdmin();
    }

}
