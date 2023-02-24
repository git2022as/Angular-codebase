import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-child-error-component',
  templateUrl: './child-error-component.component.html',
  styleUrls: ['./child-error-component.component.scss']
})
export class ChildErrorComponentComponent implements OnInit {

  @Input() fG: any;
  @Input() properties: any;

  constructor() {}

  ngOnInit(): void {
    console.log(this.mFormCntrl);
  }

  get mFormCntrl(){
    return this.fG.get(this.properties.name);//we are getting the formConrtolName
  }

  fetchError(key): string{
    return this.properties.errorLabel[0][key];
  }

}
