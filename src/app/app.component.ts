import {Component} from "@angular/core";
import {LoginService} from "./services/login.service";

@Component({
    selector: 'app-root',
    template: `
    <app-navbar></app-navbar>
    <div id="all">
        <div id="content">
            <div class="container">
                <router-outlet></router-outlet>
            </div>
        </div>
        <app-footer></app-footer>
    </div>
    `
})
export class AppComponent {
    constructor(private _loginService: LoginService) {
    }

    ngOnInit() {
        this._loginService.init();
    }
}

