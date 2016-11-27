import { Component, OnInit } from '@angular/core';
import {PageDTONewsDTO} from "../ws/model/PageDTONewsDTO";
import {NewsrestcontrollerApi} from "../ws/api/NewsrestcontrollerApi";

@Component({
  selector: 'app-messages',
  template: `
      <app-message
        *ngFor="let message of newsPage.list" [message]="message">  
      </app-message>
    
  `,
  styles: []
})
export class MessagesComponent implements OnInit {

  newsPage: PageDTONewsDTO;

  constructor(private _api: NewsrestcontrollerApi){
  }

  ngOnInit() {
    this._api.getNewsPage(0, 10).subscribe(n => this.newsPage = n );
  }

}
