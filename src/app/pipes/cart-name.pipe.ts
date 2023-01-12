import { Pipe, PipeTransform } from '@angular/core';
import { ProductOverviewComponent } from '../shared/product-overview/product-overview.component';

@Pipe({
  name: 'cartName'
})
export class CartNamePipe implements PipeTransform {

  transform(id: number, product: Array<any>): string {
    let dishName: string = "";
    product.forEach(res =>{
      if(res.id == id){
        dishName = res.dishName;
      }
    });
    return dishName;
  }

}
