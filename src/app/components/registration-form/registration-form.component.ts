import {Component, OnInit, ViewChild} from "@angular/core";
import {FormGroup, Validators, FormBuilder} from "@angular/forms";
import {RegistrationDTO} from "../../ws/soccer/model/RegistrationDTO";
import {RegistrationrestcontrollerApi} from "../../ws/soccer/api/RegistrationrestcontrollerApi";
import {environment} from "../../../environments/environment";
import {ReCaptchaComponent} from "angular2-recaptcha";
import {TranslationService} from "../../services/translation.service";
import {ValidationService} from "../../services/validation.service";
import {Response} from "@angular/http";
import {equalsValidator} from "../../functions/equals-validator";
import {ErrorHandlerService} from "../../services/error-handler.service";
import {FocusOnErrorDirective} from "../../directives/focus-on-error.directive";

@Component({
    selector: 'app-registration-form',
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
 <alert [type]="'success'" [dismissible]="false" [hidden]="!success">
    <span [innerHtml]="'text.registration.succes' | htmlTranslate"></span>
</alert>
<div class="box" [hidden]="success">
     <div class="error-div">
        <alert [type]="'danger'" [dismissible]="false"  [hidden]="!globalError">{{globalError}}</alert>
     </div>
    <form [formGroup]="registrationForm" novalidate (ngSubmit)="submit(registrationForm.value)">
      <div class="form-group">
        <label for="email">{{"label.email" | translate}}</label>
        <input name="email" class="form-control" [formControl]="registrationForm.controls.email"/>
        <small class="text-danger" [hidden]="!formErrors.email">
             {{formErrors.email}}
        </small>
      </div>
      <div class="form-group">
        <label for="firstName">{{"label.firstName" | translate}}</label>
        <input name="firstName" class="form-control" [formControl]="registrationForm.controls.firstName"/>
        <small class="text-danger" [hidden]="!formErrors.firstName">
             {{formErrors.firstName}}
        </small>
      </div>
      <div class="form-group">
        <label for="lastName">{{"label.lastName" | translate}}</label>
        <input name="lastName" class="form-control" [formControl]="registrationForm.controls.lastName"/>
         <small class="text-danger" [hidden]="!formErrors.lastName">
             {{formErrors.lastName}}
        </small>
      </div>
       <div class="form-group">
        <label for="password">{{"label.password" | translate}}</label>
         <input type="password" name="password" class="form-control" [formControl]="registrationForm.controls.password"/>
         <small class="text-danger" [hidden]="!formErrors.password">
             {{formErrors.password}}
        </small>
      </div>
       <div class="form-group">
        <label for="repeatPassword">{{"label.repeatPassword" | translate}}</label>
         <input type="password" name="repeatPassword" class="form-control" [formControl]="registrationForm.controls.repeatPassword"/>
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
export class RegistrationFormComponent implements OnInit {
    registrationForm: FormGroup;
    success: boolean = false;
    globalError: any;

    @ViewChild(ReCaptchaComponent) captcha: ReCaptchaComponent;
    @ViewChild(FocusOnErrorDirective) error: FocusOnErrorDirective;

    formErrors = {
        'firstName': '',
        'lastName': '',
        'email': '',
        'password': '',
        'repeatPassword': '',
        'captchaResponse': ''
    };

    constructor(private _fb: FormBuilder, private _api: RegistrationrestcontrollerApi, private _translationService: TranslationService, private _validationService: ValidationService, private _errorService: ErrorHandlerService) {
    }

    ngOnInit() {
        this.registrationForm = this._fb.group({
            firstName: ['', [<any>Validators.required, Validators.pattern("^[\u00c0-\u01ffa-zA-Z\.-\\s']+$")]],
            lastName: ['', [<any>Validators.required, Validators.pattern("^[\u00c0-\u01ffa-zA-Z\.-\\s']+$")]],
            email: ['', [<any>Validators.email]],
            password: ['', [<any>Validators.pattern("^[0-9a-zA-Z\._-]{5,15}$")]],
            repeatPassword: ['', [<any>Validators.required, equalsValidator("password")]],
            captchaResponse: ['', [<any>Validators.required]]
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

        //Set listener
        this.registrationForm.valueChanges
            .subscribe(data => this._validationService.onValueChanged(this.registrationForm, this.formErrors));
    }

    submit(model: RegistrationDTO) {
        //Mark all controls as dirty, since the form has been submitted
        this._validationService.markControlsAsDirty(this.registrationForm);
        //trigger the validation
        this._validationService.onValueChanged(this.registrationForm, this.formErrors);

        if (this.registrationForm.valid) {
            this._api.createAccount(model, this.registrationForm.controls['captchaResponse'].value).subscribe(
                r => {
                    console.log("Registration success");
                    this.success = true;
                    this.globalError = false;
                },
                (error: Response) => {
                    this.globalError = this._errorService.handle(error, "/registration");
                    this.error.trigger();
                },
                () => {
                    console.log("completed");
                }
            )
        }
    }

    handleCaptchaResponse(event: any) {
        this.registrationForm.patchValue({captchaResponse: event});
    }

}
