import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { customValidator } from 'src/app/validator/custom.validator';

@Component({
  selector: 'app-child-component',
  templateUrl: './child-component.component.html',
  styleUrls: ['./child-component.component.scss']
})
export class ChildComponentComponent implements OnInit {

  @Input() fGName : FormGroup;
  @Input() properties: any;

  constructor() {}

  ngOnInit(): void {
    this.properties.required ? this.fGName.addControl(this.properties.name, new FormControl(this.properties.value, [Validators.required])) : this.fGName.addControl(this.properties.name, new FormControl(this.properties.value));
    this.addCustomValidator(this.fGName, this.properties);
  }

  addCustomValidator(formName?: any, details?: any): void{
    if(details.customValidator?.nominalValidation){
      formName.get(details.name).addValidators(customValidator.nominalValidation);
    }
  }

  get mFormCntrl(){
    return this.fGName.get(this.properties.name);//we are getting the formConrtolName
  }



}
