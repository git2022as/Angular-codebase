import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { reactiveChildInterface } from 'src/app/interface/project.interface';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-child-component',
  templateUrl: './child-component.component.html',
  styleUrls: ['./child-component.component.scss']
})
export class ChildComponentComponent implements OnInit {

  @Input() fGName : FormGroup;
  @Input() properties: reactiveChildInterface;
  @Input() fAName: string;
  @Input() fAIndex: number;

  constructor(private commonService: CommonService) {}

  ngOnInit(): void {
    //add controls & set any default value
    //This is when we pass FORMARRAY
    if(this.fAName){
      this.fGName.get(this.fAName)['controls'][this.fAIndex].addControl(this.properties.name, new FormControl(this.properties.value));
      //add validators
      this.commonService.addControls(this.fGName.get(this.fAName)['controls'][this.fAIndex], this.properties);
    }
    else {
      this.fGName.addControl(this.properties.name, new FormControl(this.properties.value));
      //add validators
      this.commonService.addControls(this.fGName, this.properties);
    }
  }

}
