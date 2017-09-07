import {Component, OnInit, Input, ViewChild} from "@angular/core";
import {MatchPollDTO} from "../../ws/soccer/model/MatchPollDTO";
import {PollrestcontrollerApi} from "../../ws/soccer/api/PollrestcontrollerApi";
import {ErrorHandlerService} from "../../services/error-handler.service";
import {SecUtil} from "../../classes/sec-util";
import {AccountDTO} from "../../ws/soccer/model/AccountDTO";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ValidationService} from "../../services/validation.service";
import {FocusOnErrorDirective} from "../../directives/focus-on-error.directive";
import {notCurrentAccountValidator} from "../../functions/not-current-account-validator";

@Component({
    selector: 'app-motm-poll',
    template: `
          <div *ngIf="poll">
              <div class="panel panel-info">
                  <div>
                      <div class="panel-heading">
                          <h3 class="text-center">{{poll.matchDescription}}</h3>
                          <p class="text-center">{{poll.matchDate}}</p>
                              <div class="btn-group" role="group" *ngIf="isAdmin()">
                                  <button (click)="showRefreshPoll = true; showResetPoll = false" type="button" class="btn btn-default" data-toggle="tooltip" data-placement="top" title="{{'title.motmPoll.refresh' | translate}}">
                                      {{'btn.refresh' | translate}}
                                  </button>
                                  <button (click)="showResetPoll = true; showRefreshPoll = false;" type="button" class="btn btn-warning" data-toggle="tooltip" data-placement="top" title="{{'title.motmPoll.reset' | translate}}">
                                      {{'btn.reset' | translate}}
                                  </button>
                              </div>
                              <div class="m-t-1" *ngIf="showRefreshPoll">
                                  <b>{{"text.verification.refresh.poll" | translate}}</b> 
                                  <span class="btn-group btn-group-xs">
                                    <button class="btn btn-xs" (click)="refresh(poll)"><b>{{"text.yes" | translate}}</b></button>
                                    <button class="btn btn-xs" (click)="showRefreshPoll = false"><b>{{"text.no" | translate}}</b></button>
                                  </span>
                              </div>
                              <div class="m-t-1" *ngIf="showResetPoll">
                                  <b>{{"text.verification.reset.poll" | translate}}</b> 
                                  <span class="btn-group btn-group-xs">
                                    <button class="btn btn-xs" (click)="reset(poll)"><b>{{"text.yes" | translate}}</b></button>
                                    <button class="btn btn-xs" (click)="showResetPoll = false"><b>{{"text.no" | translate}}</b></button>
                                  </span>
                              </div>
                              <div class="m-t-1" *ngIf="actionResultMessage[poll.id]">
                                  <b>{{actionResultMessage[poll.id]}}</b>
                              </div>
                      </div>
                   
                      <div class="panel-body" *ngIf="poll.status == 'OPEN' && isLoggedIn()">
                          <div class="error-div">
                            <alert [type]="'danger'" [dismissible]="false" *ngIf="globalError"><span [innerHtml]="globalError | safeHtml"></span></alert>
                          </div>
                          <div class="input-group" [formGroup]="pollForm">
                              <select class="form-control" name="group-poll" formControlName="id">
                                  <option [selected]="true" [value]="null">{{'text.motmPoll.select.player' | translate}}</option>
                                  <option *ngFor="let a of poll.options" [value]="a.id">{{a.name}}
                                  </option>
                              </select>

                              <div class="input-group-btn">
                                  <button (click)="vote(pollForm.value, poll)" class="btn btn-success"><span
                                          class="glyphicon glyphicon-bell"></span> {{'text.vote' | translate}}
                                  </button>
                              </div>
                          </div>
                          <small class="text-danger" [hidden]="!formErrors.id">
                            {{formErrors.id}}
                          </small>
                          <div class="m-t-1" *ngIf="voteResultMessage[poll.id]">
                              <b>{{voteResultMessage[poll.id]}}</b>
                          </div>
                      </div>
                      
                      <div class="panel-footer">
                          <div *ngIf="poll.totalVotes > 0">
                              <div *ngFor="let x of poll?.votes; let i = index">
                                  <div *ngIf="i < 4 || show">
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
                              <div *ngIf="poll.options?.length > 5">
                                  <a class="btn" *ngIf="!show" (click)="show=true">
                                    {{'text.show.more' | translate}}
                                  </a>
                                  <a class="btn" *ngIf="show" (click)="show=false">
                                    {{'text.show.less' | translate}}
                                  </a>
                              </div>
                          </div>
                          <div *ngIf="poll.totalVotes == 0">
                              {{'text.no.votes' | translate}}
                          </div>
                      </div>
                  </div>
              </div>
              </div>
  `,
    styles: []
})
export class MotmPollComponent implements OnInit {
    @Input() poll: MatchPollDTO;
    @Input() accounts: AccountDTO[];

    pollForm: FormGroup;

    globalError = '';
    actionResultMessage = [];
    voteResultMessage = [];
    voteSuccess = false;
    showResetPoll: boolean;
    showRefreshPoll: boolean;

    @ViewChild(FocusOnErrorDirective) error: FocusOnErrorDirective;

    formErrors = {
        'id': '',
    };

    constructor(private _api: PollrestcontrollerApi, private _fb: FormBuilder, private _errorHandler: ErrorHandlerService, private _validationService: ValidationService) {
    }

    ngOnInit() {
        this.pollForm = this._fb.group({
            id: ['', [<any>Validators.required, notCurrentAccountValidator()]],
        });

        //Set listener
        this.pollForm.valueChanges
            .subscribe(data => {
                this._validationService.onValueChanged(this.pollForm, this.formErrors);
            });
    }

    isLoggedIn(): boolean {
        return SecUtil.isLoggedIn();
    }

    isAdmin(): boolean {
        return SecUtil.isAdmin();
    }

    reset(poll: MatchPollDTO) {
        this._api.resetMatchPoll(poll.id, SecUtil.getJwtHeaders()).subscribe(
            p => {
                this._api.getMatchPollById(poll.id, SecUtil.getJwtHeaders()).subscribe(p => this.poll = p);
            },
            error => {
                this._errorHandler.handle(error, "manofthematch");
            },
            () => {
                this.showResetPoll = false;
            }
        )
    }

    refresh(poll: MatchPollDTO) {
        this._api.refreshMatchPoll(poll.matchId, SecUtil.getJwtHeaders()).subscribe(
            p => {
                this._api.getMatchPollById(poll.id, SecUtil.getJwtHeaders()).subscribe(p => this.poll = p);
            },
            error => {
                this._errorHandler.handle(error, "manofthematch");
            },
            () => {
                this.showRefreshPoll = false;
            }
        )
    }

    vote(account: any, poll: MatchPollDTO) {
        this.globalError = '';
        this.voteSuccess = false;

        //Mark all controls as dirty, since the form has been submitted
        this._validationService.markControlsAsDirty(this.pollForm);
        //trigger the validation
        this._validationService.onValueChanged(this.pollForm, this.formErrors);

        if (this.pollForm.valid) {
            this._api.matchPollVote(poll.id, {answer: account.id}, SecUtil.getJwtHeaders()).subscribe(
                p => {
                    this._api.getMatchPollById(poll.id, SecUtil.getJwtHeaders()).subscribe(p => this.poll = p);
                    this.voteSuccess = true;
                },
                error => {
                    this.globalError = this._errorHandler.handle(error, "manofthematch");
                    this.error.trigger();
                }
            )
        }
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
