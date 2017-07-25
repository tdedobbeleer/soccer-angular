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

@Component({
    selector: 'app-match-form',
    template: `
  
  <div class="box">  
    <form [formGroup]="matchForm" novalidate (ngSubmit)="submit(matchForm.value, matchForm.valid)">
      <div class="form-group">
        <label for="homeTeam">{{"label.match.homeTeam" | translate}}</label>
        <select name="homeTeam" class="form-control" [formControl]="matchForm.controls['homeTeam']">
              <option *ngFor="let ht of teams" [value]="ht">{{ht.name}}</option>
        </select>
      </div>
       <div class="form-group">
        <label for="awayTeam">{{"label.match.awayTeam" | translate}}</label>
        <select name="awayTeam" class="form-control" [formControl]="matchForm.controls['awayTeam']">
              <option *ngFor="let at of teams" [value]="at">{{at.name}}</option>
        </select>
      </div>
       <div class="form-group">
        <label for="season">{{"label.match.season" | translate}}</label>
        <select name="season" class="form-control" [formControl]="matchForm.controls['season']">
              <option *ngFor="let s of seasons" [value]="s">{{s.description}}</option>
        </select>
      </div><div class="form-group">
        <label for="date">{{"label.match.date" | translate}}</label>
        <datepicker [ngModel]="dt" (ngModelChange)="updateDateValue(dt)" [ngModelOptions]="{standalone: true}"></datepicker>
        <input type="hidden" [formControl]="matchForm.controls['date']">
        <small *ngIf="submitted && matchForm.controls.date.errors" class="text-danger">
              {{"validation.match.date.empty" | translate}}
        </small>
      </div>
      <div class="form-group">
        <label for="time">{{"label.match.time" | translate}}</label>
        <timepicker [(ngModel)]="ti" (ngModelChange)="updateTimeValue(ti)" [ngModelOptions]="{standalone: true}"></timepicker>
        <small *ngIf="submitted && matchForm.controls.time.errors" class="text-danger">
                {{"validation.message.content.empty" | translate}}
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

    teams: TeamDTO[];
    seasons: SeasonDTO[];
    dt: Date;
    ti: Date;

    constructor(private _fb: FormBuilder, private _api: MatchesrestcontrollerApi, private _teamApi: TeamsrestcontrollerApi, private _seasonApi: SeasonsrestcontrollerApi, private _loginService: LoginService) {
    }

    ngOnInit() {
        this.matchForm = this._fb.group({
            homeTeam: ['', [<any>Validators.required]],
            awayTeam: ['', [<any>Validators.required]],
            season: ['', [<any>Validators.required]],
            date: ['', [<any>Validators.required]],
            time: ['', [<any>Validators.required]],
            status: ['', [<any>Validators.required]],
            atgoals: ['', [<any>Validators.required]],
            htgoals: ['', [<any>Validators.required]]
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

    }

    updateTimeValue(time: Date) {
        this.matchForm.patchValue({time: time.getHours() + ':' + time.getMinutes()});
    }

    updateDateValue(date: Date) {
        this.matchForm.patchValue({date: Util.parseDate(date)});
    }

    submit(model: MatchDTO, isValid: boolean) {
        this.submitted = true;
        this.match.season = this.matchForm.getRawValue();
        if (isValid) {
            if (this.update) {
                this._api.updateMatch(model, this._loginService.jwtHeader).subscribe(
                    r => {
                        console.log("Posted");
                    },
                    error => {
                        console.log("error");
                    },
                    () => {
                        console.log("completed");
                    }
                )
            } else {
                this._api.createMatch(model, this._loginService.jwtHeader).subscribe(
                    r => {
                        console.log("Posted");
                    },
                    error => {
                        console.log("error");
                    },
                    () => {
                        console.log("completed");
                    }
                )
            }

        }
        console.log(model, isValid);
    }
}
