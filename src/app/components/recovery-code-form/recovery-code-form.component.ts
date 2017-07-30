import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {PasswordrecoveryrestcontrollerApi} from "../../ws/soccer/api/PasswordrecoveryrestcontrollerApi";
import {ValidationService} from "../../services/validation.service";
import {ErrorHandlerService} from "../../services/error-handler.service";
import {equalsValidator} from "../../functions/equals-validator";
import {PasswordRecoveryDTO} from "../../ws/soccer/model/PasswordRecoveryDTO";
import {Response} from "@angular/http";

@Component({
  selector: 'app-recovery-code-form',
  template: `
<div class="container m-t-1">
<ul class="breadcrumb">
        <li>
            <a [routerLink]="['/']" routerLinkActive="active"><span class="glyphicon glyphicon-home"></span>&nbsp;Home</a>
        </li>
        <li>
            {{'nav.recovery.use' | translate }}
        </li>
    </ul>
 <alert [type]="'success'" [dismissible]="true" [hidden]="!success">
    <span [innerHtml]="'text.registration.succes' | htmlTranslate"></span>
</alert>
<div class="box" [hidden]="success">  
     <alert [type]="'danger'" [dismissible]="true"  [hidden]="!globalError">{{globalError}}</alert>
    <form [formGroup]="recoveryForm" novalidate (ngSubmit)="submit(recoveryForm.value)">
      <div class="form-group">
        <label for="email">{{"label.recovery.email" | translate}}</label>
        <input name="email" class="form-control" [formControl]="recoveryForm.controls.email"/>
        <small class="text-danger" [hidden]="!formErrors.email">
             {{formErrors.email}}
        </small>
      </div>
      <div class="form-group">
        <label for="email">{{"label.recovery.code" | translate}}</label>
        <input name="email" class="form-control" [formControl]="recoveryForm.controls.code"/>
        <small class="text-danger" [hidden]="!formErrors.code">
             {{formErrors.code}}
        </small>
      </div>
       <div class="form-group">
        <label for="password">{{"label.recovery.password" | translate}}</label>
         <input type="password" name="password" class="form-control" [formControl]="recoveryForm.controls.password"/>
         <small class="text-danger" [hidden]="!formErrors.password">
             {{formErrors.password}}
        </small>
      </div>
       <div class="form-group">
        <label for="repeatPassword">{{"label.recovery.repeatPassword" | translate}}</label>
         <input type="password" name="repeatPassword" class="form-control" [formControl]="recoveryForm.controls.repeatPassword"/>
         <small class="text-danger" [hidden]="!formErrors.repeatPassword">
             {{formErrors.repeatPassword}}
        </small>
      </div>      
       
      <div class="form-group box-footer">
        <button id="submit" type="submit" class="btn btn-primary">{{"btn.submit" | translate}}</button>
        <button id="btnReset" type="reset" class="btn btn-info">Reset</button>
        <a id="btnCancel" class="btn btn-default" [routerLink]="['/login']">{{"btn.cancel" | translate}}</a>
      </div>
    </form>
    </div>
    </div>
  `,
  styles: []
})
export class RecoveryCodeFormComponent implements OnInit {
  recoveryForm: FormGroup;
  success: boolean = false;
  globalError: any;

  formErrors = {
    'code': '',
    'email': '',
    'password': '',
    'repeatPassword': '',
  };

  constructor(private _fb: FormBuilder, private _api: PasswordrecoveryrestcontrollerApi, private _validationService: ValidationService, private _errorService: ErrorHandlerService) {
  }

  ngOnInit() {
    this.recoveryForm = this._fb.group({
      code: ['', [<any>Validators.required]],
      email: ['', [<any>Validators.email]],
      password: ['', [<any>Validators.pattern("^[0-9a-zA-Z\._-]{5,15}$")]],
      repeatPassword: ['', [<any>Validators.required, equalsValidator("password")]],
    });

    //Set listener
    this.recoveryForm.valueChanges
        .subscribe(data => this._validationService.onValueChanged(this.recoveryForm, this.formErrors));
  }

  submit(model: PasswordRecoveryDTO) {
    //Mark all controls as dirty, since the form has been submitted
    this._validationService.markControlsAsDirty(this.recoveryForm);
    //trigger the validation
    this._validationService.onValueChanged(this.recoveryForm, this.formErrors);

    if (this.recoveryForm.valid) {
      this._api.useRecoveryCode(model).subscribe(
          r => {
            console.log("Registration success");
            this.success = true;
            this.globalError = false;
          },
          (error: Response) => {
            this.globalError = this._errorService.handle(error, "/password/recovery");
          },
          () => {
            console.log("completed");
          }
      )
    }
  }

}
