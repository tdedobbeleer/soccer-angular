import {Pipe, PipeTransform} from "@angular/core";
import {DomSanitizer} from "@angular/platform-browser";
import {TranslationService} from "../services/translation.service";

@Pipe({
    name: 'safeHtml'
})
export class SafeTranslationPipe implements PipeTransform {
    constructor(private _sanitizer: DomSanitizer, private _translate: TranslationService) {
    }

    transform(value: any, args?: any): any {
        return this._sanitizer.bypassSecurityTrustHtml(this._translate.instant(value));
    }

}
