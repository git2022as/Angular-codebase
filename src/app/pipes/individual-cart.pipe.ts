import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'individualCart'
})
export class IndividualCartPipe implements PipeTransform {

  transform(itemId: number, product: Array<any>, quantity?: number, cheeseYes?: boolean, olivOilYes?: boolean): number {
    const cheeseMoney = 20;
    const olivOilMoney = 30;
    let finalValue = 0;
    //if quantity is not given, set to 1
    if(!quantity)
      quantity = 1;
    
    //find each ttem's price
    let price: number = 0;
    product.forEach(res =>{
      if(res.itemId == itemId){
        price = res.price;
      }
    });

    if(price > 0)
      finalValue = price * quantity;

    if(cheeseYes)
      finalValue = finalValue + cheeseMoney;

    if(olivOilYes)
      finalValue = finalValue + olivOilMoney;

    return finalValue;
  }

}
