import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cartDescription'
})
export class CartDescriptionPipe implements PipeTransform {

  transform(itemId: number, product: Array<any>): string {
    let desc: string = "";
    product.forEach(res =>{
      if(res.itemId == itemId){
        desc = res.description;
      }
    });
    return desc;
  }

}
