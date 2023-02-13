import { Component, OnInit } from '@angular/core';
import { StaticMsg, errorMessages } from 'src/app/constants/constant';
import { AppCacheService } from 'src/app/services/app.cache.service';

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
  errorMessages = errorMessages;

  constructor(public appCacheService: AppCacheService) { }

  ngOnInit(): void {
  }

  check(pincode: number): void{
    //call pincode check API
    this.pincodeChecked = true;
    this.pincodeSuccess = true;
    this.pinMessage = StaticMsg.pin_available_success;
  }

}
