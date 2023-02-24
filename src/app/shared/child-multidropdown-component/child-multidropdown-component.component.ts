import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown/multiselect.model';
import { multiTableInterface } from 'src/app/interface/project.interface';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-child-multidropdown-component',
  templateUrl: './child-multidropdown-component.component.html',
  styleUrls: ['./child-multidropdown-component.component.scss']
})
export class ChildMultidropdownComponentComponent implements OnInit {

  @Input() fGName: FormGroup
  @Input() properties: multiTableInterface;
  @Input() dropdownSettings: IDropdownSettings = {};
  @Output() multiDropdownEvent = new EventEmitter<any>();
  
  constructor(private commonService: CommonService) {}

  ngOnInit(): void {
    //add controls & set any default value
    this.fGName.addControl(this.properties.name, new FormControl(this.properties.value));
    //add validators
    this.commonService.addControls(this.fGName, this.properties);
    this.subscribeChange();
  }

  subscribeChange(){
    this.fGName.get(this.properties.name).valueChanges.subscribe(res=>{
      console.log(res);
      this.multiDropdownEvent.emit(res);
    })
  }

}
