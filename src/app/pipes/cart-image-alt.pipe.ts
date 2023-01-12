import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cartImageAlt'
})
export class CartImageAltPipe implements PipeTransform {

  transform(id: number, product: Array<any>): string {
    let dishImageText: string = "";
    product.forEach(res =>{
      if(res.id == id){
        dishImageText = res.dishImageText;
      }
    });
    return dishImageText;
  }

}
