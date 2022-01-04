import { AfterViewInit, Directive, ElementRef, HostListener, Renderer2, Input } from '@angular/core';
@Directive({
    selector: '[checkEmail]',
})
// tslint:disable-next-line:directive-class-suffix
export class CheckEmail implements AfterViewInit {
    @Input() isTaken: boolean;
    element: any;
    constructor(private el: ElementRef, private renderer: Renderer2) {

    }
    @HostListener('document:focusout', ['$event'])
    onFocusout(target: any) {

        console.log('out', this.isTaken);

        if (this.isTaken === true) {
            this.renderer.removeClass(this.element, 'fa-check');
            this.renderer.addClass(this.element, 'fa-times');
        } if (this.isTaken === false) {
            this.renderer.removeClass(this.element, 'fa-times');
            this.renderer.addClass(this.element, 'fa-check');
        }
    }
    ngAfterViewInit() {
        this.element = this.el.nativeElement.children[0];
        // this.renderer.addClass(this.element, 'fa-spinner fa-spin');

    }

}
