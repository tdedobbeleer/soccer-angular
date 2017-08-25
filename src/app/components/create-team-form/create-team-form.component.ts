import {Component, OnInit, ViewChild} from "@angular/core";
import {FormGroup, Validators, FormBuilder} from "@angular/forms";
import {FocusOnSuccessDirective} from "../../directives/focus-on-success.directive";
import {FocusOnErrorDirective} from "../../directives/focus-on-error.directive";
import {ValidationService} from "../../services/validation.service";
import {AddressDTO} from "../../ws/soccer/model/AddressDTO";
import {Util} from "../../classes/util";
import {TeamsrestcontrollerApi} from "../../ws/soccer/api/TeamsrestcontrollerApi";
import {ErrorHandlerService} from "../../services/error-handler.service";
import {TeamDTO} from "../../ws/soccer/model/TeamDTO";
import {SecUtil} from "../../classes/sec-util";

@Component({
    selector: 'app-create-team-form',
    template: `
    <div class="box">
    <div class="success-div">
        <alert [type]="'success'" [dismissible]="false" *ngIf="createSuccess">{{"text.team.success.create" | translate}}</alert>
    </div>
    <div class="error-div">
         <alert [type]="'danger'" [dismissible]="false" *ngIf="globalError"><span [innerHtml]="globalError | safeHtml"></span></alert>
    </div>
    <form [formGroup]="teamForm" novalidate (ngSubmit)="submit(teamForm.value)">
    <div class="form-group">
        <label for="name">{{"label.team.name" | translate}}</label>
               <input name="lastName" class="form-control" formControlName="name"/>
         <small class="text-danger" [hidden]="!formErrors.name">
             {{formErrors.name}}
        </small>
      </div>
        
      <div class="form-group"> 
        <input name="useExistingAddress" type="checkbox" formControlName="useExistingAddress" (change)="onUseExistingAddressChange()"/>
        <label for="useExistingAddress">{{"label.team.useExistingAddress" | translate}}</label>
      </div>
      
       <div class="form-group" *ngIf="teamForm.value.useExistingAddress">
        <label for="address">{{"label.team.address" | translate}}</label>
        <select name="existingAddress" class="form-control" formControlName="selectedAddress" (change)="onSelectAddressChange()">
              <option value="null" disabled [selected]="true">{{'text.select' | translate}}</option>
              <option *ngFor="let a of addressList" [ngValue]="a" [selected]="false">{{a.address}} {{a.postalCode}} {{a.city}}</option>
        </select>
        <small class="text-danger" [hidden]="!formErrors.address.address">
             {{formErrors.address.address}}
        </small>
      </div>      
      
      <div *ngIf="!teamForm.value.useExistingAddress">
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
           <div class="form-group" *ngIf="showMap">
            <input name="useGoogleLink" type="checkbox" formControlName="useGoogleLink" (change)="onGoogleLinkChange()"/>
             <label for="useGoogleLink">{{"label.team.useGoogleLink" | translate}}</label>
          </div>
          <div *ngIf="showMap">
            <iframe id="mapFrame" width="100%" height="450" scrolling="no" marginheight="0" marginwidth="0" [src]="googleLink | safe" frameborder="0"></iframe>
          </div>
      </div>
       <div class="form-group box-footer">
        <button id="submit" type="submit" class="btn btn-primary">{{"btn.submit" | translate}}</button>
        <button id="btnReset" type="reset" class="btn btn-info">Reset</button>
        <a id="btnCancel" class="btn btn-default" [routerLink]="['/teams']">{{"btn.cancel" | translate}}</a>
      </div>
      </form>
      </div>
  `,
    styles: []
})
export class CreateTeamFormComponent implements OnInit {
    globalError = '';
    teamForm: FormGroup;
    showMap: boolean = false;
    createSuccess: boolean = false;
    googleLink: string;
    addressList: AddressDTO[];

    @ViewChild(FocusOnErrorDirective) error: FocusOnErrorDirective;
    @ViewChild(FocusOnSuccessDirective) success: FocusOnSuccessDirective;

    formErrors = {
        'name': '',
        'address': {
            'id': '',
            'address': '',
            'postalCode': '',
            'city': '',
            'googleLink': '',
        },
    };

    constructor(private _validationService: ValidationService, private _fb: FormBuilder, private _api: TeamsrestcontrollerApi, private _errorHandler: ErrorHandlerService) {
    }

    ngOnInit() {
        this._api.getTeamAddresses().subscribe(
            r => {
                this.addressList = r;
            },
            e => {
                this._errorHandler.handle(e);
            }
        );

        this.teamForm = this._fb.group({
            useGoogleLink: [false, []],
            useExistingAddress: [false, []],
            name: ['', [<any>Validators.required, Validators.required]],
            selectedAddress: ['', []],
            address: this._fb.group({
                id: ['', ''],
                address: ['', [<any>Validators.required]],
                city: ['', [<any>Validators.required]],
                postalCode: ['', [Validators.pattern("^[0-9]+$")]],
                googleLink: ['', []]
            }),
        });

        //Set listener
        this.teamForm.valueChanges
            .subscribe(data => {
                this._validationService.onValueChanged(this.teamForm, this.formErrors);
                this.checkAddress();
                this.createSuccess = false;
            });
    }

    submit(model: TeamDTO) {
        this.globalError = '';
        this.createSuccess = false;
        //this.match.season = this.matchForm.getRawValue();

        //Mark all controls as dirty, since the form has been submitted
        this._validationService.markControlsAsDirty(this.teamForm);
        //trigger the validation
        this._validationService.onValueChanged(this.teamForm, this.formErrors);

        if (this.teamForm.valid) {
            this._api.createTeam(model, SecUtil.getJwtHeaders()).subscribe(
                r => {
                    this.globalError = '';
                    this.createSuccess = true;
                    this.success.trigger();
                    console.log("Posted");
                },
                error => {
                    this.globalError = this._errorHandler.handle(error);
                    this.error.trigger();
                },
            )

        } else {
            console.log("invalid form: " + this.teamForm);
        }
    }

    onUseExistingAddressChange() {
        if (!this.teamForm.value.useExistingAddress) {
            //If new address is used, empty the id
            this.teamForm.controls['address'].patchValue({id: ''});
        }
    }

    private checkAddress() {
        let address: AddressDTO = this.teamForm.value.address;
        if (!this.teamForm.value.useExistingAddress && address.address &&
            address.postalCode &&
            address.city) {
            this.showMap = true;
            this.googleLink = Util.buildGoogleLink(address.address, address.postalCode, address.city);
        }
        else {
            this.showMap = false;
        }
    }

    private onSelectAddressChange() {
        let address: AddressDTO = this.teamForm.value.selectedAddress;
        if (address && this.teamForm.value.useExistingAddress) {
            this.teamForm.controls['address'].patchValue(address);
        }
    }

    private onGoogleLinkChange() {
        if (this.teamForm.value.useGoogleLink) {
            this.teamForm.controls['address'].patchValue({
                googleLink: this.googleLink,
            })
        }
    }

}
