import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl  } from '@angular/forms';
import { reactiveChildInterface } from 'src/app/interface/project.interface';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-child-datepicker-component',
  templateUrl: './child-datepicker-component.component.html',
  styleUrls: ['./child-datepicker-component.component.scss']
})
export class ChildDatepickerComponentComponent implements OnInit {

  @Input() fGName : FormGroup;
  @Input() properties: reactiveChildInterface;
  @Input() disabledPreviousDate: string = '';//send the date in the 'YYYY-MM-DD' format
  @Input() disableFutureDate: string = '';//send the date in the 'YYYY-MM-DD' format
    
  constructor(private commonService: CommonService) {}

  ngOnInit(): void {
    //add controls & set any default value
    this.fGName.addControl(this.properties.name, new FormControl(this.properties.value));
    //add validators
    this.commonService.addControls(this.fGName, this.properties);
  }

  get mFormCntrl(){
    return this.fGName.get(this.properties.name);//we are getting the formConrtolName
  }

}


