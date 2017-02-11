import {Component, OnInit} from "@angular/core";
import {NewsDTO} from "../../ws/model/NewsDTO";
import {NewsrestcontrollerApi} from "../../ws/api/NewsrestcontrollerApi";
import {LoginService} from "../../services/login.service";

@Component({
    selector: 'app-create-message',
    template: `
  <div class="container">
      <div class="col-md-12">
            <ul class="breadcrumb">
                <li><a href="/">{{'nav.home' | translate}}</a>
                </li>
                <li>{{'nav.messages.create' | translate}}
                </li>
            </ul>
        </div>
        
      <div class="col-md-12">
        <app-message-form (onSubmit)="save($event)" [content]="" [header]="" [update]="false"></app-message-form>
      </div>
  </div>

  `,
    styles: []
})
export class CreateMessageComponent implements OnInit {

    constructor(private _api: NewsrestcontrollerApi, private _loginService: LoginService) {
    }

    ngOnInit() {

    }

    save(model: NewsDTO) {
        this._api.postNews(model, this._loginService.jwtHeader).subscribe(
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
