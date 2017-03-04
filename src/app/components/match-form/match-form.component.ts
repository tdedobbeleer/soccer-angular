import {Component, OnInit, Input} from "@angular/core";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {MatchDTO} from "../../ws/model/MatchDTO";
import {MatchesrestcontrollerApi} from "../../ws/api/MatchesrestcontrollerApi";
import {TeamsrestcontrollerApi} from "../../ws/api/TeamsrestcontrollerApi";
import {TeamDTO} from "../../ws/model/TeamDTO";
import * as moment from "moment";

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
      
       
      <div class="box-footer">
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

    public matchForm: FormGroup;
    public submitted: boolean;

    private teams: TeamDTO[];
    private dt: Date;
    private ti: Date;

    constructor(private _fb: FormBuilder, private _api: MatchesrestcontrollerApi, private _teamApi: TeamsrestcontrollerApi) {
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

            this.ti = moment(this.match.date + " " + this.match.hour, "dd/MM/yyyy HH:mm").toDate();
            this.dt = this.parseStringDate(this.match.date);
        }

        else {
            this.dt = new Date();
            this.ti = this.parseTime(this.getStringDate(new Date()), "20:00");
        }

        this._teamApi.getTeams().subscribe(t => this.teams = t);
    }

    updateTimeValue(time: Date) {
        this.matchForm.patchValue({time: time.getHours() + ':' + time.getMinutes()});
    }

    updateDateValue(date: Date) {
        this.matchForm.patchValue({date: this.getStringDate(date)});
    }

    getStringDate(date: Date): String {
        return moment(date).format('dd/MM/yyyy').toString();
    }

    parseStringDate(date: String): Date {
        return moment(date, "dd/MM/yyyy").toDate();
    }

    parseTime(date: String, time: String): Date {
        return moment(date + " " + time, "dd/MM/yyyy HH:mm").toDate();
    }

    submit(model: MatchDTO, isValid: boolean) {
        this.submitted = true;
        if (isValid) {
            if (this.update) {

            } else {

            }

        }
        console.log(model, isValid);
    }
}
