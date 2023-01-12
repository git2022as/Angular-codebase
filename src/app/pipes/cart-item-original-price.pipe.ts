import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cartItemOriginalPrice'
})
export class CartItemOriginalPricePipe implements PipeTransform {

  transform(id: number, product: Array<any>): number {
    let dishPrice: number = 0;
    product.forEach(res =>{
      if(res.id == id){
        dishPrice = res.dishPrice;
      }
    });
    return dishPrice;
  }

}
