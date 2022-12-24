import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'quantityPipe',
  pure: true
})

export class QuantityPipe implements PipeTransform {

  transform(value: number, args?: string): string {
    if(value > 1){
      return `${value} pieces`;
    }
    else{
      return `${value} piece`;
    }
  }

}
