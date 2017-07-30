import { Component, OnInit } from '@angular/core';
import {Validators, FormGroup, FormBuilder} from "@angular/forms";
import {ErrorHandlerService} from "../../services/error-handler.service";
import {ValidationService} from "../../services/validation.service";
import {PasswordrecoveryrestcontrollerApi} from "../../ws/soccer/api/PasswordrecoveryrestcontrollerApi";
import {PasswordRecoveryDTO} from "../../ws/soccer/model/PasswordRecoveryDTO";
import {Response} from "@angular/http";

@Component({
  selector: 'app-request-recovery-code-form',
  template: `
<div class="container m-t-1">
<ul class="breadcrumb">
        <li>
            <a [routerLink]="['/']" routerLinkActive="active"><span class="glyphicon glyphicon-home"></span>&nbsp;Home</a>
        </li>
        <li>
            {{'nav.recovery.request' | translate }}
        </li>
    </ul>

<div class="box">  
     <alert [type]="'success'" [hidden]="!success">
         <span [innerHtml]="'text.recovery.request.success' | htmlTranslate"></span>
    </alert>
     <alert [type]="'danger'" [dismissible]="true"  [hidden]="!globalError">{{globalError}}</alert>
     <alert [type]="'danger'" [dismissible]="true"  [hidden]="!emailError">{{'text.recovery.request.email.failed' | translate}}</alert>
    <form [formGroup]="recoveryForm" novalidate (ngSubmit)="submit(recoveryForm.value)">
      <div class="form-group">
        <label for="email">{{"label.recovery.email" | translate}}</label>
        <input name="email" class="form-control" [formControl]="recoveryForm.controls.email"/>
        <small class="text-danger" [hidden]="!formErrors.email">
             {{formErrors.email}}
        </small>
      </div>
           
       
      <div class="form-group box-footer">
        <button id="submit" type="submit" class="btn btn-primary">{{"btn.submit" | translate}}</button>
        <a id="btnCancel" class="btn btn-default" [routerLink]="['/login']">{{"btn.cancel" | translate}}</a>
      </div>
    </form>
    </div>
    </div>
  `,
  styles: []
})
export class RequestRecoveryCodeFormComponent implements OnInit {
  formErrors = {
    'email': '',
  };

  recoveryForm : FormGroup;
  success : boolean = false;
  emailError : boolean;
  globalError : any;

  constructor(private _fb: FormBuilder, private _api: PasswordrecoveryrestcontrollerApi, private _validationService: ValidationService, private _errorService: ErrorHandlerService) {}

  ngOnInit() {
    this.recoveryForm = this._fb.group({
      email: ['', [<any>Validators.email]],
    });

    //Set listener
    this.recoveryForm.valueChanges
        .subscribe(data => this._validationService.onValueChanged(this.recoveryForm, this.formErrors));
  }

  submit(dto : PasswordRecoveryDTO) {
    //Mark all controls as dirty, since the form has been submitted
    this._validationService.markControlsAsDirty(this.recoveryForm);
    //trigger the validation
    this._validationService.onValueChanged(this.recoveryForm, this.formErrors);

    this.globalError = "";
    this.emailError = false;
    this.success = false;

    if (this.recoveryForm.valid) {
      this._api.forgotPassword(dto).subscribe(
          r => {
            this.success = true;
          },
          (error: Response) => {
            if (error.status == 500) {
              this.emailError = true;
            } else {
              this.globalError = this._errorService.handle(error, "/password/recovery/request");
            }
          },
      )
    }

  }

}
