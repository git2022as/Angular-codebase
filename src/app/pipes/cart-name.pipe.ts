import { Pipe, PipeTransform } from '@angular/core';
import { ProductOverviewComponent } from '../shared/product-overview/product-overview.component';

@Pipe({
  name: 'cartName'
})
export class CartNamePipe implements PipeTransform {

  transform(itemId: number, product: Array<any>): string {
    let name: string = "";
    product.forEach(res =>{
      if(res.itemId == itemId){
        name = res.name;
      }
    });
    return name;
  }

}
