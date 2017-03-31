import {Component, OnInit} from "@angular/core";

@Component({
    selector: 'app-fail-whale',
    template: `
  <div class="container">
    <div class="row m-t-1">
        <div class="col-md-12">
            <h2>{{'title.error.unknown' | translate}}</h2>
            <div class="alert alert-danger">
                {{'text.error.unknown' | translate}}
            </div>
        </div>
    </div>
  </div> 
  
  `
})
export class FailWhaleComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

}
