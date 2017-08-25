import {FormControl} from "@angular/forms";
import {SecUtil} from "../classes/sec-util";
import {isNullOrUndefined} from "util";
export function notCurrentAccountValidator() {

    return function matchCurrentAccountValidator(control: FormControl) {
        let currentUser: any = SecUtil.getUser();
        let currentValue: number = +control.value;
        if (!isNullOrUndefined(currentUser) && !isNullOrUndefined(currentValue) && currentValue === currentUser.id) {
            return {
                matchesCurrentId: true
            };
        }

        return null;
    }

}
