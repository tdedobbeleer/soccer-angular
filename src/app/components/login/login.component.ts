import {Component, OnInit} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {LoginService} from "../../services/login.service";

@Component({
  selector: 'app-login',
  template: `
    <div class="container">
      <div class="col-md-12">
      <ul class="breadcrumb">
            <li>
              <a [routerLink]="['/']" routerLinkActive="active">{{'nav.home' | translate}}</a>
            </li>
            <li>
              {{'nav.login' | translate}}
            </li>
        </ul>
      </div>
      
      <div class="col-md-6 col-md-offset-3">
      <div class="box">
      <div *ngIf="error" class="alert alert-danger">{{error}}</div>
      
      <form name="form" (ngSubmit)="f.form.valid && login()" #f="ngForm" novalidate>
          <div class="form-group" [ngClass]="{ 'has-error': f.submitted && !username.valid }">
              <label for="username">{{'label.username' | translate}}</label>
              <input type="text" class="form-control" name="username" [(ngModel)]="model.username" #username="ngModel" required />
              <div *ngIf="f.submitted && !username.valid" class="help-block">{{validation.username.required | translate}}</div>
          </div>
          <div class="form-group" [ngClass]="{ 'has-error': f.submitted && !password.valid }">
              <label for="password">{{'label.password' | translate}}</label>
              <input type="password" class="form-control" name="password" [(ngModel)]="model.password" #password="ngModel" required />
              <div *ngIf="f.submitted && !password.valid" class="help-block">{{validation.password.required | translate}}</div>
          </div>
          <div class="form-group">
              <label>                            
                <input type="checkbox" name="rememberMe" [(ngModel)]="model.rememberMe" #rememberMe="ngModel"/> {{'label.rememberMe' | translate}}
              </label>
              <div>
                <a [routerLink]="['/register']" routerLinkActive="active">{{'nav.register' | translate}}</a>
              </div>
          </div>
          <div class="form-group box-footer">
              <button [disabled]="loading" class="btn btn-primary">{{'btn.login' | translate}}</button>
              <img *ngIf="loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
          </div>
      </form>
      </div>
    </div>
</div>
  `,
  styles: []
})
export class LoginComponent implements OnInit {

  model: any = {};
  loading = false;
  error = '';

  constructor(
      private service : LoginService,
      private route: ActivatedRoute,
      private router: Router
  ) { }

  ngOnInit() {
    // reset login status
    //this.authenticationService.logout();
  }

  login() {
    this.loading = true;
    this.service.login(this.model.username, this.model.password, this.model.rememberMe)
        .subscribe(
            isLoggedIn => {
          if (isLoggedIn) {
            //redirect if needed
            this.route.queryParamMap
                .map(params => params.get('redirectUrl') || '').subscribe(p => {
              let url = p ? [p] : ['/'];
              this.router.navigate(url);
            });

          } else {
            this.handleLoginError();
          }
        },
        err => {
          this.handleLoginError();
        });
  }

  private handleLoginError() {
    this.error = 'Username or password is incorrect';
    this.loading = false;
  }
}
