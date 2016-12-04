import {Component, OnInit} from "@angular/core";
import {PageDTONewsDTO} from "../../ws/model/PageDTONewsDTO";
import {NewsrestcontrollerApi} from "../../ws/api/NewsrestcontrollerApi";
import {LoginService} from "../../services/login.service";

@Component({
  selector: 'app-messages',
  template: `
  <div class="row m-t-1">
      <div class="col-md-12">
          <div id="blog-homepage" ng-show="!loading">
              <div id="default">
                  <div class="news-div">
                    <app-message
                      *ngFor="let message of newsPage?.list" [message]="message">
                    </app-message>
                  </div>
              </div>
          </div>
      </div>
  </div>
 
  `,
  styles: []
})
export class MessagesComponent implements OnInit {

  newsPage: PageDTONewsDTO;

  constructor(private _api: NewsrestcontrollerApi, private _loginService: LoginService) {
  }

  ngOnInit() {

    this._api.getNewsPage(0, 10, this._loginService.jwtHeader)
        .subscribe(n => this.newsPage = n);
  }

}
