import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, NgForm } from '@angular/forms';
import { CommonService } from '../services/common.service';
import { city, state } from '../constants/constant';
import { ProfileService } from './profiles.service';
import { AppCacheService } from '../services/app.cache.service';
import { map } from 'rxjs/operators';
import { profileInterface } from '../interface/project.interface';

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
  editForm: boolean = false;
  buttonText: string = "Save";
  uid: string;
  profileData: any;
  profileFormReady: boolean = false;

  constructor(private fb : FormBuilder, 
              public commonService: CommonService,
              private profileService: ProfileService,
              private appCacheService: AppCacheService) {}

  ngOnInit(): void {
    this.createProfileForm();
    this.uid = this.appCacheService._UID;
    this.getProfiles();
  }

  getProfiles(): void{
    this.profileService.getProfile(this.uid).pipe(map((res: any)=>{
      let profiles = [];
      if(res){
        for(let key in res){
          if(res.hasOwnProperty(key)){
            profiles.push({...res[key], id: key});
          }
        }
      }
      return profiles;
    })).subscribe((res: any)=>{
      if(res){
        this.profileData = res;
        if(this.profileData){
          this.buttonText = "Update";
          this.populateProfile(this.profileData);
        }
      }
    });
  }

  populateProfile(data: any): void{
    if(this.profileFormReady){
      this.profileForm.patchValue({
        name: data[0].name,
        phoneNumber: data[0].phoneNumber,
        deliveryAddress: {
          city: data[0].deliveryAddress.city,
          pincode: data[0].deliveryAddress.pincode,
          state: data[0].deliveryAddress.state,
          street: data[0].deliveryAddress.street
        }
      });
      this.checkAdditionAddress(data);
    }
  }

  checkAdditionAddress(data: any): void{
    console.log(data);
    const secondData = data[0].secondDeliveryAddress;
    //create secondAddress form
    if(secondData && secondData.length > 0){
      for(let i = 0; i<secondData.length; i++){
        this.addMoreAddress();
      }
    }
    //update data
    for(let i = 0; i<secondData.length; i++){
      this.secondDeliveryAddress.controls[i].patchValue({
        city: data[0].secondDeliveryAddress[i].city,
        pincode: data[0].secondDeliveryAddress[i].pincode,
        state: data[0].secondDeliveryAddress[i].state,
        street: data[0].secondDeliveryAddress[i].street
      });
    }
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
    this.profileFormReady = true;
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

  addProfile(profileForm: FormGroup): void{
    if(this.editForm){
      this.profileService.addProfile(this.uid,profileForm.value).subscribe((res: any)=>{
        if(res){
          console.log("profile has been added " + res);
          //call update profile API & make the form non-editable
        }
      })
    }
  }

}
