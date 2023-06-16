import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ErrorHandlerService} from '../../services/error-handler.service';
import {ValidationService} from '../../services/validation.service';
import {FocusOnErrorDirective} from '../../directives/focus-on-error.directive';
import {environment} from '../../../environments/environment';
import {ReCaptchaComponent} from 'angular2-recaptcha';
import {TranslationService} from '../../services/translation.service';
import {PasswordRecoveryDTO, PasswordRecoveryRestControllerService} from '../../ws/soccer';

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
  <div class="col-md-6 col-md-offset-3">
  <div class="box">  
     <alert [type]="'success'" [hidden]="!success">
         <span [innerHtml]="'text.recovery.request.success' | safeHtml"></span>
    </alert>
    <div class="error-div">
        <alert [type]="'danger'" [dismissible]="false"  [hidden]="!globalError"><span [innerHtml]="globalError | safeHtml"></span></alert>
        <alert [type]="'danger'" [dismissible]="false"  [hidden]="!emailError">{{'text.recovery.request.email.failed' | translate}}</alert>
     </div>
     
    <form [formGroup]="recoveryForm" novalidate (ngSubmit)="submit(recoveryForm.value)">
      <div class="form-group">
        <label for="email">{{"label.recovery.email" | translate}}</label>
        <input name="email" class="form-control" [formControl]="recoveryForm.controls.email"/>
        <small class="text-danger" [hidden]="!formErrors.email">
             {{formErrors.email}}
        </small>
      </div>
      <div class="form-group">
        <re-captcha (captchaResponse)="handleCaptchaResponse($event)" [site_key]="getKeyPublicApiKey()"></re-captcha>
        <input type="hidden" [formControl]="recoveryForm.controls.captchaResponse"/>
         <small class="text-danger" [hidden]="!formErrors.captchaResponse">
             {{formErrors.captchaResponse}}
        </small>
      </div>       
      <div class="form-group box-footer">
        <button id="submit" type="submit" class="btn btn-primary" [ladda]="isLoading">{{"btn.submit" | translate}}
        </button>
        <a id="btnCancel" class="btn btn-default" [routerLink]="['/login']">{{"btn.cancel" | translate}}</a>
      </div>
    </form>
    </div>
  </div>
  </div>
  `,
  styles: []
})
export class RequestRecoveryCodeFormComponent implements OnInit {
  formErrors = {
    'email': '',
    'captchaResponse': '',
  };

  recoveryForm : FormGroup;
  success : boolean = false;
  emailError : boolean;
  globalError : any;
  isLoading: boolean = false;

  @ViewChild(FocusOnErrorDirective, {static: true}) errorFocus: FocusOnErrorDirective;
  @ViewChild(ReCaptchaComponent) captcha: ReCaptchaComponent;

    constructor(private _fb: FormBuilder, private _translationService: TranslationService, private _api: PasswordRecoveryRestControllerService, private _validationService: ValidationService, private _errorService: ErrorHandlerService) {
  }

  ngOnInit() {
      console.log(environment);
    this.recoveryForm = this._fb.group({
      email: ['', [<any>Validators.email]],
      captchaResponse: ['', [<any>Validators.required]],
    });

    //Setup recaptcha
    this.captcha.language = this._translationService.currentLang();
    this.captcha.reset();

    this._translationService.langUpdated.subscribe(l => {
      /**
       * Workaround, recaptcha language is not dynamically set.
       */
      location.reload();
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
      this.isLoading = true;
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
            this.errorFocus.trigger();
          }
      ).add(() => {
        this.isLoading = false;
      });
    }

  }

  getKeyPublicApiKey() {
    return environment.recaptcha_public_key;
  }

  handleCaptchaResponse(event: any) {
    this.recoveryForm.patchValue({captchaResponse: event});
  }

}
