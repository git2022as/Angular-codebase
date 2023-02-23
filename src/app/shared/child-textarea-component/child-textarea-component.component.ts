import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { reactiveChildInterface } from 'src/app/interface/project.interface';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-child-textarea-component',
  templateUrl: './child-textarea-component.component.html',
  styleUrls: ['./child-textarea-component.component.scss']
})
export class ChildTextareaComponentComponent {

  @Input() fGName : FormGroup;
  @Input() properties: reactiveChildInterface;

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
