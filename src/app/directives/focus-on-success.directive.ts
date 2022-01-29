import {Directive, ElementRef} from "@angular/core";

@Directive({
    selector: 'div.success-div'
})
export class FocusOnSuccessDirective {

    constructor(public elementRef: ElementRef) {
    }

    trigger() {
        this.elementRef.nativeElement.scrollIntoView({behavior: "smooth"});
    }

}
