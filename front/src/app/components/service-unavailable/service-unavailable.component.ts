import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-service-unavailable',
    template: `
        <div class="container">
            <div class="row m-t-1 m-b-1">
                <div class="col-md-12">
                    <h2>{{'title.service.unavailable' | translate}}</h2>
                    <div class="alert alert-warning">
                        {{'text.service.unavailable' | translate}}
                    </div>
                </div>
                <div class="col-lg-4 col-lg-offset-4">
                    <div class="text-center">
                        <img src="assets/images/pexels-thisisengineering-3861958.jpg" class="thumbnail img-responsive rounded"
                             alt="service down">
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
