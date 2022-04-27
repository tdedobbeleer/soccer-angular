import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Util} from '../../classes/util';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ErrorHandlerService} from '../../services/error-handler.service';
import {ValidationService} from '../../services/validation.service';
import {FocusOnErrorDirective} from '../../directives/focus-on-error.directive';
import {environment} from '../../../environments/environment';
import {
    AccountDTO,
    AccountRestControllerService,
    GoalDTO,
    MatchDTO,
    MatchesRestControllerService,
    SeasonDTO,
    SeasonsRestControllerService,
    TeamDTO,
    TeamsRestControllerService
} from '../../ws/soccer';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/concat';
import 'rxjs/add/operator/map';
import StatusEnum = MatchDTO.StatusEnum;

@Component({
    selector: 'app-edit-match-form',
    template: `
<div class="box">
    <div class="error-div">
         <alert [type]="'danger'" [dismissible]="false" *ngIf="globalError"><span [innerHtml]="globalError | safeHtml"></span></alert>
    </div>

    <form [formGroup]="matchForm" novalidate (ngSubmit)="submit(matchForm?.value)">
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
              <option *ngFor="let s of seasons" [ngValue]="s" [selected]="matchForm.value?.season?.id == s.id">{{s.description}}</option>
        </select>
         <small class="text-danger" [hidden]="!formErrors.season">
             {{formErrors.season}}
        </small>
      </div>
       <div class="form-group">
        <label for="status">{{"label.match.status" | translate}}</label>
        <select name="season" class="form-control" formControlName="status">
              <option value="null" disabled selected>{{'text.select' | translate}}</option>
              <option value="{{statusEnum.NOTPLAYED}}" [selected]="matchForm.value?.status == statusEnum.NOTPLAYED">{{"text.match.status.notPlayed" | translate}}</option>
              <option value="{{statusEnum.PLAYED}}" [selected]="matchForm.value?.status == statusEnum.PLAYED">{{"text.match.status.played" | translate}}</option>
              <option value="{{statusEnum.CANCELLED}}" [selected]="matchForm.value?.status == statusEnum.CANCELLED">{{"text.match.status.cancelled" | translate}}</option>
        </select>
         <small class="text-danger" [hidden]="!formErrors.status">
             {{formErrors.status}}
        </small>
      </div>

        <div *ngIf="matchForm.value?.status == statusEnum.CANCELLED">
            <div class="form-group">
                <label for="statusText">{{"label.match.statusText" | translate}}</label>
                <textarea name="statusText" class="form-control" formControlName="statusText"></textarea>
                <small class="text-danger" [hidden]="!formErrors.statusText">
                    {{formErrors.statusText}}
                </small>
            </div>
        </div>
       
      <div *ngIf="matchForm.value?.status == statusEnum.PLAYED">         
        <div class="form-group">
        <label for="htGoals">{{"label.match.htGoals" | translate}}</label>
        <input name="htGoals" type="number" class="form-control" formControlName="htGoals" (keyup)="onGoalsChange(matchForm.value.homeTeam, matchForm.value.htGoals)"/>
         <small class="text-danger" [hidden]="!formErrors.htGoals">
             {{formErrors.htGoals}}
        </small>
        </div>
        <div class="form-group">
        <label for="atGoals">{{"label.match.atGoals" | translate}}</label>
        <input name="atGoals" type="number" class="form-control" formControlName="atGoals" (keyup)="onGoalsChange(matchForm.value.awayTeam, matchForm.value.atGoals)"/>
         <small class="text-danger" [hidden]="!formErrors.atGoals">
             {{formErrors.atGoals}}
        </small>
        </div>
           
        <div class="form-group" *ngIf="hasGoals(matchForm.value)">
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
      </div>
      
      
      <div class="form-group">
        <label for="date">{{"label.match.date" | translate}}</label>
          <input type="text"
                 class="form-control"
                 #dp="bsDatepicker"
                 value="{{ dt | date:'dd/MM/yyyy' }}"
                 [bsConfig]="{ containerClass: 'theme-blue' }"
                 bsDatepicker [(bsValue)]="dt" (bsValueChange)="updateDateValue()">
        <input type="hidden" formControlName="date">
         <small class="text-danger" [hidden]="!formErrors.date">
             {{formErrors.date}}
        </small>
      </div>
      <div class="form-group">
        <label for="time">{{"label.match.time" | translate}}</label>
        <div class="row">
            <div class="col-md-8 col-xs-12">
                <timepicker [(ngModel)]="ti" (ngModelChange)="updateTimeValue()"
                            [ngModelOptions]="{standalone: true}"></timepicker>
                 <small class="text-danger" [hidden]="!formErrors.hour">
                     {{formErrors.hour}}
                </small>
            </div>
        </div>
      
        <input type="hidden" class="form-control" formControlName="hour">
      </div>
      
       
      <div class="form-group box-footer">
        <div class="btn-group">
            <button id="submit" type="submit" class="btn btn-primary" [ladda]="isLoading">{{"btn.submit" | translate}}</button>
            <a id="btnCancel" class="btn btn-default" [routerLink]="['/matches']">{{"btn.cancel" | translate}}</a>
        </div>
      </div>
      </form>
      </div>
  `,
    styles: []
})
export class EditMatchFormComponent implements OnInit {

    @Input() matchId?: any;

    defaultTeamName: string = environment.defaultTeamName;

    matchForm: FormGroup;

    statusEnum = StatusEnum;

    globalError: string = "";

    isLoading: boolean = false;

    teams: TeamDTO[];
    seasons: SeasonDTO[];
    accounts: AccountDTO[];

    lastKnownGoals = this._fb.array([]);

    @ViewChild(FocusOnErrorDirective, {static: true}) error: FocusOnErrorDirective;

    dt: Date;
    ti: Date;

    formErrors = {
        'homeTeam': '',
        'awayTeam': '',
        'season': '',
        'date': '',
        'hour': '',
        'status': '',
        'statusText': '',
        'atGoals': '',
        'htGoals': '',
        'goals': '',
    };

    constructor(private _fb: FormBuilder, private _api: MatchesRestControllerService, private _teamApi: TeamsRestControllerService,
                private _seasonApi: SeasonsRestControllerService, private _accountApi: AccountRestControllerService,
                private _validationService: ValidationService, private _errorHandler: ErrorHandlerService,
                private _router: Router) {
    }

    ngOnInit() {
        this.matchForm = this._fb.group({
            id: [this.matchId, [<any>Validators.required]],
            homeTeam: ['', [<any>Validators.required]],
            awayTeam: ['', [<any>Validators.required]],
            season: ['', [<any>Validators.required]],
            date: ['', [<any>Validators.required]],
            hour: ['', [<any>Validators.required]],
            status: ['', [<any>Validators.required]],
            statusText: ['', []],
            goals: [this._fb.array([])],
            atGoals: ['', [<any>Validators.required, Validators.pattern("^[0-9]+$")]],
            htGoals: ['', [<any>Validators.required, Validators.pattern("^[0-9]+$")]]
        });

        Observable.concat(
            this._teamApi.getTeams().map(t => this.teams = t),
            this._seasonApi.getSeasons().map(s => this.seasons = s),
            this._accountApi.getAccounts().map(a => this.accounts = a)).subscribe(
            () => console.log("loaded"),
            (e) => {
                console.log(e)
            },
            () => {
                this._api.getMatch(this.matchId).subscribe(
                    match => {
                        this.matchForm.patchValue({homeTeam: match.homeTeam});
                        this.matchForm.patchValue({awayTeam: match.awayTeam});
                        this.matchForm.patchValue({season: match.season});
                        this.matchForm.patchValue({date: match.date});
                        this.matchForm.patchValue({hour: match.hour});
                        this.matchForm.patchValue({status: match.status});
                        this.matchForm.patchValue({statusText: match.statusText});
                        this.matchForm.patchValue({atGoals: match.atGoals});
                        this.matchForm.patchValue({htGoals: match.htGoals});
                        //Set the goals
                        this.setGoals(match.goals);

                        this.ti = Util.parseTime(match.date, match.hour);
                        this.dt = Util.toDate(match.date);

                        this.updateDateValue();
                        this.updateTimeValue();
                    }
                );

                //Set listener
                this.matchForm.valueChanges
                    .subscribe(data => {
                        this._validationService.onValueChanged(this.matchForm, this.formErrors);
                        //this.onGoalsChange(this.matchForm.value.homeTeam, this.matchForm.value.htGoals);
                        //this.onGoalsChange(this.matchForm.value.awayTeam, this.matchForm.value.atGoals);
                    });
            });

    }

    updateTimeValue() {
        let t = Util.addZero(this.ti.getHours()) + ':' + Util.addZero(this.ti.getMinutes());
        console.log("Patching value time to " + t);
        this.matchForm.patchValue({hour: t});
    }

    updateDateValue() {
        let t = Util.parseDate(this.dt);
        console.log("Patching value date to " + t);
        this.matchForm.patchValue({date: t});
    }

    hasGoals(model: MatchDTO) {
        return model.goals.length > 0;
    }

    setGoals(goals: GoalDTO[]) {
        const goalsFGs = goals.map(g => this._fb.group(g));
        const goalsFormArray = this._fb.array(goalsFGs);
        this.matchForm.setControl('goals', goalsFormArray);
    }

    get goals(): FormArray {
        return this.matchForm.get('goals') as FormArray;
    };

    onGoalsChange(team: TeamDTO, nrg: any) {
        if (team.name === this.defaultTeamName && nrg !== '') {
            let nrOfGoals = this.goals.length;
            if (nrg !== null && nrg !== undefined) {
                if (nrOfGoals > nrg) {
                    const removeTotal = nrOfGoals - nrg;
                    let indexToRemove = nrOfGoals - 1;
                    for (let _i = 0; _i < removeTotal; _i++) {
                        this.goals.removeAt(indexToRemove);
                        indexToRemove--;
                    }
                } else if (nrOfGoals < nrg) {
                    const add = nrg - nrOfGoals;
                    let order = nrOfGoals++;
                    for (let _i = 0; _i < add; _i++) {
                        this.goals.push(this._fb.group({order: order, assist: null, scorer: null}));
                        order++;
                    }
                }
            }
        }
    }

    submit(model: any) {
        this.globalError = '';

        //Mark all controls as dirty, since the form has been submitted
        this._validationService.markControlsAsDirty(this.matchForm);
        //trigger the validation
        this._validationService.onValueChanged(this.matchForm, this.formErrors);

        if (this.matchForm.valid) {
            this.isLoading = true;

            this._api.updateMatch(model).subscribe(
                r => {
                    this.globalError = '';
                    console.log("Posted");
                },
                error => {
                    this.globalError = this._errorHandler.handle(error);
                    this.error.trigger();
                },
                () => {
                    this.isLoading = false;
                    this._router.navigate(['/matches']);
                }
            )

        } else {
            console.log("invalid form: " + this.matchForm);
        }
    }

}
