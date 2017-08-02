import {Component, OnInit, Input} from "@angular/core";
import {FormGroup, FormBuilder, Validators, FormArray} from "@angular/forms";
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
import {GoalDTO} from "../../ws/soccer/model/GoalDTO";
import StatusEnum = MatchDTO.StatusEnum;

@Component({
    selector: 'app-match-form',
    template: `
  
  <div class="box"> 
    <alert [type]="'success'" [dismissible]="true" *ngIf="createSuccess">{{"text.match.success.create" | translate}}</alert>
    <alert [type]="'success'" [dismissible]="true" *ngIf="updateSuccess">{{"text.match.success.update" | translate}}</alert>
    <alert [type]="'danger'" [dismissible]="true" *ngIf="globalError">{{globalError}}</alert>
    
    <form [formGroup]="matchForm" novalidate (ngSubmit)="submit(matchForm.value)">
      <div class="form-group">
        <label for="homeTeam">{{"label.match.homeTeam" | translate}}</label>
        <select name="homeTeam" class="form-control" [formControl]="matchForm.controls['homeTeam']">
              <option *ngFor="let ht of teams" [value]="ht" [selected]="matchForm.value?.homeTeam?.id == ht.id">{{ht.name}}</option>
        </select>
        <small class="text-danger" [hidden]="!formErrors.homeTeam">
             {{formErrors.homeTeam}}
        </small>
      </div>
       <div class="form-group">
        <label for="awayTeam">{{"label.match.awayTeam" | translate}}</label>
        <select name="awayTeam" class="form-control" [formControl]="matchForm.controls['awayTeam']">
              <option *ngFor="let at of teams" [value]="at" [selected]="matchForm.value?.awayTeam?.id == at.id">{{at.name}}</option>
        </select>
         <small class="text-danger" [hidden]="!formErrors.awayTeam">
             {{formErrors.awayTeam}}
        </small>
      </div>
       <div class="form-group">
        <label for="season">{{"label.match.season" | translate}}</label>
        <select name="season" class="form-control" [formControl]="matchForm.controls['season']">
              <option *ngFor="let s of seasons" [value]="s">{{s.description}}</option>
        </select>
         <small class="text-danger" [hidden]="!formErrors.season">
             {{formErrors.season}}
        </small>
      </div>
       <div class="form-group">
        <label for="status">{{"label.match.status" | translate}}</label>
        <select name="season" class="form-control" [formControl]="matchForm.controls['status']">
              <option value="{{statusEnum.NOTPLAYED}}" [selected]="matchForm.value?.status == statusEnum.NOTPLAYED">{{"text.match.status.notPlayed" | translate}}</option>
              <option value="{{statusEnum.PLAYED}}" [selected]="matchForm.value?.status == statusEnum.PLAYED">{{"text.match.status.played" | translate}}</option>
              <option value="{{statusEnum.CANCELLED}}" [selected]="matchForm.value?.status == statusEnum.CANCELLED">{{"text.match.status.cancelled" | translate}}</option>
        </select>
         <small class="text-danger" [hidden]="!formErrors.status">
             {{formErrors.status}}
        </small>
      </div>
     
      <div *ngIf="matchId">
       <div class="form-group">
        <label for="htGoals">{{"label.match.htGoals" | translate}}</label>
        <input name="htGoals" class="form-control" [formControl]="matchForm.controls.htGoals"/>
         <small class="text-danger" [hidden]="!formErrors.htGoals">
             {{formErrors.htGoals}}
        </small>
      </div>
      <div class="form-group">
        <label for="atGoals">{{"label.match.atGoals" | translate}}</label>
        <input name="atGoals" class="form-control" [formControl]="matchForm.controls.atGoals"/>
         <small class="text-danger" [hidden]="!formErrors.atGoals">
             {{formErrors.atGoals}}
        </small>
      </div>
           
       <div class="form-group" *ngIf="matchForm.value?.status == statusEnum.PLAYED && hasGoals(matchForm.value)">
        <div formArrayName="goals">
            <label for="goals">{{"label.match.goals" | translate}}</label>
            <div *ngFor="let goal of goals.controls; let i = index" [formGroupName]="i">
                <app-goal [goal]="goals.controls[i]" [players]="accounts"></app-goal>
            </div>
        </div>
         <small class="text-danger" [hidden]="!formErrors.date">
             {{formErrors.goals}}
        </small>
      </div>
      
      
      <div class="form-group">
        <label for="date">{{"label.match.date" | translate}}</label>
        <datepicker [ngModel]="dt" (ngModelChange)="updateDateValue(dt)" [ngModelOptions]="{standalone: true}"></datepicker>
        <input type="hidden" [formControl]="matchForm.controls['date']">
         <small class="text-danger" [hidden]="!formErrors.date">
             {{formErrors.date}}
        </small>
      </div>
      <div class="form-group">
        <label for="time">{{"label.match.time" | translate}}</label>
        <timepicker [(ngModel)]="ti" (ngModelChange)="updateTimeValue(ti)" [ngModelOptions]="{standalone: true}"></timepicker>
         <small class="text-danger" [hidden]="!formErrors.time">
             {{formErrors.time}}
        </small>
        <input type="hidden" class="form-control" [formControl]="matchForm.controls.time">
      </div>
      
       
      <div class="form-group box-footer">
        <button id="submit" type="submit" class="btn btn-primary">{{"btn.submit" | translate}}</button>
        <button id="btnReset" type="reset" class="btn btn-info">Reset</button>
        <a id="btnCancel" class="btn btn-default" [routerLink]="['/profile']">{{"btn.cancel" | translate}}</a>
      </div>
      </div>
    </form>
    </div>
`
})
export class MatchFormComponent implements OnInit {
    @Input() matchId?: any;

    homeTeamName: string = "SVK";

    matchForm: FormGroup;
    submitted: boolean;

    statusEnum = StatusEnum;

    globalError : string = "";
    updateSuccess : boolean = false;
    createSuccess : boolean = false;

    teams: TeamDTO[];
    seasons: SeasonDTO[];
    accounts: AccountDTO[];

    dt: Date;
    ti: Date;

    formErrors = {
        'homeTeam': '',
        'awayTeam': '',
        'season': '',
        'date': '',
        'time': '',
        'status': '',
        'atGoals': '',
        'htGoals': '',
        'goals': '',
    };

    constructor(private _fb: FormBuilder, private _api: MatchesrestcontrollerApi, private _teamApi: TeamsrestcontrollerApi,
                private _seasonApi: SeasonsrestcontrollerApi, private _accountApi: AccountrestcontrollerApi,
                private _validationService: ValidationService, private _errorHandler: ErrorHandlerService) {
    }

    ngOnInit() {
        this.matchForm = this._fb.group({
            homeTeam: ['', [<any>Validators.required]],
            awayTeam: ['', [<any>Validators.required]],
            season: ['', [<any>Validators.required]],
            date: ['', [<any>Validators.required]],
            time: ['', [<any>Validators.required]],
            status: ['', [<any>Validators.required]],
            goals: [this._fb.array([])],
            atGoals: ['', [<any>Validators.required, Validators.pattern("^[0-9]$")]],
            htGoals: ['', [<any>Validators.required, Validators.pattern("^[0-9]$")]]
        });

        if (this.matchId) {
            this._api.getMatch(this.matchId, SecUtil.getJwtHeaders()).subscribe(
                match => {
                    this.matchForm.patchValue({homeTeam: match.homeTeam});
                    this.matchForm.patchValue({awayTeam: match.awayTeam});
                    this.matchForm.patchValue({season: match.season});
                    this.matchForm.patchValue({date: match.date});
                    this.matchForm.patchValue({hour: match.hour});
                    this.matchForm.patchValue({status: match.status});
                    this.matchForm.patchValue({atGoals: match.atGoals});
                    this.matchForm.patchValue({htGoals: match.htGoals});
                    this.setGoals(match.goals);

                    this.ti = Util.parseTime(match.date, match.hour);
                    this.dt = Util.toDate(match.date);
                }
            );
        }


        else {
            this.dt = new Date();
            this.ti = Util.parseTime(Util.parseDate(new Date()), "20:00");
        }

        this._teamApi.getTeams().subscribe(t => this.teams = t);
        this._seasonApi.getSeasons().subscribe(s => this.seasons = s);
        this._accountApi.getAccounts(SecUtil.getJwtHeaders()).subscribe(a => this.accounts = a);

        //Set listener
        this.matchForm.valueChanges
            .subscribe(data => this._validationService.onValueChanged(this.matchForm, this.formErrors));

    }

    updateTimeValue(time: Date) {
        this.matchForm.patchValue({time: time.getHours() + ':' + time.getMinutes()});
    }

    updateDateValue(date: Date) {
        this.matchForm.patchValue({date: Util.parseDate(date)});
    }

    hasGoals(model: MatchDTO) {
        return model.homeTeam.name == this.homeTeamName && model.goals.length > 0;
    }

    setGoals(goals: GoalDTO[]) {
        const goalsFGs = goals.map(address => this._fb.group(address));
        const goalsFormArray = this._fb.array(goalsFGs);
        this.matchForm.setControl('goals', goalsFormArray);
    }

    get goals(): FormArray {
        return this.matchForm.get('goals') as FormArray;
    };

    submit(model: MatchDTO) {
        this.submitted = true;
        //this.match.season = this.matchForm.getRawValue();

        //Mark all controls as dirty, since the form has been submitted
        this._validationService.markControlsAsDirty(this.matchForm);
        //trigger the validation
        this._validationService.onValueChanged(this.matchForm, this.formErrors);

        if (this.matchForm.valid) {
            if (this.matchId) {
                this._api.updateMatch(model, SecUtil.getJwtHeaders()).subscribe(
                    r => {
                        this.createSuccess = true;
                        this.globalError = '';
                        console.log("Posted");
                    },
                    error => {
                        this.globalError = this._errorHandler.handle(error);
                    },
                    () => {
                        console.log("completed");
                    }
                )
            } else {
                this._api.createMatch(model, SecUtil.getJwtHeaders()).subscribe(
                    r => {
                        this.updateSuccess = true;
                        this.globalError = '';
                        console.log("Posted");
                    },
                    error => {
                        this.globalError = this._errorHandler.handle(error);
                    },
                    () => {
                        console.log("completed");
                    }
                )
            }

        } else {
            console.log("invalid form: "+ this.matchForm);
        }
    }
}
