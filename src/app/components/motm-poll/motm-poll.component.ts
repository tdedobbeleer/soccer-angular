import {Component, OnInit, Input} from "@angular/core";
import {MatchPollDTO} from "../../ws/soccer/model/MatchPollDTO";
import {LoginService} from "../../services/login.service";
import {PollrestcontrollerApi} from "../../ws/soccer/api/PollrestcontrollerApi";
import {ErrorHandlerService} from "../../services/error-handler.service";
import {SecUtil} from "../../classes/sec-util";

@Component({
    selector: 'app-motm-poll',
    template: `
          <div class="col-md-6">
              <div class="panel panel-info">
                  <div>
                      <div class="panel-heading">
                          <h3 class="text-center">{{poll.matchDescription}}</h3>
                          <p class="text-center">{{poll.matchDate}}</p>
                              <div class="btn-group" role="group" *ngIf="isAdmin()">
                                  <button (click)="refresh(poll)" type="button" class="btn btn-default" data-toggle="tooltip" data-placement="top" title="{{'title.motmPoll.refresh' | translate}}">
                                      {{'button.refresh' | translate}}
                                  </button>
                                  <button (click)="reset(poll)" type="button" class="btn btn-warning" data-toggle="tooltip" data-placement="top" title="{{'title.motmPoll.reset' | translate}}">
                                      {{'button.reset' | translate}}
                                  </button>
                              </div>
                              <div class="m-t-1" *ngIf="actionResultMessage[poll.id]">
                                  <b>{{actionResultMessage[poll.id]}}</b>
                              </div>
                      </div>
                   
                      <div class="panel-body" *ngIf="poll.status == 'OPEN' && isLoggedIn()">
                          <div class="input-group">
                              <select class="form-control" name="group-poll" [ngModel]="$parent.selectedAccount"
                                      ng-init="$parent.selectedAccount='none'">
                                  <option [selected]="true" [value]="none">{{'text.motmPoll.select.player' | translate}}</option>
                                  <option *ngFor="let option of value.options" [value]="option.id">{{option.name}}
                                  </option>
                              </select>

                              <div class="input-group-btn">
                                  <button (click)="vote(selectedAccount, poll)" class="btn btn-success"><span
                                          class="glyphicon glyphicon-bell"></span> {{'text.vote' | translate}}
                                  </button>
                              </div>
                          </div>
                          <div class="m-t-1" *ngIf="voteResultMessage[poll.id]">
                              <b>{{voteResultMessage[poll.id]}}</b>
                          </div>
                      </div>
                      
                      <div class="panel-footer">
                          <div *ngIf="poll.totalVotes > 0">
                              <div *ngFor="let x of poll?.votes">
                                  <div *ngIf="$index < 4 || show">
                                      {{x.account.name}}
                                      <span *ngIf="x.votes != 1">({{x.votes}} {{'text.votes' | translate}})</span>
                                      <span *ngIf="x.votes == 1">({{x.votes}} {{'text.votes' | translate}})</span>
  
                                      <div class="progress">
                                          <div class="progress-bar" role="progressbar" [attr.aria-valuenow]="getPercentage(x.votes, poll.totalVotes)"
                                               [attr.aria-valuemin]="0" [attr.aria-valuemax]="100"
                                               [style.width]="getPercentage(x.votes, poll.totalVotes) + '%'">
                                              {{getPercentage(x.votes, poll.totalVotes)}}%
                                          </div>
                                      </div>
                                  </div>
                              </div>
                              <a class="btn" *ngIf="!show" (click)="show=true">
                                {{'text.show.more' | translate}}
                              </a>
                              <a class="btn" *ngIf="show" (click)="show=false">
                                {{'text.show.less' | translate}}
                              </a>
                          </div>
                          <div *ngIf="poll.totalVotes == 0">
                              {{'text.no.votes' | translate}}
                          </div>
                      </div>
                  </div>
              </div>
  `,
    styles: []
})
export class MotmPollComponent implements OnInit {
    @Input() poll: MatchPollDTO;

    actionResultMessage = [];
    voteResultMessage = [];

    constructor(private _api: PollrestcontrollerApi, private _loginService: LoginService, private _errorHandler: ErrorHandlerService) {
    }

    ngOnInit() {
    }

    isLoggedIn(): boolean {
        return SecUtil.isLoggedIn();
    }

    isAdmin(): boolean {
        return SecUtil.isAdmin();
    }

    reset(poll: MatchPollDTO) {
        this._api.resetPollUsingPUT(poll.id, SecUtil.getJwtHeaders()).subscribe(
            p => {
                this._api.getMatchPollUsingGET(poll.id, SecUtil.getJwtHeaders()).subscribe(p => this.poll = p);
            },
            error => {
                this._errorHandler.handle(error, "manofthematch");
            }
        )
    }

    refresh(poll: MatchPollDTO) {
        this._api.refreshMatchPollUsingPUT(poll.matchId, SecUtil.getJwtHeaders()).subscribe(
            p => {
                this._api.getMatchPollUsingGET(poll.id, SecUtil.getJwtHeaders()).subscribe(p => this.poll = p);
            },
            error => {
                this._errorHandler.handle(error, "manofthematch");
            }
        )
    }

    vote(selectedAccount: any, poll: MatchPollDTO) {
        this._api.postMatchPollUsingPOST(poll.id, selectedAccount, SecUtil.getJwtHeaders()).subscribe(
            p => {
                this._api.getMatchPollUsingGET(poll.id, SecUtil.getJwtHeaders()).subscribe(p => this.poll = p);
            },
            error => {
                this._errorHandler.handle(error, "manofthematch");
            }
        )
    }

    getPercentage(votes: string, totalVotes: string): any {
        if (parseInt(totalVotes) === 0) {
            return 0;
        }
        else {
            return ((parseInt(votes) / parseInt(totalVotes)) * 100).toFixed(1);
        }
    }

}
