import { Component, Input, OnInit } from '@angular/core';
import { tableInterface } from 'src/app/interface/project.interface';

@Component({
  selector: 'app-child-table-component',
  templateUrl: './child-table-component.component.html',
  styleUrls: ['./child-table-component.component.scss']
})
export class ChildTableComponentComponent implements OnInit {

  @Input() tableConfig: tableInterface;

  ngOnInit(){
    console.log(this.tableConfig);
  }

}
