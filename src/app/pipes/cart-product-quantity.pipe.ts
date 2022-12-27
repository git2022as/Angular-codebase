import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cartProductQuantity'
})
export class CartProductQuantityPipe implements PipeTransform {

  transform(itemId: number, product: Array<any>): string {
    let pQuantity: string = "";
    product.forEach(res =>{
      if(res.itemId == itemId){
        pQuantity = res.productQuantity;
      }
    });
    return pQuantity;
  }

}
