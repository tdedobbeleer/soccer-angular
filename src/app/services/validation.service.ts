import {Injectable} from "@angular/core";
import {TranslationService} from "./translation.service";
import {FormGroup} from "@angular/forms";

@Injectable()
export class ValidationService {

    constructor(private _translationService: TranslationService) {
    }

    onValueChanged(form?: any, formErrors?: any) {
        if (!form) {
            return;
        }

        for (const field in formErrors) {
            // clear previous error message (if any)
            formErrors[field] = '';
            const control = form.get(field);

            if (control && control.dirty && !control.valid) {
                for (const key in control.errors) {
                    if (key == 'required') {
                        formErrors[field] += this._translationService.instant('validation.' + key) + ' ';
                    } else {
                        formErrors[field] += this._translationService.instant('validation.' + field + '.' + key) + ' ';
                    }
                }
            }
        }
    }

    markControlsAsDirty(form?: FormGroup) {
        Object.keys(form.controls).forEach(key => {
            form.get(key).markAsDirty();
        });
    }

}
