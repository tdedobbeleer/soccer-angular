import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {LoginService} from "../../services/login.service";
import {isNullOrUndefined} from "util";
import {map} from "rxjs/operators";

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
             
              <div class="form-group" [ngClass]="{ 'has-error': f.submitted && !password.valid }">
              <input type="checkbox" id="rememberUserName" name="rememberUserName" [(ngModel)]="model.rememberUserName" #password="ngModel" />
              <label for="rememberUserName">{{'label.rememberUserName' | translate}}</label>
              </div>
              <div>
                <a [routerLink]="['/register']" routerLinkActive="active">{{'nav.register' | translate}}</a>
              </div>
              <div>
                <a [routerLink]="['/password/recovery/request']" routerLinkActive="active">{{'nav.recovery.request' | translate}}</a>
              </div>
          </div>
          <div class="form-group box-footer">
              <button [disabled]="loading" class="btn btn-primary" [ladda]="loading">{{'btn.login' | translate}}
              </button>
          </div>
      </form>
      </div>
    </div>
</div>
  `,
  styles: []
})
export class LoginComponent implements OnInit {

  model: any = {
    username: "",
    password: "",
    rememberUserName: false,
  };
  loading = false;
  error = '';
  lastUserName = "lastUserName";

  constructor(
      private service : LoginService,
      private route: ActivatedRoute,
      private router: Router
  ) { }

  ngOnInit() {
    this.model.username = this.getLastUserName();
    this.model.rememberUserName = !isNullOrUndefined(this.model.username);
  }

  login() {
    this.loading = true;
    this.service.login(this.model.username, this.model.password, false)
        .subscribe(
            isLoggedIn => {
          if (isLoggedIn) {
            //On success, save username
            this.setLastUserName(this.model.rememberUserName ? this.model.username : undefined);
            //redirect if needed
              this.route.queryParamMap.pipe(
                  map(params => params.get('redirectUrl') || '')
              ).subscribe(p => {
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

  setLastUserName(username) {
    if (!isNullOrUndefined(username)) {
      localStorage.setItem(this.lastUserName, username);
    }
    else {
      localStorage.removeItem(this.lastUserName);
    }
  }

  getLastUserName() {
    return localStorage.getItem(this.lastUserName);
  }
}
