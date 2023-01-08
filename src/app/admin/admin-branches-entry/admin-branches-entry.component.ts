import { Component, OnInit, OnDestroy, ViewContainerRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { map, Subscription } from 'rxjs';
import { AdminService } from '../admin.service';
import { ShortMessageComponent } from 'src/app/shared/short-message/short-message.component';

@Component({
  selector: 'app-admin-branches-entry',
  templateUrl: './admin-branches-entry.component.html',
  styleUrls: ['./admin-branches-entry.component.scss']
})
export class AdminBranchesEntryComponent implements OnInit, OnDestroy {

  branchLocation: string;
  locationImage: string;
  locationContact: number = null;
  locatiomTiming: string;
  branchPin: number = null;
  addBranchesSubscriptiton: Subscription | undefined;
  branches: Array<any>;
  @ViewChild("shortContainer", { read: ViewContainerRef }) shortContainer: any = ViewContainerRef;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getBranches();
  }

  getBranches(){
    this.adminService.getBranches().pipe(map((data: any)=>{
      let products = [];
      for(let key in data){
        if(data.hasOwnProperty(key))
          products.push({...data[key], id: key});
      }
      return products;
    })).subscribe(((res: any)=>{
      this.branches = res;
    }))
  }

  ngOnDestroy(): void {
    this.addBranchesSubscriptiton?.unsubscribe();
  }

  checkDuplicate(value,arr): boolean{
    let dup = false;
    arr.forEach((x)=>{if(x.branchPin == value)
      {dup = true;}
    });
    return dup;
  }

  branchesFormSubmit(branchesForm: NgForm): void{
    if(!this.checkDuplicate(branchesForm.value.branchPin,this.branches)){
      console.log(branchesForm.value);
      this.addBranchesSubscriptiton = this.adminService.addBranches(branchesForm.value).subscribe((res: any)=>{
        this.getBranches();
        const msg = "branch has been added";
        const color = 'green';
        this.showShortMsg(msg,color);
        this.branchesFormReset(branchesForm);
        document.getElementById('top').scrollIntoView({behavior: 'smooth'});
      });
    }
    else{
      //Duplicate scene
      this.showShortMsg('Duplicate branch, please add a new branch.','red');
    }
  }

  branchesFormReset(branchesForm: NgForm): void{
    branchesForm.resetForm();
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

}
