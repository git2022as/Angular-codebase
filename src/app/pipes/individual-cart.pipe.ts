import { Pipe, PipeTransform } from '@angular/core';
import { cartExtraItems } from '../model/model';

@Pipe({
  name: 'individualCart'
})
export class IndividualCartPipe implements PipeTransform {

  transform(cart: any, product: Array<any>): number {
    let finalValue = 0;
    //find each ttem's price
    let price: number = 0;
    product.forEach(res =>{
      if(res.itemId == cart.itemId){
        price = res.price;
      }
    });

    if(price > 0)
      finalValue = price * cart.quantity;

    if(cart.addOn && cart.addOn.length > 0){
      cart.addOn.forEach(each=>{
        if(each.value){
          finalValue = finalValue + each.extraPrice;
        }
      })
    }

    return finalValue;
  }

}
