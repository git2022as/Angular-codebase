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
  /*  'YYYY-MM-DD' means, a specific date to disable prior dates
      TRUE means, will take current date as the starting date
      FALSE means, will ignore this validation
      by default value is TRUE
  */
  @Input() disabledPreviousDate: string | boolean = true;
  @Input() disableFutureDate: string = '';//send the date in the 'YYYY-MM-DD' format

  _disabledPreviousDate: string = '';
    
  constructor(private commonService: CommonService) {}

  ngOnInit(): void {
    //add controls & set any default value
    this.fGName.addControl(this.properties.name, new FormControl(this.properties.value));
    this.checkPreviousDate();
    //add validators
    this.commonService.addControls(this.fGName, this.properties);
  }

  checkPreviousDate(): void{
    if(this.disabledPreviousDate == true){
      this._disabledPreviousDate = this.checkTodayDate();
    }
    else if(this.disabledPreviousDate == false){
      this._disabledPreviousDate = '';
    }
    else{
      this._disabledPreviousDate = this.disabledPreviousDate;
    }
  }

  checkTodayDate(): string{
    let dateFomrat = "";
    const date = new Date();
    const year = date.getFullYear().toString();
    const dt = date.getDate().toString();
    let month = (date.getMonth() + 1).toString();
    if(month.length == 1)
      month = '0' + month;
    return dateFomrat = `${year}-${month}-${dt}`;
  }

}


