import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productDescription'
})
export class ProductDescriptionPipe implements PipeTransform {

  transform(value: string, strLength?: number): unknown {
    let len : number;
    if(!strLength)
      len = 100;

    let finalValue : string = "";
    if(value.length > 100)
      finalValue = `${value.substring(0,len)}...`;
    else
      finalValue = value;

    return finalValue;
  }

}
