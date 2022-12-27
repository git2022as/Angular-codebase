import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cartImage'
})
export class CartImagePipe implements PipeTransform {

  transform(itemId: number, product: Array<any>): string {
    let image: string = "";
    product.forEach(res =>{
      if(res.itemId == itemId){
        image = `assets/images/${res.image}`;
      }
    });
    return image;
  }

}
