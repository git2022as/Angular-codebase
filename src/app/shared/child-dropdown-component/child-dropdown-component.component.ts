import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-child-dropdown-component',
  templateUrl: './child-dropdown-component.component.html',
  styleUrls: ['./child-dropdown-component.component.scss']
})
export class ChildDropdownComponentComponent implements OnInit {

  @Input() fGName : FormGroup;
  @Input() properties: any;
  @Output() dropdownValueEvent = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {
    if(this.properties.type == 'dropdown'){
      this.fGName.addControl(this.properties.name, new FormControl(this.properties.value, [Validators.required]));
      this.fGName.get(this.properties.name).setValue('');
    }
    this.subscribeChange();
  }

  subscribeChange(){
    this.fGName.get(this.properties.name).valueChanges.subscribe(res=>{
      console.log(res);
      this.dropdownValueEvent.emit(res);
    })
  }

}
