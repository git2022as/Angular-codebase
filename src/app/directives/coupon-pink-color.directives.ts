import { Directive, ElementRef, OnInit, Renderer2 } from "@angular/core";

@Directive({
    selector: '[couponPinkColor]'
})

export class CouponPinkColorDirective implements OnInit {
    constructor(private el: ElementRef,
                private renderer: Renderer2){}

    ngOnInit(): void {
        /* with nativeElement */
        //this.el.nativeElement.style.color = "green";
        //this.el.nativeElement.style.fontWeight = "bold";

        /* with renderer => set style, ass class & add attribute*/
        this.renderer.setStyle(this.el.nativeElement, 'color', 'deeppink');
        this.renderer.setStyle(this.el.nativeElement, 'fontWeight', 'bold');
        this.renderer.addClass(this.el.nativeElement, 'couponUnderline');
        this.renderer.setAttribute(this.el.nativeElement, 'tabindex', '0');
    }

}