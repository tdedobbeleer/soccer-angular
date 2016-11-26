import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  template: `
    <div id="top">
    <div class="container">
        <div class="col-md-6" data-animate="fadeInDown"></div>
        <div class="col-md-6" data-animate="fadeInDown">
            <ul class="menu">
                <li><a id="changeLang" href="#"><span class="glyphicon glyphicon-globe"></span>&nbsp;EN</a></li>


                <li><a rooterLink="login" routerLinkActive="active"><span class="glyphicon glyphicon-user"></span>&nbsp;Inloggen</a></li>

                <li><a rooterLink="faq" routerLinkActive="active">Website FAQ</a></li>
                <li><a rooterLink="messages" routerLinkActive="active"><span class="glyphicon glyphicon-envelope" aria-hidden="true"></span>&nbsp;Contacteer</a>
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
                <li><a href="/news.html">Berichten</a></li>

                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">Matchen <b class="caret"></b></a>
                    <ul class="dropdown-menu">
                        <li><a href="/matches.html">Overzicht</a></li>
                        <li><a href="/matchPolls.html">Man van de match</a></li>
                        <li><a href="/statistics.html">Statistieken</a></li>
                    </ul>
                </li>
                <li><a href="/teams.html">Teams</a></li>
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

  constructor() { }

  ngOnInit() {
  }

}
