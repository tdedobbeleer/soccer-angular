import {Component, OnInit} from "@angular/core";
import {FormGroup, Validators, FormBuilder} from "@angular/forms";
import {RegistrationDTO} from "../../ws/soccer/model/RegistrationDTO";
import {RegistrationrestcontrollerApi} from "../../ws/soccer/api/RegistrationrestcontrollerApi";

@Component({
    selector: 'app-registration-form',
    template: `
<div class="container">
<div class="box">  
    <form [formGroup]="registrationForm" novalidate (ngSubmit)="submit(registrationForm.value, registrationForm.valid)">
      <div class="form-group">
        <label for="email">{{"label.registration.email" | translate}}</label>
        <input name="email" class="form-control" [formControl]="registrationForm.controls.email"/>
        <small class="text-danger" [hidden]="registrationForm.controls.email.valid || (registrationForm.controls.email.pristine && !submitted)">
             {{"validation.empty" | translate}}
        </small>
      </div>
      <div class="form-group">
        <label for="firstName">{{"label.registration.firstName" | translate}}</label>
         <input name="firstName" class="form-control" [formControl]="registrationForm.controls.firstName"/>
         <small class="text-danger" [hidden]="registrationForm.controls.firstName.valid || (registrationForm.controls.firstName.pristine && !submitted)">
             {{"validation.empty" | translate}}
         </small>
      </div>
      <div class="form-group">
        <label for="lastName">{{"label.registration.lastName" | translate}}</label>
         <input name="lastName" class="form-control" [formControl]="registrationForm.controls.lastName"/>
         <small class="text-danger" [hidden]="registrationForm.controls.lastName.valid || (registrationForm.controls.lastName.pristine && !submitted)">
             {{"validation.empty" | translate}}
         </small>
      </div>
       <div class="form-group">
        <label for="password">{{"label.registration.password" | translate}}</label>
         <input name="password" class="form-control" [formControl]="registrationForm.controls.password"/>
         <small class="text-danger" [hidden]="registrationForm.controls.password.valid || (registrationForm.controls.password.pristine && !submitted)">
             {{"validation.empty" | translate}}
         </small>
      </div>
       <div class="form-group">
        <label for="repeatPassword">{{"label.registration.repeatPassword" | translate}}</label>
         <input name="repeatPassword" class="form-control" [(ngModel)]="repeatPassword" [ngModelOptions]="{standalone: true}"/>
         <small *ngIf="submitted && passwordError" class="text-danger">
              {{"validation.match.date.empty" | translate}}
        </small>
      </div>
      <div class="form-group">
        <re-captcha site_key="6Le0aCkUAAAAACGypCCASAYNfjf2f6SLu8O5V2vf" (captchaResponse)="handleCaptchaResponse($event)"></re-captcha>
        <small *ngIf="submitted && captchaError" class="text-danger">
              {{"validation.match.date.empty" | translate}}
        </small>
      </div>
      
       
      <div class="box-footer">
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
export class RegistrationFormComponent implements OnInit {
    registrationForm: FormGroup;
    submitted: boolean;
    captchaResponse: any;
    repeatPassword: string;
    passwordError: boolean;
    captchaError: boolean;

    constructor(private _fb: FormBuilder, private _api: RegistrationrestcontrollerApi) {
    }

    ngOnInit() {
        this.registrationForm = this._fb.group({
            firstName: ['', [<any>Validators.required]],
            lastName: ['', [<any>Validators.required]],
            email: ['', [<any>Validators.required]],
            password: ['', [<any>Validators.required]],
        });
    }

    submit(model: RegistrationDTO, isValid: boolean) {
        this.submitted = true;
        let isModelValid: boolean = true;
        if (model.password !== this.repeatPassword) {
            isModelValid = false;
            this.passwordError = true;
        }

        if (!this.captchaResponse) {
            isModelValid = false;
            this.captchaError = true;
        }

        if (isValid && isModelValid) {
            this._api.createAccount(model, this.captchaResponse).subscribe(
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

    handleCaptchaResponse(event: any) {
        this.captchaResponse = event;
    }

}
