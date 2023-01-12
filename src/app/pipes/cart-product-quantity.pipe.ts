import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cartProductQuantity'
})
export class CartProductQuantityPipe implements PipeTransform {

  transform(id: number, product: Array<any>): string {
    let dishQuantity: string = "";
    product.forEach(res =>{
      if(res.id == id){
        dishQuantity = res.dishQuantity;
      }
    });
    return dishQuantity;
  }

}
