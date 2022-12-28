import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cartItemOriginalPrice'
})
export class CartItemOriginalPricePipe implements PipeTransform {

  transform(itemId: number, product: Array<any>): number {
    let originalPrice: number = 0;
    product.forEach(res =>{
      if(res.itemId == itemId){
        originalPrice = res.price;
      }
    });
    return originalPrice;
  }

}
