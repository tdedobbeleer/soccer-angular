import {Component, OnInit, Input} from "@angular/core";
import {TeamDTO} from "../../ws/model/TeamDTO";
import {LoginService} from "../../services/login.service";

@Component({
    selector: 'app-team',
    template: `
      <div class="box">
         <div class="row">
            <div class="col-md-4 col-xs-12"><h4>{{team.name}}</h4></div>
            <div class="col-md-4 col-xs-12">
                <div class="row">
                    <div class="col-md-1"><span class="glyphicon glyphicon-home"></span></div>
                    <div class="col-md-11">
                        <div>{{team.address.address}}</div>
                        <div>{{team.address?.postalCode}}&nbsp;{{team.address?.city}}</div>
                    </div>
                </div>
            </div>
            <div class="col-md-4 col-xs-12 text-center">
            <div class="btn-group">
              <button *ngIf="team.address?.googleLink != null" type="button" class="btn btn-circle" aria-label="Show map" (click)="showMap = !showMap">
                  <span class="glyphicon glyphicon-map-marker" aria-hidden="true"></span>
              </button>
              <button *ngIf="isAdmin()" type="button" class="btn btn-circle" aria-label="Edit team">
                  <span class="glyphicon glyphicon-edit" aria-hidden="true"></span>
              </button>
            </div>
        </div>
    </div>
      <div class="row" *ngIf="showMap">
      <hr>
      <iframe id="mapFrame" width="100%" height="450" scrolling="no" marginheight="0" marginwidth="0" [src]="team.address?.googleLink | safe" frameborder="0"></iframe>
      </div>    
    </div>
  `,
    styles: []
})
export class TeamComponent implements OnInit {
    @Input() team: TeamDTO;

    constructor(private _loginService: LoginService) {
    }

    ngOnInit() {

    }

    isAdmin(): boolean {
        return this._loginService.isAdmin();
    }
}
