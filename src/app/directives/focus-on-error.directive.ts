import {Directive, ElementRef} from "@angular/core";

@Directive({
    selector: 'div.error-div'
})
export class FocusOnErrorDirective {

    constructor(public elementRef: ElementRef) {
    }

    trigger() {
        this.elementRef.nativeElement.scrollIntoView({behavior: "smooth"});
    }

}
