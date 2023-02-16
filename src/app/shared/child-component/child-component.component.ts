import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-child-component',
  templateUrl: './child-component.component.html',
  styleUrls: ['./child-component.component.scss']
})
export class ChildComponentComponent implements OnInit {

  @Input() formGroupName : FormGroup;
  @Input() cformControlName: string;
  @Input() cPlaceholder: string;
  @Input() cType: string;
  @Input() color: string;

  constructor() {}

  ngOnInit(): void {
    
  }

}
