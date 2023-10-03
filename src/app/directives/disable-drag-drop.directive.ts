import {Directive, ElementRef,HostListener,Renderer2} from '@angular/core';

@Directive({
    selector: '[disableDragDrop]'
})

export class DisableDragDropDirective{
    constructor(el : ElementRef, renderer: Renderer2){
        //el.nativeElement.style.background = 'yellow'

        const events = 'dragover drop dragenter'
        events.split(' ').forEach(e =>
                renderer.listen(el.nativeElement,e, (event) => {
                    event.preventDefault();
                })
            );
    }

    @HostListener('dragover', ['$event']) blockDragover(e: KeyboardEvent){
        console.log('DragOver event called');
        e.preventDefault();
    }
    @HostListener('drop', ['$event']) blockDrop(e: KeyboardEvent){
        console.log('Drop event called');
        e.preventDefault();
    }
    @HostListener('dragenter', ['$event']) blockDragenter(e: KeyboardEvent){
        console.log('Dragenter event called');
        e.preventDefault();
    }

}