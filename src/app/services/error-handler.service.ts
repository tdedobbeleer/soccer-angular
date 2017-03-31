import {Injectable} from "@angular/core";
import {Response} from "@angular/http";
import {Router} from "@angular/router";

@Injectable()
export class ErrorHandlerService {

    constructor(private _router: Router) {
    }

    handle(error: Response | any, url: String) {
        if (error instanceof Response) {
            switch (error.status) {
                case 401:
                    this._router.navigate(['/login'], {queryParams: {redirectUrl: url}});
                    break;
                default:
                    this._router.navigate(['/failwhale']);
                    break;

            }
        }
        else {
            this._router.navigate(['/failwhale']);
        }
    }

}
