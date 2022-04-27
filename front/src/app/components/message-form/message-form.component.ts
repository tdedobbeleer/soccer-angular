import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ErrorHandlerService} from '../../services/error-handler.service';
import {ValidationService} from '../../services/validation.service';
import {NewsDTO, NewsRestControllerService} from '../../ws/soccer';

@Component({
    selector: 'app-message-form',
    template: `

    <div class="box">  
    <alert [type]="'danger'" [dismissible]="false" *ngIf="globalError"><span [innerHtml]="globalError | safeHtml"></span></alert>
    <form [formGroup]="messageForm" novalidate (ngSubmit)="submit(messageForm.value, messageForm.valid)">
      <div class="form-group">
        <label for="header">{{"label.message.title" | translate}}</label>
        <input type="text" class="form-control" formControlName="header">
        <small class="text-danger" [hidden]="!formErrors.header">
             {{formErrors.header}}
        </small>
      </div>
      <div class="form-group">
        <label for="content">{{"label.message.content" | translate}}</label>
        <app-tinymce [elementId]="'contentTinyMce'" (onEditorKeyup)="tinyMceCallback($event)"></app-tinymce>
        <small class="text-danger" [hidden]="!formErrors.content">
             {{formErrors.content}}
        </small>
        <input type="hidden" class="form-control" formControlName="content">
      </div>       
      <div class="form-group">
          <div class="radio">
              <input type="radio" name="type" id="radio1" value="POST_AND_SEND" formControlName="type">
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
            <small class="text-danger" [hidden]="!formErrors.type">
                {{formErrors.type}}
            </small>
       </div>
       
      <div class="box-footer">
      <button type="submit" class="btn btn-primary" [ladda]="isLoading">{{"btn.submit" | translate}}</button>
      </div>
    </form>
    </div>
`,
    styles: []
})
export class MessageFormComponent implements OnInit {
    public messageForm: FormGroup;
    public submitted: boolean;
    isLoading: boolean = false;

    globalError: any = "";

    formErrors = {
        header: "",
        content: "",
        type: "",
    };

    constructor(private _fb: FormBuilder, private _api: NewsRestControllerService, private _router: Router, private _errorHandler: ErrorHandlerService, private _validationService: ValidationService) {
    }

    ngOnInit() {
        // the short way
        this.messageForm = this._fb.group({
            header: ['', [<any>Validators.required]],
            content: ['', [<any>Validators.required]],
            type: ['POST_AND_SEND', [<any>Validators.required]]
        });
    }

    submit(model: NewsDTO, isValid: boolean) {
        this.submitted = true;
        //Mark all controls as dirty, since the form has been submitted
        this._validationService.markControlsAsDirty(this.messageForm);
        //trigger the validation
        this._validationService.onValueChanged(this.messageForm, this.formErrors);

        if (isValid) {
            this.isLoading = true;

            this._api.postNews(model).subscribe(
                r => {
                    this._router.navigate(["/messages"]);
                },
                error => {
                    this.globalError = this._errorHandler.handle(error, "/messages/create");
                }
            ).add(() => {
                this.isLoading = false;
            });
        }
        console.log(model, isValid);
    }

    tinyMceCallback(event) {
        this.messageForm.patchValue({content: event})
    }

}
