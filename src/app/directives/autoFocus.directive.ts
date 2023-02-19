import { Directive, ElementRef,OnInit,Renderer2 } from "@angular/core";

@Directive({
    selector: '[autoFocus]'
})

export class AutoFocusDirective implements OnInit {

    constructor(private el: ElementRef,
                private renderer: Renderer2) {}

    ngOnInit(){
        this.el.nativeElement.focus();
        this.el.nativeElement.blur();
    }

}