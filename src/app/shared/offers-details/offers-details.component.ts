import { Component, OnInit, Input } from '@angular/core';
import { AppCacheService } from 'src/app/services/app.cache.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offers-details',
  templateUrl: './offers-details.component.html',
  styleUrls: ['./offers-details.component.scss']
})

export class OffersDetailsComponent implements OnInit {

  @Input() cartValue: number = null;
  @Input() offer: any;
  showOfferImage: boolean = true;

  constructor(public appCacheService: AppCacheService,
              private router: Router) { }

  ngOnInit(): void {}

  checkCartReq(cartValue, minimumCartValue): boolean{
    const minimum = Number(minimumCartValue);
    return true ? minimum > cartValue : false;
  }

  appliedOffer(offer: any): void{
    this.appCacheService._appliedOffer = offer;
    this.router.navigate(['layout/payment']);
  }

}
