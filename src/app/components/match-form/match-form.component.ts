import {Component, OnInit, Input} from "@angular/core";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {MatchDTO} from "../../ws/model/MatchDTO";
import {MatchesrestcontrollerApi} from "../../ws/api/MatchesrestcontrollerApi";

@Component({
    selector: 'app-match-form',
    template: `
  
  <div class="box">  
    <form [formGroup]="messageForm" novalidate (ngSubmit)="submit(messageForm.value, messageForm.valid)">
      <div class="form-group">
        <label for="header">{{"label.message.title" | translate}}</label>
        <input type="text" class="form-control" [formControl]="messageForm.controls['header']">
        <small *ngIf="submitted && messageForm.controls.header.errors" class="text-danger">
              {{"validation.message.title.empty" | translate}}
            </small>
      </div>
      <div class="form-group">
        <label for="content">{{"label.message.content" | translate}}</label>
        <app-tinymce [elementId]="'contentTinyMce'" (onEditorKeyup)="tinyMceCallback($event)" [content]="content"></app-tinymce>
        <small *ngIf="submitted && messageForm.controls.content.errors" class="text-danger">
                {{"validation.message.content.empty" | translate}}
              </small>
        <input type="hidden" class="form-control" [formControl]="messageForm.controls['content']">
      </div>
      <div *ngIf="!update" class="form-group">
          <div class="radio">
              <input type="radio" name="type" id="radio1" value="POST_AND_SEND" checked="checked" [formControl]="messageForm.controls['type']">
              <label for="radio1">
                  {{"label.message.sendAndPost" | translate}}
              </label>
          </div>
          <div class="radio">
              <input type="radio" name="type" id="radio2" value="SEND" [formControl]="messageForm.controls['type']">
              <label for="radio2">
                  {{"label.message.sendOnly" | translate}}
              </label>
          </div>
          <div class="radio">
              <input type="radio" name="type" id="radio3" value="POST" [formControl]="messageForm.controls['type']">
              <label for="radio3">
                  {{"label.message.postOnly" | translate}}
              </label>
          </div>
                <small *ngIf="submitted && messageForm.controls.type.errors" class="text-danger">
                {{"validation.message.type" | translate}}
              </small>
       </div>
       
      <div class="box-footer">
      <button type="submit" class="btn btn-primary">{{"btn.submit" | translate}}</button>
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

    constructor(private _fb: FormBuilder, private _api: MatchesrestcontrollerApi) {
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
        this.matchForm.patchValue({homeTeam: this.match.homeTeam});
        this.matchForm.patchValue({awayTeam: this.match.awayTeam});
        this.matchForm.patchValue({season: this.match.season});
        this.matchForm.patchValue({date: this.match.date});
        this.matchForm.patchValue({status: this.match.status});
        this.matchForm.patchValue({atGoals: this.match.atGoals});
        this.matchForm.patchValue({htGoals: this.match.htGoals});
        this.matchForm.patchValue({goals: this.match.goals});
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
