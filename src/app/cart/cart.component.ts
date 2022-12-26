import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ShortMessageComponent } from '../shared/short-message/short-message.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  @ViewChild("shortContainer", { read: ViewContainerRef }) shortContainer: any = ViewContainerRef;
  timeForMsg: number = 2000;
  cartDetails = [
    {
      "name": "Paneer Tikka Kebab",
      "origin": "Veg",
      "image": "paneer-tikka-small.png",
      "alt": "paneer-tikka",
      "description": "Paneer Tikka is an Indian dish made from chunks of paneer marinated in spices and grilled in a tandoor.",
      "quantity": 6,
      "price": 180,
      "addOn": "green chatni & meyonnaise"
    },
    {
      "name": "Paneer Hariyali Kebab",
      "origin": "Veg",
      "image": "paneer-hariyali-small.png",
      "alt": "paneer-hariyali",
      "description": "Hariyali Paneer Tikka is a delectable Indian appetizer made with cubes of soft paneer, crisp bell pepper, and onions marinated in cilantro, and mint, along with yogurt and spices.",
      "quantity": 6,
      "price": 200,
      "addOn": "green chatni & meyonnaise"
    },
    {
      "name": "Tandoori Aloo",
      "origin": "Veg",
      "image": "tandoori-aloo-small.png",
      "alt": "tandoori-aloo",
      "description": "Tandoori Aloo or Tandoori Aloo Tikka is one of our favorite starter dishes which we order often in restaurants.",
      "quantity": 8,
      "price": 200,
      "addOn": "green chatni & meyonnaise"
    },
    {
      "name": "Chicken Reshmi Kebab",
      "origin": "Non-Veg",
      "image": "chicken-reshmi-small.png",
      "alt": "chicken-reshmi",
      "description": "Reshmi is an Indian word that means 'silk'. This is an apt description for these silky-textured, delicious chicken kababs that are a traditional Mughlai dish prepared in India.",
      "quantity": 6,
      "price": 250,
      "addOn": "green & red chatni"
    },
    {
      "name": "Chicken Malai Kebab",
      "origin": "Non-Veg",
      "image": "chicken-malai-small.png",
      "alt": "chicken-malai",
      "description": "Chicken Malai refers to grilled supreme of chicken with ginger, garlic, green chilli, cream-cheese, coriander-stem and cardamom.",
      "quantity": 6,
      "price": 260,
      "addOn": "green & red chatni"
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

  showShortMsg(event: any): void{
    const componentRef = this.shortContainer.createComponent(ShortMessageComponent);
    componentRef.instance.message = event.message;
    componentRef.instance.time = this.timeForMsg;
    componentRef.instance.parent = this.getParent();
  }

  getParent(): any{
    return {
      callParentMethod: () => {
        this.removeShortMsg();
      }
    }
  }

  removeShortMsg(): void{
    this.shortContainer.clear();
  }

}
