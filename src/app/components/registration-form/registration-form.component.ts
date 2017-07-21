import {Component, OnInit, ViewChild} from "@angular/core";
import {FormGroup, Validators, FormBuilder} from "@angular/forms";
import {RegistrationDTO} from "../../ws/soccer/model/RegistrationDTO";
import {RegistrationrestcontrollerApi} from "../../ws/soccer/api/RegistrationrestcontrollerApi";
import {environment} from "../../../environments/environment";
import {ReCaptchaComponent} from "angular2-recaptcha";
import {TranslationService} from "../../services/translation.service";
import {ValidationService} from "../../services/validation.service";

@Component({
    selector: 'app-registration-form',
    template: `
<div class="container">
<div class="box">  
    <form [formGroup]="registrationForm" novalidate (ngSubmit)="submit(registrationForm.value, registrationForm.valid)">
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
         <input name="repeatPassword" class="form-control" [(ngModel)]="repeatPassword" [ngModelOptions]="{standalone: true}"/>
         <small *ngIf="submitted && passwordError" class="text-danger">
              {{"validation.match.date.empty" | translate}}
        </small>
      </div>
      <div class="form-group">
        <re-captcha (captchaResponse)="handleCaptchaResponse($event)"></re-captcha>
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

    @ViewChild(ReCaptchaComponent) captcha: ReCaptchaComponent;

    formErrors = {
        'firstName': '',
        'lastName': '',
        'email': '',
        'password': ''
    };

    constructor(private _fb: FormBuilder, private _api: RegistrationrestcontrollerApi, private _translationService: TranslationService, private _validationService: ValidationService) {
    }

    ngOnInit() {
        this.registrationForm = this._fb.group({
            firstName: ['', [<any>Validators.required]],
            lastName: ['', [<any>Validators.required]],
            email: ['', [<any>Validators.email]],
            password: ['', [<any>Validators.pattern("^[0-9a-zA-Z\._-]{5,15}$")]],
        });

        //Setup recaptcha
        this.captcha.site_key = environment.recaptcha_public_key;
        this.captcha.language = this._translationService.currentLang();
        this.captcha.reset();

        this._translationService.langUpdated.subscribe(l => {
            /**
             * Workaround, recaptcha language is not dynamically set.
             */
            location.reload();
        });

        this.registrationForm.valueChanges
            .subscribe(data => this._validationService.onValueChanged(this.registrationForm, this.formErrors));

        this._validationService.onValueChanged(this.registrationForm, this.formErrors);
    }

    submit(model: RegistrationDTO, isValid: boolean) {
        this.submitted = true;
        this._validationService.markControlsAsDirty(this.registrationForm);
        this._validationService.onValueChanged(this.registrationForm, this.formErrors);

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
