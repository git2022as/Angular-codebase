import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  showBreakUp: boolean = false;
  cartValue: number;
  deliveryCharge: number;
  govtTaxPackageCharge: number;
  discountCharge: number;
  finalPayable: number;
  discountTooltip: string = "";

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.routeSubscribe();
  }

  routeSubscribe(): void{
    this.activatedRoute.queryParamMap.subscribe(x=>{
      this.cartValue = Number(x.get('cartValue'));
      this.deliveryCharge = Number(x.get('deliveryCharge'));
      this.govtTaxPackageCharge = Number(x.get('govtTaxPackageCharge'));
      this.discountCharge = Number(x.get('discountCharge'));
      this.finalPayable = Number(x.get('finalPayable'));
      this.discountTooltip = x.get('discountTooltip');
    });
  }

}
