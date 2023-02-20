import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
    this.fGName.addControl(this.properties.name, new FormControl(this.properties.value, [Validators.required]));
  }

  get mFormCntrl(){
    return this.fGName.get(this.properties.name);//we are getting the formConrtolName
  }



}
