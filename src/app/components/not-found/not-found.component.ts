import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
   <div class="container">
        <div class="col-md-12">
            <ul class="breadcrumb">
                <li><a [routerLink]="['/']" routerLinkActive="active"><span class="fa fa-home"></span>&nbsp;Home</a></li>
                <li>{{'title.error.404' | translate}}</li>
            </ul>
    
    
            <div class="row" id="error-page">
                <div class="col-sm-6 col-sm-offset-3">
                    <div class="box">
    
                        <p class="text-center">
                            <img src="assets/images/svk-weblogo-themed.png">
                        </p>
    
                        <h3>{{'title.error.404' | translate}}</h3>
    
                        <p class="text-center">{{'text.error.404' | translate}}</p>
    
                        <p class="buttons"><a [routerLink]="['/']" routerLinkActive="active" class="btn btn-primary"><i class="fa fa-home"></i>{{'text.go.home' | translate}}</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <!-- /.col-md-9 -->
    </div>  
  `,
  styles: []
})
export class NotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
