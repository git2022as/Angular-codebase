import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cartOrigin'
})
export class CartOriginPipe implements PipeTransform {

  transform(itemId: number, product: Array<any>): string {
    let origin: string = "";
    product.forEach(res =>{
      if(res.itemId == itemId){
        origin = res.origin;
      }
    });
    return origin;
  }

}
