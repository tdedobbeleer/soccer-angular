import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ValidationService} from '../../services/validation.service';
import {FocusOnSuccessDirective} from '../../directives/focus-on-success.directive';
import {FocusOnErrorDirective} from '../../directives/focus-on-error.directive';
import {ErrorHandlerService} from '../../services/error-handler.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {TranslationService} from '../../services/translation.service';
import {AccountDTO, AccountRestControllerService} from '../../ws/soccer';

@Component({
    selector: 'app-activate-account-form',
    template: `
 <div class="box">
    <h3>{{'text.accounts.activate' | translate}}</h3>
    <div *ngIf="account?.activated && !activateSuccess && !globalError">
         <alert [type]="'warning'" [dismissible]="false"><span [innerHtml]="'text.account.already.activated' | safeHtml"></span></alert>
    </div>
    <div class="success-div">
        <alert [type]="'success'" [dismissible]="false" *ngIf="activateSuccess">{{"text.account.success.activation" | translate}}</alert>
    </div>
    <div class="error-div">
         <alert [type]="'danger'" [dismissible]="false" *ngIf="globalError"><span [innerHtml]="globalError | safeHtml"></span></alert>
    </div>
   
    <form [formGroup]="activateForm" novalidate (ngSubmit)="submit(activateForm?.value)">
      <h4>{{account?.firstName}} {{account?.lastName}} ({{account?.username}})</h4>
      <hr/>
      <div class="form-group"> 
        <input name="sendMail" id="sendMail" type="checkbox" formControlName="sendMail"/>
        <label for="sendMail">{{"label.account.sendMail" | translate}}</label>
      </div>
      
       
      <div class="form-group box-footer">
        <button id="submit" type="submit" class="btn btn-primary" [ladda]="isLoading">{{"btn.submit" | translate}}
        </button>
        <a id="btnCancel" class="btn btn-default" [routerLink]="['/']">{{"btn.cancel" | translate}}</a>
      </div>
      </form>
      </div>
  `,
    styles: []
})
export class ActivateAccountFormComponent implements OnInit {
    @Input() accountId: number;
    account: AccountDTO;
    activateForm: FormGroup;
    globalError: string = "";
    activateSuccess: boolean;
    isLoading: boolean = false;

    @ViewChild(FocusOnErrorDirective, {static: true}) error: FocusOnErrorDirective;
    @ViewChild(FocusOnSuccessDirective, {static: true}) success: FocusOnSuccessDirective;

    formErrors = {
        'sendmail': '',
    };

    constructor(private _validationService: ValidationService, private _fb: FormBuilder, private _api: AccountRestControllerService, private _errorHandler: ErrorHandlerService, private _trans: TranslationService) {
    }

    ngOnInit() {

        this._api.getAccount(this.accountId).subscribe(
            a => {
                this.account = a;
            },
            e => {
                this._errorHandler.handle(e);
            }
        );

        this.activateForm = this._fb.group({
            sendMail: [true, ''],
        });

        //Set listener
        this.activateForm.valueChanges
            .subscribe(data => {
                this._validationService.onValueChanged(this.activateForm, this.formErrors);
            });
    }

    submit(model: any) {
        this.globalError = '';
        this.activateSuccess = false;

        //Mark all controls as dirty, since the form has been submitted
        this._validationService.markControlsAsDirty(this.activateForm);
        //trigger the validation
        this._validationService.onValueChanged(this.activateForm, this.formErrors);

        if (this.activateForm.valid) {
            this.isLoading = true;

            this._api.firstTimeActivation(this.accountId, model.sendMail).subscribe(
                r => {
                    this.globalError = '';
                    this.activateSuccess = true;
                    this.success.trigger();
                    console.log("Posted");
                },
                error => {
                    if (error.status == 412) {
                        this.globalError = this._trans.instant("error.account.activation.not.sent")
                    } else {
                        this.globalError = this._errorHandler.handle(error);
                    }
                    this.error.trigger();
                },
                () => {
                    this.isLoading = false;
                }
            )

        }
    }

}
