import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ErrorUtil} from '../classes/error-util';
import {TranslationService} from './translation.service';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable()
export class ErrorHandlerService {

    constructor(private _router: Router, private _translationService: TranslationService) {
    }

    handle(error: HttpErrorResponse | any, url = '/') {
        if (error instanceof HttpErrorResponse) {
            switch (error.status) {
                case 401:
                    this._router.navigate(['/login'], {queryParams: {redirectUrl: url}});
                    break;
                case 403:
                    this._router.navigate(['/login'], {queryParams: {redirectUrl: url}});
                    break;
                case 400:
                    let d = error.error;
                    return ErrorUtil.getValidationError(d, this._translationService.currentLang());
                case 0: //cors error
                case 503:
                    this._router.navigate(['/unavailable']);
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
