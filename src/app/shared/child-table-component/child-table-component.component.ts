import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { tableInterface } from 'src/app/interface/project.interface';

@Component({
  selector: 'app-child-table-component',
  templateUrl: './child-table-component.component.html',
  styleUrls: ['./child-table-component.component.scss']
})
export class ChildTableComponentComponent implements OnInit {

  @Input() tableConfig: tableInterface;
  @Output() selectedItemEvent = new EventEmitter<any>();
  itemCheckContent: any = [];

  ngOnInit(): void{
    console.log(this.tableConfig);
    if(this.tableConfig.checkbox){
      //create itemCheckContent
      if(this.tableConfig.content && this.tableConfig.content.length > 0){
        this.tableConfig.content.forEach(each=>{
          this.itemCheckContent.push({checked: false});
        })
      }
    }
  }

  checkBoxParentClick(event): void{
    if(this.itemCheckContent && this.itemCheckContent.length >0){
      if(event.target.checked){
        this.itemCheckContent.forEach(each=>{
          each.checked = true;
        });
      }
      else{
        this.itemCheckContent.forEach(each=>{
          each.checked = false;
        });
      }
    }
    this.sendCheckedValuesToParent();
  }

  checkBoxClick(data,event,index): void{
    if(event.target.checked){
      this.itemCheckContent[index].checked = true;
    }
    else{
      this.itemCheckContent[index].checked = false;
    }
    this.sendCheckedValuesToParent();
  }

  sendCheckedValuesToParent(){
    let data = [];
    this.itemCheckContent.forEach((each: any, index: number)=>{
      if(each.checked){
        data.push(this.tableConfig.content[index]);
      }
    });
    this.selectedItemEvent.emit(data);
  }

}
