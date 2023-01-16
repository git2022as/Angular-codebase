import { Directive, ElementRef, HostListener, OnInit } from "@angular/core";

@Directive({
    selector: '[cardExpiry]'
})

export class CardExpiryDirective implements OnInit{

    constructor(private el: ElementRef) {}

    ngOnInit(): void {
        
    }

    @HostListener('input', ['$event'])
    onInputChange($event): void{
        const value = this.el.nativeElement.value;
        if(value.length == 2){
            this.el.nativeElement.value = `${value}/`;
        }
        else{
            let lastChar = value.charAt((value.length-1));
            lastChar = lastChar.replace(/[^0-9]*/g, '');
            this.el.nativeElement.value = value.substring(0,(value.length-1)) + lastChar;
        }

        if(value != this.el.nativeElement.value){
            $event.stopPropagation();
        }
    }

    @HostListener('keydown', ['$event'])
    onBackspaceDelete(e: KeyboardEvent){
        const value = this.el.nativeElement.value;
        const length = value.length;
        const lastChar = value.charAt(length-1);
        if(e.key == 'Backspace'){
            if(lastChar == '/'){
                this.el.nativeElement.value = value.substring(0,(length-1));
            }
        }
    }

}