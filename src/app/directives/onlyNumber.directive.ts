import { Directive, ElementRef, HostListener, Renderer2 } from "@angular/core";

@Directive({
    selector: '[onlyNumber]'
})

export class OnlyNumberDirective {

    constructor(private el : ElementRef,
                private renderer: Renderer2){}

    @HostListener('keydown', ['$event'])
    onKeyDown(e: KeyboardEvent){
        if(e.key == "1" || e.key == "2" || e.key == "3" || e.key == "4" || e.key == "5" || e.key == "6" || e.key == "7" || e.key == "8" || e.key == "9" || e.key == "0"){
            return;
        }
        else if(e.key == "Backspace" || e.key == "ArrowLeft" || e.key == "ArrowRight" || e.key == "Delete" || e.key == "ArrowUp" || e.key == "ArrowDown" || (e.ctrlKey && e.keyCode == 65) || (e.ctrlKey && e.keyCode == 67) || (e.ctrlKey && e.keyCode == 86) || (e.ctrlKey && e.keyCode == 88)){
            return;
        }
        else{
            e.preventDefault();
        }
    }

}