import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'individualCart'
})
export class IndividualCartPipe implements PipeTransform {

  transform(value: number, quantity: number = 1, cheeseYes: boolean = false, olivOilYes: boolean = false): number {
    const cheeseMoney = 20;
    const olivOilMoney = 30;
    let finalValue = 0;
    if(value)
      finalValue = value * quantity;
    else  
      finalValue = value

    if(cheeseYes)
      finalValue = finalValue + cheeseMoney;

    if(olivOilYes)
      finalValue = finalValue + olivOilMoney;

    return finalValue;
  }

}
