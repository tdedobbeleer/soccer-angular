import {FormControl} from "@angular/forms";
import {SecUtil} from "../classes/sec-util";
import {Util} from "../classes/util";
export function notCurrentAccountValidator() {

    return function matchCurrentAccountValidator(control: FormControl) {
        let currentUser: any = SecUtil.getUser();
        let currentValue: number = +control.value;
        if (!Util.isNullOrUndefined(currentUser) && !Util.isNullOrUndefined(currentValue) && currentValue === currentUser.id) {
            return {
                matchesCurrentId: true
            };
        }

        return null;
    }

}
