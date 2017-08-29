import {Injectable} from "@angular/core";
import {TranslationService} from "./translation.service";
import {FormGroup} from "@angular/forms";
import {isObject} from "util";

@Injectable()
export class ValidationService {

    constructor(private _translationService: TranslationService) {
    }

    onValueChanged(form?: any, formErrors?: any) {
        if (!form) {
            return;
        }

        for (const field in formErrors) {
            const parsedfield = formErrors[field];
            const control = form.get(field);

            if (isObject(parsedfield)) {
                this.onValueChanged(form.get(field), parsedfield);
            } else {
                // clear previous error message (if any)
                formErrors[field] = '';

                if (control && control.dirty && !control.valid) {
                    for (const key in control.errors) {
                        let k = 'validation.' + field + '.' + key;
                        let v = this._translationService.instant(k);
                        if (key == 'required') {
                            if (v !== k) {
                                formErrors[field] += v;
                            }
                            else {
                                formErrors[field] += this._translationService.instant('validation.' + key);
                            }
                        } else {
                            formErrors[field] += v;
                        }
                    }
                }
            }
        }
    }

    markControlsAsDirty(form?: FormGroup) {
        Object.keys(form.controls).forEach(key => {
            if (form.get(key) instanceof FormGroup) {
                this.markControlsAsDirty(<FormGroup> form.get(key));
            } else {
                form.get(key).markAsDirty();
            }
        });
    }
}
