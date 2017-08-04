import {Directive, ElementRef} from "@angular/core";

@Directive({
    selector: '[div[class=success-div]]'
})
export class FocusOnSuccessDirective {

    constructor(public elementRef: ElementRef) {
    }

    trigger() {
        this.elementRef.nativeElement.scrollIntoView(false, {behavior: "smooth"});
    }

}
