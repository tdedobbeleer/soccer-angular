import {Component, OnInit} from "@angular/core";

@Component({
    selector: 'app-fail-whale',
    template: `
  <div class="container">
        <div class="col-md-12">
            <ul class="breadcrumb">
                <li><a [routerLink]="['/']" routerLinkActive="active"><span class="glyphicon glyphicon-home"></span>&nbsp;Home</a></li>
                <li>{{'title.error.unknown' | translate}}</li>
            </ul>
    
    
            <div class="row" id="error-page">
                <div class="col-sm-6 col-sm-offset-3">
                    <div class="box">
    
                        <p class="text-center">
                            <img src="assets/images/svk-weblogo-themed.png">
                        </p>
    
                        <h3>{{'title.error.unknown' | translate}}</h3>
    
                        <p class="text-center">{{'text.error.unknown' | translate}}</p>
    
                        <p class="buttons"><a [routerLink]="['/']" routerLinkActive="active" class="btn btn-primary"><i class="fa fa-home"></i>{{'text.go.home' | translate}}</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <!-- /.col-md-9 -->
    </div>  
  `
})
export class FailWhaleComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

}
