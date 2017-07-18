import {Component, OnInit} from "@angular/core";
import {FormGroup, Validators, FormBuilder} from "@angular/forms";

@Component({
    selector: 'app-registration-form',
    template: `
<div class="container">
<div class="box">  
    <form [formGroup]="registrationForm" novalidate (ngSubmit)="submit(registrationForm.value, registrationForm.valid)">
      <div class="form-group">
        <label for="email">{{"label.registration.email" | translate}}</label>
        <input name="email" class="form-control" [formControl]="registrationForm.controls['email']"/>
      </div>
      <div class="form-group">
        <label for="firstName">{{"label.registration.firstName" | translate}}</label>
         <input name="firstName" class="form-control" [formControl]="registrationForm.controls['firstName']"/>
      </div>
      <div class="form-group">
        <label for="lastName">{{"label.registration.lastName" | translate}}</label>
         <input name="lastName" class="form-control" [formControl]="registrationForm.controls['lastName']"/>
      </div>
       <div class="form-group">
        <label for="password">{{"label.registration.password" | translate}}</label>
         <input name="password" class="form-control" [formControl]="registrationForm.controls['password']"/>
      </div>
       <div class="form-group">
        <label for="repeatPassword">{{"label.registration.repeatPassword" | translate}}</label>
         <input name="repeatPassword" class="form-control" [formControl]="registrationForm.controls['repeatPassword']"/>
      </div>
      <div class="form-group">
        <re-captcha site_key="6Le0aCkUAAAAACGypCCASAYNfjf2f6SLu8O5V2vf" (captchaResponse)="handleCaptchaResponse($event)"></re-captcha>
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

    constructor(private _fb: FormBuilder) {
    }

    ngOnInit() {
        this.registrationForm = this._fb.group({
            firstName: ['', [<any>Validators.required]],
            lastName: ['', [<any>Validators.required]],
            email: ['', [<any>Validators.required]],
            password: ['', [<any>Validators.required]],
            repeatPassword: ['', [<any>Validators.required]],
        });
    }

    submit(model: any, isValid: boolean) {
        //Check if captcha response is not empty
        //Check if form is valid
        //Then submit

    }

    handleCaptchaResponse(event: any) {
        this.captchaResponse = event;
    }

}
