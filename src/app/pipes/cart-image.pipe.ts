import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cartImage'
})
export class CartImagePipe implements PipeTransform {

  transform(id: number, product: Array<any>): string {
    let dishImage: string = "";
    product.forEach(res =>{
      if(res.id == id){
        dishImage = `assets/images/${res.dishImage}`;
      }
    });
    return dishImage;
  }

}
