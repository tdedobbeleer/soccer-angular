import {Component, OnInit} from "@angular/core";

@Component({
    selector: 'app-service-unavailable',
    template: `
  <div class="container">
    <div class="row m-t-1">
        <div class="col-md-12">
            <h2>{{'title.service.unavailable' | translate}}</h2>
            <div class="alert alert-warning">
                {{'text.service.unavailable' | translate}}
            </div>
        </div>
    </div>
  </div> 
  `,
    styles: []
})
export class ServiceUnavailableComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

}
