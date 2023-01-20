import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { CommonService } from '../services/common.service';
import { city, state } from '../constants/constant';
import { count } from 'rxjs';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit {

  profileForm: FormGroup;
  availableCities = city;
  availableStates = state;
  extraAddressFormCount: number = 0;

  constructor(private fb : FormBuilder, public commonService: CommonService) {}

  ngOnInit(): void {
    this.createProfileForm();
  }

  createProfileForm(): void{
    this.profileForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]],
      phoneNumber: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      deliveryAddress: this.fb.group({
        street: ['', [Validators.required, Validators.maxLength(100)]],
        city: ['',[Validators.required]],
        pincode: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
        state: ['',[Validators.required]]
      }),
      secondDeliveryAddress: this.fb.array([])
    });
  }

  //getter method to get from.controls
  get proForm(): any{
    return this.profileForm.controls;
  }

  get secondDeliveryAddress(): any{
    return this.profileForm.get('secondDeliveryAddress') as FormArray;
  }

  setControlsValueToBlank(control: string, value: string, formname: FormGroup): void{
    this.commonService.setControlsValueToBlank(control, value, formname);
  }

  addMoreAddress(): void{
    this.secondDeliveryAddress.push(
      this.fb.group({
        street: ['', [Validators.required, Validators.maxLength(100)]],
        city: ['',[Validators.required]],
        pincode: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
        state: ['',[Validators.required]]
      })
    )
    this.extraAddressFormCount++;
  }

  resetprofileForm(): void{
    console.log(this.profileForm);
    this.profileForm.reset();
  }

  deleteAddress(i: number): void{
    this.secondDeliveryAddress.removeAt(i);
    this.extraAddressFormCount--;
  }

}
