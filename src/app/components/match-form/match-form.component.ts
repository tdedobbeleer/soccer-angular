import {Component, OnInit, ViewChild} from "@angular/core";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {MatchDTO} from "../../ws/soccer/model/MatchDTO";
import {MatchesrestcontrollerApi} from "../../ws/soccer/api/MatchesrestcontrollerApi";
import {TeamsrestcontrollerApi} from "../../ws/soccer/api/TeamsrestcontrollerApi";
import {TeamDTO} from "../../ws/soccer/model/TeamDTO";
import {SeasonsrestcontrollerApi} from "../../ws/soccer/api/SeasonsrestcontrollerApi";
import {SeasonDTO} from "../../ws/soccer/model/SeasonDTO";
import {Util} from "../../classes/util";
import {ValidationService} from "../../services/validation.service";
import {ErrorHandlerService} from "../../services/error-handler.service";
import {SecUtil} from "../../classes/sec-util";
import {AccountrestcontrollerApi} from "../../ws/soccer/api/AccountrestcontrollerApi";
import {AccountDTO} from "../../ws/soccer/model/AccountDTO";
import {FocusOnErrorDirective} from "../../directives/focus-on-error.directive";
import {FocusOnSuccessDirective} from "../../directives/focus-on-success.directive";
import StatusEnum = MatchDTO.StatusEnum;

@Component({
    selector: 'app-match-form',
    template: `
  
  <div class="box">
    <div class="success-div">
        <alert [type]="'success'" [dismissible]="false" *ngIf="createSuccess">{{"text.match.success.create" | translate}}</alert>
    </div>
    <div class="error-div">
         <alert [type]="'danger'" [dismissible]="false" *ngIf="globalError"><span [innerHtml]="globalError | safeHtml"></span></alert>
    </div>
    
    <form [formGroup]="matchForm" novalidate (ngSubmit)="submit(matchForm.value)" *ngIf="loaded">
      <div class="form-group">
        <label for="homeTeam">{{"label.match.homeTeam" | translate}}</label>
        <select name="homeTeam" class="form-control" formControlName="homeTeam">
              <option value="null" disabled selected>{{'text.select' | translate}}</option>
              <option *ngFor="let ht of teams" [ngValue]="ht" [selected]="matchForm.value?.homeTeam?.id == ht.id">{{ht.name}}</option>
        </select>
        <small class="text-danger" [hidden]="!formErrors.homeTeam">
             {{formErrors.homeTeam}}
        </small>
      </div>
       <div class="form-group">
        <label for="awayTeam">{{"label.match.awayTeam" | translate}}</label>
        <select name="awayTeam" class="form-control" formControlName="awayTeam">
              <option value="null" disabled selected>{{'text.select' | translate}}</option>
              <option *ngFor="let at of teams" [ngValue]="at" [selected]="matchForm.value?.awayTeam?.id == at.id">{{at.name}}</option>
        </select>
         <small class="text-danger" [hidden]="!formErrors.awayTeam">
             {{formErrors.awayTeam}}
        </small>
      </div>
       <div class="form-group">
        <label for="season">{{"label.match.season" | translate}}</label>
        <select name="season" class="form-control" formControlName="season">
              <option value="null" disabled>{{'text.select' | translate}}</option>
              <option *ngFor="let s of seasons" [ngValue]="s">{{s.description}}</option>
        </select>
         <small class="text-danger" [hidden]="!formErrors.season">
             {{formErrors.season}}
        </small>
      </div>      
      
      <div class="form-group">
        <label for="date">{{"label.match.date" | translate}}</label>
        <datepicker [ngModel]="dt" (ngModelChange)="updateDateValue(dt)" [ngModelOptions]="{standalone: true}"></datepicker>
        <input type="hidden"formControlName="date">
         <small class="text-danger" [hidden]="!formErrors.date">
             {{formErrors.date}}
        </small>
      </div>
      <div class="form-group">
        <label for="time">{{"label.match.time" | translate}}</label>
        <div class="row">
            <div class="col-md-8 col-xs-12">
                <timepicker [(ngModel)]="ti" (ngModelChange)="updateTimeValue(ti)" [ngModelOptions]="{standalone: true}"></timepicker>
                 <small class="text-danger" [hidden]="!formErrors.hour">
                     {{formErrors.hour}}
                </small>
            </div>
        </div>
      
        <input type="hidden" class="form-control" formControlName="hour">
      </div>
      
       
      <div class="form-group box-footer">
        <button id="submit" type="submit" class="btn btn-primary">{{"btn.submit" | translate}}</button>
        <button id="btnReset" type="reset" class="btn btn-info">Reset</button>
        <a id="btnCancel" class="btn btn-default" [routerLink]="['/matches']">{{"btn.cancel" | translate}}</a>
      </div>
    </form>
    </div>
`
})
export class MatchFormComponent implements OnInit {
    matchForm: FormGroup;
    loaded: boolean;

    globalError : string = "";
    createSuccess : boolean = false;

    teams: TeamDTO[];
    seasons: SeasonDTO[];
    accounts: AccountDTO[];

    @ViewChild(FocusOnErrorDirective) error: FocusOnErrorDirective;
    @ViewChild(FocusOnSuccessDirective) success: FocusOnErrorDirective;

    dt: Date;
    ti: Date;

    formErrors = {
        'homeTeam': '',
        'awayTeam': '',
        'season': '',
        'date': '',
        'hour': '',
    };

    constructor(private _fb: FormBuilder, private _api: MatchesrestcontrollerApi, private _teamApi: TeamsrestcontrollerApi,
                private _seasonApi: SeasonsrestcontrollerApi, private _accountApi: AccountrestcontrollerApi,
                private _validationService: ValidationService, private _errorHandler: ErrorHandlerService) {
    }

    ngOnInit() {
        this.matchForm = this._fb.group({
            homeTeam: [null, [<any>Validators.required]],
            awayTeam: [null, [<any>Validators.required]],
            season: [null, [<any>Validators.required]],
            date: ['', [<any>Validators.required]],
            hour: ['', [<any>Validators.required]],
        });
        this.dt = new Date();
        this.ti = Util.parseTime(Util.parseDate(new Date()), "20:00");
        //Set the date and time
        this.updateDateValue(this.dt);
        this.updateTimeValue(this.ti);
        this.loaded = true;

        //Set listener
        this.matchForm.valueChanges
            .subscribe(data => this._validationService.onValueChanged(this.matchForm, this.formErrors));

        this._teamApi.getTeams().subscribe(t => this.teams = t);
        this._seasonApi.getSeasons().subscribe(s => this.seasons = s);
        this._accountApi.getAccounts(SecUtil.getJwtHeaders()).subscribe(a => this.accounts = a);

    }

    updateTimeValue(time: Date) {
        this.matchForm.patchValue({hour: Util.addZero(time.getHours()) + ':' + Util.addZero(time.getMinutes())});
    }

    updateDateValue(date: Date) {
        this.matchForm.patchValue({date: Util.parseDate(date)});
    }

    submit(model: MatchDTO) {
        this.createSuccess = false;
        this.globalError = '';
        //this.match.season = this.matchForm.getRawValue();

        //Mark all controls as dirty, since the form has been submitted
        this._validationService.markControlsAsDirty(this.matchForm);
        //trigger the validation
        this._validationService.onValueChanged(this.matchForm, this.formErrors);

        if (this.matchForm.valid) {
            this._api.createMatch(model, SecUtil.getJwtHeaders()).subscribe(
                r => {
                    this.globalError = '';
                    this.createSuccess = true;
                    this.success.trigger();
                    console.log("Posted");
                },
                error => {
                    this.globalError = this._errorHandler.handle(error);
                    this.error.trigger();
                },
            )

        } else {
            console.log("invalid form: "+ this.matchForm);
        }
    }
}
