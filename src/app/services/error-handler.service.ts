import {Injectable} from "@angular/core";
import {Response} from "@angular/http";
import {Router} from "@angular/router";
import {ErrorUtil} from "../classes/error-util";
import {TranslationService} from "./translation.service";

@Injectable()
export class ErrorHandlerService {

    constructor(private _router: Router, private _translationService: TranslationService) {
    }

    handle(error: Response | any, url = "/") {
        if (error instanceof Response) {
            switch (error.status) {
                case 401:
                    this._router.navigate(['/login'], {queryParams: {redirectUrl: url}});
                    break;
                case 403:
                    this._router.navigate(['/login'], {queryParams: {redirectUrl: url}});
                    break;
                case 400:
                    let d = error.json();
                    return ErrorUtil.getValidationError(d, this._translationService.currentLang());
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
