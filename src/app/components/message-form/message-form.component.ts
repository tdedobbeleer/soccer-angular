import {Component, OnInit, Input} from "@angular/core";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {NewsrestcontrollerApi} from "../../ws/soccer/api/NewsrestcontrollerApi";
import {NewsDTO} from "../../ws/soccer/model/NewsDTO";
import {Router} from "@angular/router";
import {ErrorHandlerService} from "../../services/error-handler.service";
import {SecUtil} from "../../classes/sec-util";

@Component({
    selector: 'app-message-form',
    template: `

    <div class="box">  
    <form [formGroup]="messageForm" novalidate (ngSubmit)="submit(messageForm.value, messageForm.valid)">
      <div class="form-group">
        <label for="header">{{"label.message.title" | translate}}</label>
        <input type="text" class="form-control" formControlName="header">
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
        <input type="hidden" class="form-control" formControlName="content">
      </div>
      <div *ngIf="!update" class="form-group">
          <div class="radio">
              <input type="radio" name="type" id="radio1" value="POST_AND_SEND" checked="checked" formControlName="type">
              <label for="radio1">
                  {{"label.message.sendAndPost" | translate}}
              </label>
          </div>
          <div class="radio">
              <input type="radio" name="type" id="radio2" value="SEND" formControlName="type">
              <label for="radio2">
                  {{"label.message.sendOnly" | translate}}
              </label>
          </div>
          <div class="radio">
              <input type="radio" name="type" id="radio3" value="POST" formControlName="type">
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
`,
    styles: []
})
export class MessageFormComponent implements OnInit {
    @Input() update: boolean;
    @Input() header: string;
    @Input() public content: string;

    public messageForm: FormGroup;
    public submitted: boolean;

    constructor(private _fb: FormBuilder, private _api: NewsrestcontrollerApi, private _router: Router, private _errorHandler: ErrorHandlerService) {
    }

    ngOnInit() {
        // the short way
        this.messageForm = this._fb.group({
            header: ['', [<any>Validators.required]],
            content: ['', [<any>Validators.required]],
            type: ['', [<any>Validators.required]]
        });
        this.messageForm.patchValue({header: this.header});
        this.messageForm.patchValue({content: this.content});
    }

    submit(model: NewsDTO, isValid: boolean) {
        this.submitted = true;
        if (isValid) {
            if (this.update) {
                /**
                 this._api.(model, SecUtil.getJwtHeaders()).subscribe(
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
                 **/

            } else {
                this._api.postNews(model, SecUtil.getJwtHeaders()).subscribe(
                    r => {
                        this._router.navigate(["/messages"]);
                    },
                    error => {
                        this._errorHandler.handle(error, "/messages/create");
                    },
                    () => {
                        console.log("completed");
                    }
                )
            }
        }
        console.log(model, isValid);
    }

    tinyMceCallback(event) {
        this.messageForm.patchValue({content: event})
    }

}
