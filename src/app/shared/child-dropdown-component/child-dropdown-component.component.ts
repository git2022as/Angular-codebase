import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { reactiveChildInterface } from 'src/app/interface/project.interface';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-child-dropdown-component',
  templateUrl: './child-dropdown-component.component.html',
  styleUrls: ['./child-dropdown-component.component.scss']
})
export class ChildDropdownComponentComponent implements OnInit {

  @Input() fGName : FormGroup;
  @Input() properties: reactiveChildInterface;
  @Output() dropdownValueEvent = new EventEmitter<any>();

  constructor(private commonService: CommonService) {}

  ngOnInit(): void {
    this.fGName.addControl(this.properties.name, new FormControl(this.properties.value));
    this.fGName.get(this.properties.name).setValue('');
    this.commonService.addControls(this.fGName, this.properties);
    this.subscribeChange();
  }

  subscribeChange(){
    this.fGName.get(this.properties.name).valueChanges.subscribe(res=>{
      console.log(res);
      this.dropdownValueEvent.emit(res);
    })
  }

  get mFormCntrl(){
    return this.fGName.get(this.properties.name);//we are getting the formConrtolName
  }

}
