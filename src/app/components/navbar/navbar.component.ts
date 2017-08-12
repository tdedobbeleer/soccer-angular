import {Component, OnInit} from "@angular/core";
import {TranslationService} from "../../services/translation.service";
import {LoginService} from "../../services/login.service";
import {isUndefined} from "util";
import {SecUtil} from "../../classes/sec-util";

@Component({
  selector: 'app-navbar',
  template: `
    <div id="top">
    <div class="container">
        <div class="col-md-6" data-animate="fadeInDown"></div>
        <div class="col-md-6" data-animate="fadeInDown">
            <ul class="menu">
                <li><a (click)="selectLang(oppositeLang)"><span class="glyphicon glyphicon-globe"></span>&nbsp;{{oppositeLang.display}}</a></li>
                
                <li *ngIf="isLoggedIn" class="dropdown" dropdown>
                    <a href="javascript:void(0)" class="dropdown-toggle" data-toggle="dropdown" dropdownToggle><span class="glyphicon glyphicon-user"></span>&nbsp;{{user.firstName}} <b class="caret"></b></a>
                    <ul class="dropdown-menu" *dropdownMenu>
                        <li><a [routerLink]="['/account/profile/edit/' + user.id ]" routerLinkActive="active">{{'nav.profile' | translate}}</a></li>
                        <li><a (click)="logout()">{{'nav.logout' | translate}}</a></li>                        
                    </ul>
                </li>
 
                <li *ngIf="!isLoggedIn">
                    <a [routerLink]="['/login']" routerLinkActive="active"><span class="glyphicon glyphicon-user"></span>&nbsp;{{'nav.login' | translate}}</a>
                </li>

                <li><a [routerLink]="['/faq']" routerLinkActive="active">{{'nav.faq' | translate}}</a></li>
                <li><a [routerLink]="['/contact']" routerLinkActive="active"><span class="glyphicon glyphicon-envelope" aria-hidden="true"></span>&nbsp;{{'nav.contact' | translate}}</a>
                <li><a [routerLink]="['/about']" routerLinkActive="active">{{'nav.about' | translate}}</a></li>
            </ul>
        </div>
    </div>
</div>

<!-- *** TOP BAR END *** -->

<!-- *** NAVBAR ***
_________________________________________________________ -->

<div class="navbar navbar-default yamm" role="navigation" id="navbar">
    <div class="container">
        <div class="navbar-header">

            <a class="navbar-brand home" href="https://www.svk-oh.be">
                <img src="../../../assets/images/svk-weblogo-themed.png" alt="Obaju logo" class="hidden-xs">
                <img src="../../../assets/images/svk-weblogo-themed.png" alt="Obaju logo" class="visible-xs"><span class="sr-only">Go to homepage</span>
            </a>

            <div class="navbar-buttons" dropdown>
                <button type="button" class="navbar-toggle" (click)="isMenuCollapsed = !isMenuCollapsed">
                    <span class="sr-only">Toggle navigation</span>
                    <i class="fa fa-align-justify"></i>
                </button>

            </div>
        </div>
        <!--/.navbar-header -->

        <div class="navbar-collapse collapse" id="navigation" [collapse]="isMenuCollapsed">

            <ul class="nav navbar-nav navbar-left">
                <li><a [routerLink]="['/messages']" routerLinkActive="active">{{'nav.messages' | translate}}</a></li>
                <li><a [routerLink]="['/matches']" routerLinkActive="active">{{'nav.matches' | translate}}</a></li>
                <li><a [routerLink]="['/manofthematch']" routerLinkActive="active">{{'nav.manOfTheMatch' | translate}}</a></li>
                <li><a [routerLink]="['/teams']" routerLinkActive="active">{{'nav.teams' | translate}}</a></li>
                <li><a [routerLink]="['/doodles']" routerLinkActive="active">{{'nav.doodle' | translate}}</a></li>
                <li><a [routerLink]="['/team']" routerLinkActive="active">{{'nav.team' | translate}}</a></li>
            </ul>

        </div>
    </div>
    <!-- /.container -->
</div>
<!-- /#navbar -->

<!-- *** NAVBAR END *** -->
  `,
  styles: []
})
export class NavbarComponent implements OnInit {
  selectedLang: Lang;
  oppositeLang: Lang;
  user: any;
  isLoggedIn: boolean;
  isMenuCollapsed: boolean = true;

  private en : Lang = {locale : 'en', display: 'English'};
  private nl: Lang = {locale : 'nl', display: 'Nederlands'};

  constructor(private _translate: TranslationService, private _loginService: LoginService) {
  }

  ngOnInit() {
    this.selectLang(this._translate.currentLang() == 'en' ? this.en : this.nl);
    this.isLoggedIn = SecUtil.isLoggedIn();
    this.user = SecUtil.getUser();
    SecUtil.userUpdated.subscribe(u => {
      this.user = u;
      this.isLoggedIn = !isUndefined(u);
    })
  }

  selectLang(lang: Lang) {
    // set default;
    this._translate.use(lang.locale);
    this.refreshText(lang);
  }

  refreshText(currentLang: Lang) {
    this.oppositeLang = currentLang === this.en ? this.nl : this.en;
    this.selectedLang = currentLang;
  }

  logout() {
    this._loginService.logout();
  }
}

export interface Lang {
  locale?: string;

  display?: string;

}
