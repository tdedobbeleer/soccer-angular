import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-faq',
    template: `
    <div class="container">
    <ul class="breadcrumb">
        <li><a [routerLink]="['/']" routerLinkActive="active"><span class="fa fa-home"></span>&nbsp;Home</a></li>
        <li>{{'nav.faq' | translate}}</li>
    </ul>
    <div class="box" id="contact">
      <h1>{{'title.faq' | translate}}</h1>
  
      <p class="lead">{{'text.faq' | translate}}</p>
  
      <hr>
  
      <accordion>
        <accordion-group *ngFor="let item of [1,2,3,4,5]" [panelClass]="'panel-primary'" heading="{{getText('title.faq', item) | translate }}">
          <span [innerHtml]="getText('text.faq', item) | safeHtml"></span>
        </accordion-group>
      </accordion>
  
  
    </div>
    </div>
  `,
    styles: []
})
export class FaqComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

    getText(s: string, i: string) {
        return s.concat(i);
    }

}
