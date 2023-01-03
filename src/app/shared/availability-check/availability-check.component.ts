import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-availability-check',
  templateUrl: './availability-check.component.html',
  styleUrls: ['./availability-check.component.scss']
})
export class AvailabilityCheckComponent implements OnInit {

  pincode: number = null;
  pincodeChecked: boolean = false;
  pinMessage: string = "";
  pincodeSuccess: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  check(pincode: number): void{
    //call pincode check API
    this.pincodeChecked = true;
    this.pincodeSuccess = true;
    this.pinMessage = "Delivery is available to this location";
  }

}
