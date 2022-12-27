import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cartImageAlt'
})
export class CartImageAltPipe implements PipeTransform {

  transform(itemId: number, product: Array<any>): string {
    let alt: string = "";
    product.forEach(res =>{
      if(res.itemId == itemId){
        alt = res.alt;
      }
    });
    return alt;
  }

}
