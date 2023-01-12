import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cartOrigin'
})
export class CartOriginPipe implements PipeTransform {

  transform(id: number, product: Array<any>): string {
    let dishOrigin: string = "";
    product.forEach(res =>{
      if(res.id == id){
        dishOrigin = res.dishOrigin;
      }
    });
    return dishOrigin;
  }

}
