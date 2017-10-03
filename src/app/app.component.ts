import {Component} from "@angular/core";
import {LoginService} from "./services/login.service";
import {Router} from "@angular/router";
import {isNullOrUndefined} from "util";

@Component({
    selector: 'app-root',
    template: `
    <app-navbar></app-navbar>
    <div id="all">
        <!-- removed: (touchstart)="swipe($event, 'start')" (touchend)="swipe($event, 'end')" -->
        <div id="content">
            <router-outlet></router-outlet>
        </div>
        <app-footer></app-footer>
    </div>
    `
})
export class AppComponent {
    private swipeCoord?: [number, number];
    private swipeTime?: number;

    private nav = [
        "/",
        "/matches",
        "/statistics",
        "/teams",
        "/doodles",
        "/team"
    ];

    constructor(private _loginService: LoginService, private _router: Router) {
    }

    ngOnInit() {
        this._loginService.init();
    }

    private navigate(i) {
        if (!isNullOrUndefined(this.nav[i])) {
            this._router.navigate([this.nav[i]]);
        }
    }

    swipe(e: TouchEvent, when: string): void {
        const coord: [number, number] = [e.changedTouches[0].pageX, e.changedTouches[0].pageY];
        const time = new Date().getTime();

        if (when === 'start') {
            this.swipeCoord = coord;
            this.swipeTime = time;
        }

        else if (when === 'end') {
            const direction = [coord[0] - this.swipeCoord[0], coord[1] - this.swipeCoord[1]];
            const duration = time - this.swipeTime;

            if (duration < 1000 //Short enough
                && Math.abs(direction[1]) < Math.abs(direction[0]) //Horizontal enough
                && Math.abs(direction[0]) > 30) {  //Long enough
                const swipe: string = direction[0] < 0 ? 'n' : 'p';

                const i = this.nav.indexOf(this._router.url);
                if (i >= 0) {
                    swipe === "n" ? this.navigate(i + 1) : this.navigate(i - 1);
                }

            }
        }
    }
}

