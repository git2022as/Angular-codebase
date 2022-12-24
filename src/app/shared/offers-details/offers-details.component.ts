import { Component, OnInit, Input } from '@angular/core';
import { TooltipPosition } from '@angular/material/tooltip';

@Component({
  selector: 'app-offers-details',
  templateUrl: './offers-details.component.html',
  styleUrls: ['./offers-details.component.scss']
})

export class OffersDetailsComponent implements OnInit {

  @Input() tooltipPos: any = "above";
  @Input() offers: any;
  showOfferImage: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
