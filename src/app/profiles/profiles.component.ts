import { Component, OnInit, ViewContainerRef, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, NgForm } from '@angular/forms';
import { CommonService } from '../services/common.service';
import { city, state, errorMessages, staticValue, StaticMsg } from '../constants/constant';
import { ProfileService } from './profiles.service';
import { AppCacheService } from '../services/app.cache.service';
import { map } from 'rxjs/operators';
import { ShortMessageComponent } from '../shared/short-message/short-message.component';
import { Subscription } from 'rxjs';
import { ChangePasswordComponent } from '../shared/change-password/change-password.component';
import { ModalOptions, BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ChangeEmailComponent } from '../shared/change-email/change-email.component';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit, OnDestroy {

  profileForm: FormGroup;
  availableCities = city;
  availableStates = state;
  extraAddressFormCount: number = staticValue.extraAddressFormCount;
  editForm: boolean = false;
  buttonText: string = "Save";
  uid: string;
  uniqueID: string;
  profileData: any;
  profileFormReady: boolean = false;
  profileAddSubscription: Subscription | undefined;
  profileGetSubscription: Subscription | undefined;
  profileUpdateSubscription: Subscription | undefined;
  errorMessages = errorMessages;

  @ViewChild("shortContainer", { read: ViewContainerRef }) shortContainer: any = ViewContainerRef;

  constructor(private fb : FormBuilder, 
              public commonService: CommonService,
              private profileService: ProfileService,
              public appCacheService: AppCacheService,
              public bsModalRef: BsModalRef,
              private modalService: BsModalService) {}

  ngOnInit(): void {
    this.uid = this.appCacheService._UID;
    this.getProfiles();
  }

  getProfiles(): void{
    this.profileGetSubscription = this.profileService.getProfile(this.uid).pipe(map((res: any)=>{
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
      if(res && res.length>0){
        this.profileData = res;
        if(this.profileData){
          this.buttonText = "Update";
          this.editForm = true;
          this.uniqueID = this.profileData[0].id;
          this.populateProfile(this.profileData);
        }
      }
      else{
        this.populateProfile(this.profileData);
      }
    });
  }

  populateProfile(data: any): void{
    this.createProfileForm();
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
      name: [{value: '', disabled: this.editForm},[Validators.required, Validators.minLength(staticValue.profileNameMinLength), Validators.maxLength(staticValue.profileNameMaxLenght)]],
      phoneNumber: [{value: null, disabled: this.editForm },[Validators.required, Validators.minLength(staticValue.phoneNumberLength), Validators.maxLength(staticValue.phoneNumberLength)]],
      deliveryAddress: this.fb.group({
        street: [{value: '', disabled: this.editForm},[Validators.required, Validators.maxLength(staticValue.streetMaxLength)]],
        city: [{value: '', disabled: this.editForm},[Validators.required]],
        pincode: [{value: null, disabled: this.editForm},[Validators.required, Validators.minLength(staticValue.pincodeLength), Validators.maxLength(staticValue.pincodeLength)]],
        state: [{value: '', disabled: this.editForm},[Validators.required]]
      }),
      secondDeliveryAddress: this.fb.array([])
    });
    this.availableCities = this.availableCities.sort((a,b)=> a.localeCompare(b));
    this.availableStates = this.availableStates.sort((a,b)=>a.localeCompare(b));
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
      //pushing whole group or we can push single form control too
      this.fb.group({
        street: [{value: '', disabled: this.editForm},[Validators.required, Validators.maxLength(staticValue.streetMaxLength)]],
        city: [{value: '', disabled: this.editForm},[Validators.required]],
        pincode: [{value: null, disabled: this.editForm},[Validators.required, Validators.minLength(staticValue.pincodeLength), Validators.maxLength(staticValue.pincodeLength)]],
        state: [{value: '', disabled: this.editForm},[Validators.required]]
      })
    )
    this.extraAddressFormCount++;
  }

  resetProfileForm(): void{
    console.log(this.profileForm);
    this.profileForm.reset();
  }

  deleteAddress(i: number): void{
    this.secondDeliveryAddress.removeAt(i);
    this.extraAddressFormCount--;
    this.profileForm.markAsDirty();
  }

  addProfile(profileForm: FormGroup): void{
    if(this.buttonText == 'Save'){
      this.profileAddSubscription = this.profileService.addProfile(this.uid,profileForm.value).subscribe((res: any)=>{
        if(res){
          this.editForm = true;
          console.log("profile has been added " + res);
          const color = "green";
          const message = StaticMsg.profile_add_success;
          this.showShortMsg(message,color);
        }
      });
    }
    else{
      this.profileUpdateSubscription = this.profileService.updateProfile(this.uid,this.uniqueID,profileForm.value).subscribe((res: any)=>{
        if(res){
          this.editForm = true;
          console.log("profile has been updated " + res);
          const color = "green";
          const message = StaticMsg.profile_update_success;
          this.showShortMsg(message,color);
        }
      });
    }
  }

  showShortMsg(msg: string, color: string): void{
    const componentRef = this.shortContainer.createComponent(ShortMessageComponent);
    componentRef.instance.message = msg;
    componentRef.instance.color = color;
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

  makeFormEditable(): void{
    this.profileForm.enable();
  }

  changePassword(): void{
    const initialState: ModalOptions = {
      initialState: {
        title: this.appCacheService._content.changePassButton
      }
    };
    this.bsModalRef = this.modalService.show(ChangePasswordComponent, initialState);
    this.bsModalRef.content.changesPasswordSuccessEvent.subscribe((res: any) => {
      this.bsModalRef?.hide();
      const message = StaticMsg.password_update_success;
      const color = "green";
      this.showShortMsg(message, color);
    });
  }

  changeEmail(): void{
    const initialState: ModalOptions = {
      initialState: {
        title: this.appCacheService._content.changeEmailButton
      }
    };
    this.bsModalRef = this.modalService.show(ChangeEmailComponent, initialState);
    this.bsModalRef.content.changeEmailSuccessEvent.subscribe((res: any) => {
      this.bsModalRef?.hide();
      const message = StaticMsg.email_update_success;
      const color = "green";
      this.showShortMsg(message, color);
    });
  }

  ngOnDestroy(): void {
    this.profileAddSubscription?.unsubscribe();
    this.profileGetSubscription?.unsubscribe();
    this.profileUpdateSubscription?.unsubscribe();
  }

}
