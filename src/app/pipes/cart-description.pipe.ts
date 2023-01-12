import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cartDescription'
})
export class CartDescriptionPipe implements PipeTransform {

  transform(id: number, product: Array<any>): string {
    let dishDesc: string = "";
    product.forEach(res =>{
      if(res.id == id){
        dishDesc = res.dishDesc;
      }
    });
    return dishDesc;
  }

}
