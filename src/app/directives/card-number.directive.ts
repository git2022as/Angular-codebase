import { Directive, OnInit, Renderer2, HostListener, ElementRef } from "@angular/core";

@Directive({
    selector: '[cardNumber]'
})

export class CardNumberDirective implements OnInit {

    constructor(private renderer: Renderer2,
                private el: ElementRef) {}

    ngOnInit(): void {
        
    }

    @HostListener ('input', ['$event'])
    onInput($event) {
        this.createCardNumberFormat($event);
    }

    @HostListener('keyup', ['$event'])
    onBackSpace(e: KeyboardEvent) {
        this.deleteCase(e);
    }

    createCardNumberFormat(event:any): void{
        const value = this.el.nativeElement.value;
        if(value.length == 4 || value.length == 9 || value.length == 14){
            this.el.nativeElement.value = `${this.el.nativeElement.value} `;
        }
        else{
            this.el.nativeElement.value = value.replace(/[^0-9 ]*/g, '');
        }

        if(value !== this.el.nativeElement.value) {
            event.stopPropagation();
        }
    }

    deleteCase(event: any): void{
        const value = this.el.nativeElement.value;
        const length = value.length;
        const lastChar = value.charAt(length-1);
        if(event.key == 'Backspace'){
            if(lastChar == " "){
                this.el.nativeElement.value = value.substring(0,(length-2));
            }
        }
    }


}
