import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recovery-code-form',
  template: `
<div class="container m-t-1">
<ul class="breadcrumb">
        <li>
            <a [routerLink]="['/']" routerLinkActive="active"><span class="glyphicon glyphicon-home"></span>&nbsp;Home</a>
        </li>
        <li>
            {{'nav.register' | translate }}
        </li>
    </ul>
 <alert [type]="'success'" dismissible="true" [hidden]="!success">
    <span [innerHtml]="'text.registration.succes' | htmlTranslate"></span>
</alert>
<div class="box" [hidden]="success">  
     <alert [type]="'danger'" dismissible="true"  [hidden]="!globalError">{{globalError}}</alert>
    <form [formGroup]="registrationForm" novalidate (ngSubmit)="submit(registrationForm.value)">
      <div class="form-group">
        <label for="email">{{"label.registration.email" | translate}}</label>
        <input name="email" class="form-control" [formControl]="registrationForm.controls.email"/>
        <small class="text-danger" [hidden]="!formErrors.email">
             {{formErrors.email}}
        </small>
      </div>
      <div class="form-group">
        <label for="firstName">{{"label.registration.firstName" | translate}}</label>
        <input name="firstName" class="form-control" [formControl]="registrationForm.controls.firstName"/>
        <small class="text-danger" [hidden]="!formErrors.firstName">
             {{formErrors.firstName}}
        </small>
      </div>
      <div class="form-group">
        <label for="lastName">{{"label.registration.lastName" | translate}}</label>
        <input name="lastName" class="form-control" [formControl]="registrationForm.controls.lastName"/>
         <small class="text-danger" [hidden]="!formErrors.lastName">
             {{formErrors.lastName}}
        </small>
      </div>
       <div class="form-group">
        <label for="password">{{"label.registration.password" | translate}}</label>
         <input name="password" class="form-control" [formControl]="registrationForm.controls.password"/>
         <small class="text-danger" [hidden]="!formErrors.password">
             {{formErrors.password}}
        </small>
      </div>
       <div class="form-group">
        <label for="repeatPassword">{{"label.registration.repeatPassword" | translate}}</label>
         <input name="repeatPassword" class="form-control" [formControl]="registrationForm.controls.repeatPassword"/>
         <small class="text-danger" [hidden]="!formErrors.repeatPassword">
             {{formErrors.repeatPassword}}
        </small>
      </div>
      <div class="form-group">
        <re-captcha (captchaResponse)="handleCaptchaResponse($event)"></re-captcha>
        <input type="hidden" [formControl]="registrationForm.controls.captchaResponse"/>
         <small class="text-danger" [hidden]="!formErrors.captchaResponse">
             {{formErrors.captchaResponse}}
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

  constructor() { }

  ngOnInit() {
  }

}
