import {Component, OnInit, ViewChild} from "@angular/core";
import {FormGroup, Validators, FormBuilder} from "@angular/forms";
import {FocusOnSuccessDirective} from "../../directives/focus-on-success.directive";
import {FocusOnErrorDirective} from "../../directives/focus-on-error.directive";
import {ValidationService} from "../../services/validation.service";
import {AddressDTO} from "../../ws/soccer/model/AddressDTO";
import {Util} from "../../classes/util";

@Component({
    selector: 'app-create-team-form',
    template: `
    <div class="success-div">
        <alert [type]="'success'" [dismissible]="false" *ngIf="createTeamSuccess">{{"text.team.success.create" | translate}}</alert>
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
        <label for="useExistingAddress">{{"label.team.useExistingAddress" | translate}}</label>
        <input name="useExistingAddress" type="checkbox" class="form-control" formControlName="useExistingAddress"/>
      </div>
      
      
      <div formGroupName="address" *ngIf="!teamForm.value.useExistingAddress">
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
           <div class="form-group" *ngIf="showMap">
            <label for="useGoogleLink">{{"label.team.useGoogleLink" | translate}}</label>
            <input name="useGoogleLink" type="checkbox" class="form-control" formControlName="useGoogleLink" (change)="onGoogleLinkChange()"/>
          </div>
          <div *ngIf="showMap">
            <iframe id="mapFrame" width="100%" height="450" scrolling="no" marginheight="0" marginwidth="0" [src]="googleLink | safe" frameborder="0"></iframe>
          </div>
      </div>
      </form>
  `,
    styles: []
})
export class CreateTeamFormComponent implements OnInit {
    teamForm: FormGroup;
    showMap: boolean = false;
    googleLink: string;

    @ViewChild(FocusOnErrorDirective) error: FocusOnErrorDirective;
    @ViewChild(FocusOnSuccessDirective) success: FocusOnSuccessDirective;

    formErrors = {
        'address': {
            'address': '',
            'postalCode': '',
            'city': '',
            'googleLink': '',
        },
    };

    constructor(private _validationService: ValidationService, private _fb: FormBuilder) {
    }

    ngOnInit() {
        this.teamForm = this._fb.group({
            useGoogleLink: [false, []],
            useExistingAddress: [false, []],
            selectedAddress: ['', []],
            address: this._fb.group({
                address: ['', []],
                city: ['', []],
                postalCode: ['', [Validators.pattern("^[0-9]+$")]],
                googleLink: ['', []]
            }),
            name: ['', [Validators.required, Validators.required]]
        });

        //Set listener
        this.teamForm.valueChanges
            .subscribe(data => {
                this._validationService.onValueChanged(this.teamForm, this.formErrors);
                this.checkAddress();
            });
    }

    submit(model: any) {

    }

    private onGoogleLinkChange() {
        if (this.teamForm.value.useGoogleLink) {
            this.teamForm.controls['address'].patchValue({
                googleLink: this.googleLink,
            })
        }
    }

    private checkAddress() {
        let address: AddressDTO = this.teamForm.value.address;
        if (address.address &&
            address.postalCode &&
            address.city) {
            this.showMap = true;
            this.googleLink = Util.buildGoogleLink(address.address, address.postalCode, address.city);
        }
        else {
            this.showMap = false;
        }
    }

}
