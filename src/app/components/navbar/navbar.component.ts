import {Component, OnInit} from "@angular/core";
import {TranslationService} from "../../services/translation.service";

@Component({
  selector: 'app-navbar',
  template: `
    <div id="top">
    <div class="container">
        <div class="col-md-6" data-animate="fadeInDown"></div>
        <div class="col-md-6" data-animate="fadeInDown">
            <ul class="menu">
                <li><a (click)="selectLang(oppositeLang)"><span class="glyphicon glyphicon-globe"></span>&nbsp;{{oppositeLang.display}}</a></li>
                
                <li *ngIf="isLoggedIn()">
                    {{currentUser.firstName}}
                </li>
 
                <li *ngIf="!isLoggedIn()">
                    <a [routerLink]="['/login']" routerLinkActive="active"><span class="glyphicon glyphicon-user"></span>&nbsp;{{'nav.login' | translate}}</a>
                </li>

                <li><a [routerLink]="['/faq']" routerLinkActive="active">Website FAQ</a></li>
                <li><a [routerLink]="['/contact']" routerLinkActive="active"><span class="glyphicon glyphicon-envelope" aria-hidden="true"></span>&nbsp;Contacteer</a>
                </li>
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
                <img src="images/svk-weblogo-themed.png" alt="Obaju logo" class="hidden-xs">
                <img src="images/svk-weblogo-themed.png" alt="Obaju logo" class="visible-xs"><span class="sr-only">Go to homepage</span>
            </a>

            <div class="navbar-buttons">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navigation">
                    <span class="sr-only">Toggle navigation</span>
                    <i class="fa fa-align-justify"></i>
                </button>

            </div>
        </div>
        <!--/.navbar-header -->

        <div class="navbar-collapse collapse" id="navigation">

            <ul class="nav navbar-nav navbar-left">
                <li><a [routerLink]="['/messages']" routerLinkActive="active">Berichten</a></li>

                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">Matchen <b class="caret"></b></a>
                    <ul class="dropdown-menu">
                        <li><a href="/matches.html">Overzicht</a></li>
                        <li><a href="/matchPolls.html">Man van de match</a></li>
                        <li><a href="/statistics.html">Statistieken</a></li>
                    </ul>
                </li>
                <li><a [routerLink]="['/teams']" routerLinkActive="active">Teams</a></li>
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">Doodle <b class="caret"></b></a>
                    <ul class="dropdown-menu">
                        <li><a href="/doodle.html">Doodle</a></li>
                        <li><a href="http://doodle.com/zhkfyad4t7m3x42b#table">Trainingsdoodle</a></li>
                    </ul>
                </li>

                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">Info <b class="caret"></b></a>
                    <ul class="dropdown-menu">
                        <li><a href="/home.html">Algemeen</a></li>
                        <li><a href="/team.html">Ons team</a></li>
                    </ul>
                </li>


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
  private selectedLang : Lang;
  private oppositeLang : Lang;

  private currentUser: any;

  private en : Lang = {locale : 'en', display: 'English'};
  private nl: Lang = {locale : 'nl', display: 'Nederlands'};

  constructor(private _translate: TranslationService) { }

  ngOnInit() {
    this.selectLang(this.nl);

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

  isLoggedIn() {
    let user = localStorage.getItem('currentUser');
    if (user !== null) {
      this.currentUser = JSON.parse(user);
      return true;
    }
    return false;
  }

}

interface Lang {
  locale?: string;

  display?: string;

}
