import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})

export class OffersComponent implements OnInit {

  offerDetails = [
    {
      "image": "bob-offers.jpg",
      "projector": "Bank of Baroda",
      "section": "banks",
      "sub_section": "credit card",
      "discounts": "10%",
      "minimum_order": "2000",
      "code": "BOBDEC22",
      "valid": "1-31 Dec"
    },
    {
      "image": "onecard-offers.jpg",
      "projector": "One Card",
      "section": "banks",
      "sub_section": "credit card",
      "discounts": "10%",
      "minimum_order": "1500",
      "code": "ONECARDDEC",
      "valid": "1-15 Dec"
    },
    {
      "image": "indusind-offers.jpg",
      "projector": "Indusind Bank",
      "section": "banks",
      "sub_section": "credit card & debit card",
      "discounts": "upto 500",
      "minimum_order": "2000",
      "code": "INDUS500",
      "valid": "1-15 Dec"
    },
    {
      "image": "digibank-offers.jpg",
      "projector": "Digi Bank",
      "section": "banks",
      "sub_section": "debit card",
      "discounts": "10% upto 400",
      "minimum_order": "1000",
      "code": "DBSDEC22",
      "valid": "1-31 Dec"
    },
    {
      "image": "federal-offers.jpg",
      "projector": "Federal Bank",
      "section": "banks",
      "sub_section": "debit card",
      "discounts": "15% upto 2000 on EMI",
      "minimum_order": "5000",
      "code": "NA",
      "valid": "1-31 Dec"
    },
    {
      "image": "payzapp-offers.jpg",
      "projector": "Payzapp",
      "section": "wallet",
      "sub_section": "NA",
      "discounts": "5% upto 50",
      "minimum_order": "1000",
      "code": "PAYZAPP5",
      "valid": "15-31 July"
    },
    {
      "image": "freecharge-offers.jpg",
      "projector": "Freecharge",
      "section": "wallet",
      "sub_section": "NA",
      "discounts": "100% cashback for first time user upto 200",
      "minimum_order": "NA",
      "code": "PAYZAPP5",
      "valid": "15-31 Dec"
    },
    {
      "image": "paytm-offers.jpg",
      "projector": "Paytm",
      "section": "wallet",
      "sub_section": "NA",
      "discounts": "10-100 cashback from Paytm UPI",
      "minimum_order": "NA",
      "code": "NA",
      "valid": "1 Nov-31 Dec"
    }
  ]

  constructor() { }

  ngOnInit(): void {
    console.log("offers module loaded")
  }

}
