import {Component, OnInit, Input} from "@angular/core";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {MatchDTO} from "../../ws/model/MatchDTO";
import {MatchesrestcontrollerApi} from "../../ws/api/MatchesrestcontrollerApi";
import {TeamsrestcontrollerApi} from "../../ws/api/TeamsrestcontrollerApi";
import {TeamDTO} from "../../ws/model/TeamDTO";
import {DatePickerOptions, DateModel} from "ng2-datepicker";

@Component({
    selector: 'app-match-form',
    template: `
  
  <div class="box">  
    <form [formGroup]="matchForm" novalidate (ngSubmit)="submit(matchForm.value, matchForm.valid)">
      <div class="form-group">
        <label for="homeTeam">{{"label.message.homeTeam" | translate}}</label>
        <select name="homeTeam" class="form-control" [formControl]="matchForm.controls['homeTeam']">
              <option *ngFor="let ht of teams" [value]="ht">{{ht.name}}</option>
        </select>
      </div>
        <div class="form-group">
        <label for="awayTeam">{{"label.message.awayTeam" | translate}}</label>
        <select name="awayTeam" class="form-control" [formControl]="matchForm.controls['awayTeam']">
              <option *ngFor="let at of teams" [value]="at">{{at.name}}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="season">{{"label.message.season" | translate}}</label>
        <select name="season" class="form-control" [formControl]="matchForm.controls['season']">
              <option *ngFor="let s of seasons" [value]="s">{{s.description}}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="date">{{"label.match.date" | translate}}</label>
        <ng2-datepicker [options]="options" [(ngModel)]="datePicker" [ngModelOptions]="{standalone: true}"></ng2-datepicker>
        <input type="hidden" [formControl]="matchForm.controls['date']" value="{{datePicker}}">
        <small *ngIf="submitted && matchForm.controls.date.errors" class="text-danger">
              {{"validation.match.date.empty" | translate}}
        </small>
      </div>
      <div class="form-group">
        <label for="time">{{"label.match.time" | translate}}</label>
        <small *ngIf="submitted && matchForm.controls.time.errors" class="text-danger">
                {{"validation.message.content.empty" | translate}}
              </small>
        <input type="hidden" class="form-control" [formControl]="matchForm.controls['time']">
      </div>
      <div *ngIf="!update" class="form-group">
          
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

    private date: DateModel;
    private options: DatePickerOptions;

    public matchForm: FormGroup;
    public submitted: boolean;

    private teams: TeamDTO[];

    constructor(private _fb: FormBuilder, private _api: MatchesrestcontrollerApi, private _teamApi: TeamsrestcontrollerApi) {
    }

    ngOnInit() {
        this.matchForm = this._fb.group({
            homeTeam: ['', [<any>Validators.required]],
            awayTeam: ['', [<any>Validators.required]],
            season: ['', [<any>Validators.required]],
            date: ['', [<any>Validators.required]],
            status: ['', [<any>Validators.required]],
            atgoals: ['', [<any>Validators.required]],
            htgoals: ['', [<any>Validators.required]]
        });

        if (this.update) {
            this.matchForm.patchValue({homeTeam: this.match.homeTeam});
            this.matchForm.patchValue({awayTeam: this.match.awayTeam});
            this.matchForm.patchValue({season: this.match.season});
            this.matchForm.patchValue({date: this.match.date});
            this.matchForm.patchValue({status: this.match.status});
            this.matchForm.patchValue({atGoals: this.match.atGoals});
            this.matchForm.patchValue({htGoals: this.match.htGoals});
            this.matchForm.patchValue({goals: this.match.goals});
        }

        this.options = new DatePickerOptions();
        this.options.format = "dd/MM/yyyy";

        this._teamApi.getTeams().subscribe(t => this.teams = t);
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
