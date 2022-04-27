import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ErrorHandlerService} from '../../services/error-handler.service';
import {ValidationService} from '../../services/validation.service';
import {NewsDTO, NewsRestControllerService} from '../../ws/soccer';

@Component({
    selector: 'app-edit-message-form',
    template: `
 <div class="box">
    <div>
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
        <app-tinymce [elementId]="'contentTinyMce'" (onEditorKeyup)="tinyMceCallback($event)" [contentEvent]="contentUpdated"></app-tinymce>
        <small class="text-danger" [hidden]="!formErrors.content">
             {{formErrors.content}}
        </small>
        <input type="hidden" class="form-control" formControlName="content">
      </div>       
      <div class="box-footer">
      <button type="submit" class="btn btn-primary" [ladda]="isLoading">{{"btn.submit" | translate}}</button>
      </div>
    </form>
    </div>
    </div>
  `,
    styles: []
})
export class EditMessageFormComponent implements OnInit {

    @Input() messageId: string;

    contentUpdated: EventEmitter<string> = new EventEmitter();

    messageForm: FormGroup;

    globalError: any = "";

    isLoading: boolean = false;

    formErrors = {
        header: "",
        content: "",
    };

    constructor(private _fb: FormBuilder, private _api: NewsRestControllerService, private _router: Router, private _errorHandler: ErrorHandlerService, private _validationService: ValidationService) {
    }

    ngOnInit() {
        // the short way
        this.messageForm = this._fb.group({
            header: ['', [<any>Validators.required]],
            content: ['', [<any>Validators.required]],
            id: ['', [<any>Validators.required]],
        });


        this._api.getNews(this.messageId).subscribe(
            r => {
                this.messageForm.patchValue({
                    content: r.content,
                    header: r.header,
                    id: r.id,
                });
                this.contentUpdated.emit(r.content);
            },
            error => {
                this._errorHandler.handle(error, "/messages/edit/" + this.messageId);
            },
            () => {
                console.log("completed");
            }
        );

        //Set listener
        this.messageForm.valueChanges
            .subscribe(data => {
                this._validationService.onValueChanged(this.messageForm, this.formErrors);
            });
    }

    submit(model: NewsDTO, isValid: boolean) {
        this.globalError = '';

        //Mark all controls as dirty, since the form has been submitted
        this._validationService.markControlsAsDirty(this.messageForm);
        //trigger the validation
        this._validationService.onValueChanged(this.messageForm, this.formErrors);

        if (isValid) {
            this.isLoading = true;

            this._api.updateNews(model).subscribe(
                r => {
                    this._router.navigate(["/messages"]);
                },
                error => {
                    this.globalError = this._errorHandler.handle(error, "/messages/edit/" + this.messageId);
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
