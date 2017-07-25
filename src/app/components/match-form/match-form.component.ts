import {Component, OnInit, Input} from "@angular/core";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {MatchDTO} from "../../ws/soccer/model/MatchDTO";
import {MatchesrestcontrollerApi} from "../../ws/soccer/api/MatchesrestcontrollerApi";
import {TeamsrestcontrollerApi} from "../../ws/soccer/api/TeamsrestcontrollerApi";
import {TeamDTO} from "../../ws/soccer/model/TeamDTO";
import {SeasonsrestcontrollerApi} from "../../ws/soccer/api/SeasonsrestcontrollerApi";
import {SeasonDTO} from "../../ws/soccer/model/SeasonDTO";
import {LoginService} from "../../services/login.service";
import {Util} from "../../classes/util";
import {ValidationService} from "../../services/validation.service";
import {ErrorHandlerService} from "../../services/error-handler.service";
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
              <option *ngFor="let ht of teams" [value]="ht">{{ht.name}}</option>
        </select>
        <small class="text-danger" [hidden]="!formErrors.homeTeam">
             {{formErrors.homeTeam}}
        </small>
      </div>
       <div class="form-group">
        <label for="awayTeam">{{"label.match.awayTeam" | translate}}</label>
        <select name="awayTeam" class="form-control" [formControl]="matchForm.controls['awayTeam']">
              <option *ngFor="let at of teams" [value]="at">{{at.name}}</option>
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
              <option value="{{statusEnum.NOTPLAYED}}">{{"text.match.status.notPlayed" | translate}}</option>
              <option value="{{statusEnum.PLAYED}}">{{"text.match.status.played" | translate}}</option>
              <option value="{{statusEnum.CANCELLED}}">{{"text.match.status.cancelled" | translate}}</option>
        </select>
         <small class="text-danger" [hidden]="!formErrors.status">
             {{formErrors.status}}
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
        <input type="hidden" class="form-control" [formControl]="matchForm.controls['time']">
      </div>
      
       
      <div class="form-group box-footer">
        <button id="submit" type="submit" class="btn btn-primary">{{"btn.submit" | translate}}</button>
        <button id="btnReset" type="reset" class="btn btn-info">Reset</button>
        <a id="btnCancel" class="btn btn-default" [routerLink]="['/profile']">{{"btn.cancel" | translate}}</a>
      </div>
    </form>
    </div>
`
})
export class MatchFormComponent implements OnInit {
    @Input() update: boolean;
    @Input() match: MatchDTO;

    matchForm: FormGroup;
    submitted: boolean;

    statusEnum = StatusEnum;

    globalError : string = "";
    updateSuccess : boolean = false;
    createSuccess : boolean = false;

    teams: TeamDTO[];
    seasons: SeasonDTO[];
    dt: Date;
    ti: Date;

    formErrors = {
        'homeTeam': '',
        'awayTeam': '',
        'season': '',
        'date': '',
        'time': '',
        'status': '',
        'atgoals': '',
        'htgoals': '',
    };

    constructor(private _fb: FormBuilder, private _api: MatchesrestcontrollerApi, private _teamApi: TeamsrestcontrollerApi, private _seasonApi: SeasonsrestcontrollerApi, private _loginService: LoginService, private _validationService : ValidationService, private _errorHandler : ErrorHandlerService) {
    }

    ngOnInit() {
        this.matchForm = this._fb.group({
            homeTeam: ['', [<any>Validators.required]],
            awayTeam: ['', [<any>Validators.required]],
            season: ['', [<any>Validators.required]],
            date: ['', [<any>Validators.required]],
            time: ['', [<any>Validators.required]],
            status: ['', [<any>Validators.required]],
            atgoals: ['', [<any>Validators.required, Validators.pattern("^[0-9]$")]],
            htgoals: ['', [<any>Validators.required, Validators.pattern("^[0-9]$")]]
        });

        if (this.update) {
            this.matchForm.patchValue({homeTeam: this.match.homeTeam});
            this.matchForm.patchValue({awayTeam: this.match.awayTeam});
            this.matchForm.patchValue({season: this.match.season});
            this.matchForm.patchValue({date: this.match.date});
            this.matchForm.patchValue({hour: this.match.hour});
            this.matchForm.patchValue({status: this.match.status});
            this.matchForm.patchValue({atGoals: this.match.atGoals});
            this.matchForm.patchValue({htGoals: this.match.htGoals});
            this.matchForm.patchValue({goals: this.match.goals});

            this.ti = Util.parseTime(this.match.date, this.match.hour);
            this.dt = Util.toDate(this.match.date);
        }

        else {
            this.dt = new Date();
            this.ti = Util.parseTime(Util.parseDate(new Date()), "20:00");
        }

        this._teamApi.getTeams().subscribe(t => this.teams = t);
        this._seasonApi.getSeasons().subscribe(s => this.seasons = s);

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

    submit(model: MatchDTO) {
        this.submitted = true;
        //this.match.season = this.matchForm.getRawValue();

        //Mark all controls as dirty, since the form has been submitted
        this._validationService.markControlsAsDirty(this.matchForm);
        //trigger the validation
        this._validationService.onValueChanged(this.matchForm, this.formErrors);

        if (this.matchForm.valid) {
            if (this.update) {
                this._api.updateMatch(model, this._loginService.jwtHeader).subscribe(
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
                this._api.createMatch(model, this._loginService.jwtHeader).subscribe(
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
