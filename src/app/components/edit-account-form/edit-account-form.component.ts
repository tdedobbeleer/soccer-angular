import {Component, OnInit, ViewChild, Input} from "@angular/core";
import {FocusOnErrorDirective} from "../../directives/focus-on-error.directive";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {ProfileDTO} from "../../ws/soccer/model/ProfileDTO";
import {AccountprofilerestcontrollerApi} from "../../ws/soccer/api/AccountprofilerestcontrollerApi";
import {ValidationService} from "../../services/validation.service";
import {ErrorHandlerService} from "../../services/error-handler.service";
import {SecUtil} from "../../classes/sec-util";
import {equalsValidator} from "../../functions/equals-validator";
import {FocusOnSuccessDirective} from "../../directives/focus-on-success.directive";
import {AccountrestcontrollerApi} from "../../ws/soccer/api/AccountrestcontrollerApi";
import PositionEnum = ProfileDTO.PositionEnum;

@Component({
    selector: 'app-edit-account-form',
    template: `
<div class="box">
    
    <div>
    <h2>{{'title.account.details' | translate}} <span class="pull-right glyphicon glyphicon-user"></span></h2>
    <div class="success-div">
        <alert [type]="'success'" [dismissible]="false" *ngIf="updateProfileSuccess">{{"text.account.success.change" | translate}}</alert>
    </div>
    <div class="error-div">
         <alert [type]="'danger'" [dismissible]="false" *ngIf="globalError"><span [innerHtml]="globalError | safeHtml"></span></alert>
    </div>
    <form [formGroup]="profileForm" novalidate (ngSubmit)="submitProfile(profileForm.value)">
    <div formGroupName="account">
      <div class="form-group">
        <label for="email">{{"label.email" | translate}}</label>
               <input name="email" class="form-control" formControlName="username"/>
         <small class="text-danger" [hidden]="!formErrors.account.username">
             {{formErrors.account.username}}
        </small>
      </div>
      <div class="form-group">
        <label for="firstName">{{"label.firstName" | translate}}</label>
               <input name="firstName" class="form-control" formControlName="firstName"/>
         <small class="text-danger" [hidden]="!formErrors.account.firstName">
             {{formErrors.account.firstName}}
        </small>
      </div>
      <div class="form-group">
        <label for="lastName">{{"label.lastName" | translate}}</label>
               <input name="lastName" class="form-control" formControlName="lastName"/>
         <small class="text-danger" [hidden]="!formErrors.account.lastName">
             {{formErrors.account.lastName}}
        </small>
      </div>
      </div>
      
      <div formGroupName="address">
          <div class="form-group">
            <label for="address">{{"label.address" | translate}}</label>
                   <input name="address" class="form-control" formControlName="address"/>
             <small class="text-danger" [hidden]="!formErrors.address.address">
                 {{formErrors.address.address}}
            </small>
          </div>
          <div class="form-group">
            <label for="postalCode">{{"label.postalCode" | translate}}</label>
                   <input name="postalCode" class="form-control" formControlName="postalCode"/>
             <small class="text-danger" [hidden]="!formErrors.address.postalCode">
                 {{formErrors.address.postalCode}}
            </small>
          </div>
          <div class="form-group">
            <label for="city">{{"label.city" | translate}}</label>
                   <input name="city" class="form-control" formControlName="city"/>
             <small class="text-danger" [hidden]="!formErrors.address.city">
                 {{formErrors.address.city}}
            </small>
          </div>
      </div>
      
      
      <div class="form-group">
        <label for="position">{{"label.position" | translate}}</label>
        <select name="position" class="form-control" formControlName="position">
              <option value="null" disabled selected>{{'text.select' | translate}}</option>
              <option value="{{positionEnum.GOALKEEPER}}" [selected]="profileForm.value?.position == positionEnum.GOALKEEPER">{{"text.goalKeeper" | translate}}</option>
              <option value="{{positionEnum.DEFENDER}}" [selected]="profileForm.value?.position == positionEnum.DEFENDER">{{"text.defender" | translate}}</option>
              <option value="{{positionEnum.MIDFIELDER}}" [selected]="profileForm.value?.position == positionEnum.MIDFIELDER">{{"text.midfielder" | translate}}</option>
              <option value="{{positionEnum.FORWARD}}" [selected]="profileForm.value?.position == positionEnum.FORWARD">{{"text.forward" | translate}}</option>
        </select>
         <small class="text-danger" [hidden]="!formErrors.position">
             {{formErrors.position}}
        </small>
      </div>
      
      <div class="form-group"> 
        <input name="doodleNotifications" type="checkbox" formControlName="doodleNotifications"/>
        <label for="doodleNotifications">{{"label.profile.doodleNotifications" | translate}}</label>
      </div>
      <div class="form-group"> 
        <input name="newsNotifications" type="checkbox" formControlName="newsNotifications"/>
        <label for="newsNotifications">{{"label.profile.newsNotifications" | translate}}</label>
      </div>
      
      <div class="form-group box-footer">
        <button id="submit" type="submit" class="btn btn-primary">{{"btn.submit" | translate}}</button>
      </div>
    </form>
    </div>
    
    <div class="p-t-1">
    <h2>{{'title.account.password' | translate}} <span class="pull-right glyphicon glyphicon-lock"></span></h2>
    
     <form [formGroup]="passwordForm" novalidate (ngSubmit)="submitPassword(passwordForm.value)">
      <alert [type]="'success'" [dismissible]="false" *ngIf="updatePasswordSuccess">{{"text.password.success.change" | translate}}</alert>
      <alert [type]="'danger'" [dismissible]="false" *ngIf="globalPasswordError">
         <span [innerHtml]="globalPasswordError | safeHtml"></span>
      </alert>
      <div class="form-group">
        <label for="oldPassword">{{"label.password" | translate}}</label>
               <input name="oldPassword" type="password" class="form-control" formControlName="oldPassword"/>
         <small class="text-danger" [hidden]="!passwordFormErrors.oldPassword">
             {{passwordFormErrors.oldPassword}}
        </small>
      </div>
      <div class="form-group">
        <label for="newPassword">{{"label.password" | translate}}</label>
               <input name="newPassword" class="form-control" type="password" formControlName="newPassword"/>
         <small class="text-danger" [hidden]="!passwordFormErrors.newPassword">
             {{passwordFormErrors.newPassword}}
        </small>
      </div>
      <div class="form-group">
        <label for="repeatPassword">{{"label.repeatPassword" | translate}}</label>
               <input name="repeatPassword" class="form-control" type="password" formControlName="repeatPassword"/>
         <small class="text-danger" [hidden]="!passwordFormErrors.repeatPassword">
             {{passwordFormErrors.repeatPassword}}
        </small>
      </div>
      
      <div class="form-group box-footer">
        <button id="submit" type="submit" class="btn btn-primary">{{"btn.submit" | translate}}</button>
      </div>
    </form>
    </div>
      
  
    </div>
  `,
    styles: []
})
export class EditAccountFormComponent implements OnInit {

    @Input() profileId: any;

    profileForm: FormGroup;

    passwordForm: FormGroup;

    globalError: string = "";

    globalPasswordError: string = "";

    positionEnum = PositionEnum;

    updateProfileSuccess: boolean = false;

    updatePasswordSuccess: boolean = false;

    @ViewChild(FocusOnErrorDirective) error: FocusOnErrorDirective;
    @ViewChild(FocusOnSuccessDirective) success: FocusOnSuccessDirective;

    passwordFormErrors = {
        'id': '',
        'newPassword': '',
        'oldPassword': '',
        'repeatPassword': '',
    };

    formErrors = {
        'address': {
            'address': '',
            'postalCode': '',
            'city': '',
        },
        'account': {
            'firstName': '',
            'lastName': '',
            'username': '',
        },
        'position': '',
        'phone': '',
        'mobilePhone': '',
        'doodleNotifications': '',
        'newsNotifications': '',
    };

    constructor(private _fb: FormBuilder, private _api: AccountprofilerestcontrollerApi, private _accountApi: AccountrestcontrollerApi,
                private _validationService: ValidationService, private _errorHandler: ErrorHandlerService) {
    }

    ngOnInit() {
        this.profileForm = this._fb.group({
            id: ['', [<any>Validators.required]],
            account: this._fb.group({
                username: ['', [<any>Validators.required, Validators.email]],
                firstName: ['', [<any>Validators.required, Validators.pattern("^[\u00c0-\u01ffa-zA-Z\.-\\s']+$")]],
                lastName: ['', [<any>Validators.required, Validators.pattern("^[\u00c0-\u01ffa-zA-Z\.-\\s']+$")]],
            }),
            address: this._fb.group({
                address: ['', []],
                city: ['', []],
                postalCode: ['', [Validators.pattern("^[0-9]+$")]],
            }),
            phone: ['', [Validators.pattern("^[0-9+]{9,13}$")]],
            mobilePhone: ['', [Validators.pattern("^[0-9+]{9,13}$")]],
            position: ['', []],
            doodleNotifications: ['', []],
            newsNotifications: ['', []]
        });

        this._api.getProfile(this.profileId, SecUtil.getJwtHeaders()).subscribe(
            profile => {
                this.profileForm.patchValue({
                    id: profile.id,
                    phone: profile.phone,
                    mobilePhone: profile.mobilePhone,
                    position: profile.position,
                    doodleNotifications: profile.doodleNotifications,
                    newsNotifications: profile.newsNotifications,
                });

                this.profileForm.controls['account'].patchValue(profile.account);
                if (profile.address) {
                    this.profileForm.controls['address'].patchValue(profile.address);
                }

            },
            e => {
                this._errorHandler.handle(e, "account/profile/edit/" + this.profileId);
            }
        );

        this.passwordForm = this._fb.group({
            id: [this.profileId, [<any>Validators.required]],
            oldPassword: ['', [<any>Validators.required]],
            newPassword: ['', [<any>Validators.required, <any>Validators.pattern("^[0-9a-zA-Z\._-]{5,15}$")]],
            repeatPassword: ['', [<any>Validators.required, equalsValidator("newPassword")]],
        });

        //Set listener
        this.profileForm.valueChanges
            .subscribe(data => {
                this._validationService.onValueChanged(this.profileForm, this.formErrors);
            });

        //Set listener
        this.passwordForm.valueChanges
            .subscribe(data => {
                this._validationService.onValueChanged(this.passwordForm, this.passwordFormErrors);
            });
    }

    submitPassword(model: any) {
        this.globalPasswordError = '';
        this.updatePasswordSuccess = false;

        //Mark all controls as dirty, since the form has been submitted
        this._validationService.markControlsAsDirty(this.passwordForm);
        //trigger the validation
        this._validationService.onValueChanged(this.passwordForm, this.passwordFormErrors);

        if (this.passwordForm.valid) {
            this._accountApi.changePassword(model, SecUtil.getJwtHeaders()).subscribe(
                r => {
                    this.globalPasswordError = '';
                    this.updatePasswordSuccess = true;
                    console.log("Posted");
                },
                error => {
                    this.globalPasswordError = this._errorHandler.handle(error);
                }
            );

        } else {
            console.log("invalid form: " + this.passwordForm);
        }
    }

    submitProfile(model: any) {
        this.globalError = '';
        this.updateProfileSuccess = false;

        //Mark all controls as dirty, since the form has been submitted
        this._validationService.markControlsAsDirty(this.profileForm);
        //trigger the validation
        this._validationService.onValueChanged(this.profileForm, this.formErrors);

        if (this.profileForm.valid) {
            this._api.updateProfile(model, SecUtil.getJwtHeaders()).subscribe(
             r => {
                 this.globalError = '';
                 this.updateProfileSuccess = true;
                 this.success.trigger();
                 console.log("Posted");
             },
                error => {
                    this.globalError = this._errorHandler.handle(error);
                    this.error.trigger();
                });

        } else {
            console.log("invalid form: " + this.profileForm);
        }
    }


}
