import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { StaticMsg } from 'src/app/constants/constant';
import { CommonService } from 'src/app/services/common.service';
import { AppCacheService } from 'src/app/services/app.cache.service';

@Component({
  selector: 'app-admin-table',
  templateUrl: './admin-table.component.html',
  styleUrls: ['./admin-table.component.scss']
})
export class AdminTableComponent implements OnInit, OnChanges {

  @Input() adminHeader = [];
  @Input() filterDataText: string = "";
  @Input() adminTableDataSet = [];
  @Input() adminFirstColumnVariable: any;
  @Input() adminSecondColumnVariable: any;
  @Output() deleteClickedEvent = new EventEmitter<any>();
  @Output() editClickedEvent = new EventEmitter<any>();
  @Output() tableSortEvent = new EventEmitter<any>();

  _adminTableDataSet = [];
  _filterDataText: string = "";
  tableHeaderClicked: number = 0;
  tableHeaderClickedPattern: boolean = true;//ascending
  staticMsg = StaticMsg;

  constructor(public commonService: CommonService,
              public appCacheService: AppCacheService) { }

  ngOnInit(): void {
    this._adminTableDataSet = this.adminTableDataSet;
    this._filterDataText = this.filterDataText;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit();
  }

  deleteItem(each): void{
    this.deleteClickedEvent.emit(each);
  }

  editItem(each): void{
    this.editClickedEvent.emit(each);
  }

  toggleSort(i): void{
    if(i<2){
      if(this.tableHeaderClicked != i){
        this.tableHeaderClickedPattern = true;
        this.tableHeaderClicked = i;
      }
      else{
        this.tableHeaderClickedPattern = !this.tableHeaderClickedPattern;
      }
      
      let headerName;
      if(i == 0){
        headerName = this.adminFirstColumnVariable;
      }
      else{
        headerName = this.adminSecondColumnVariable;
      }
      this.tableSortEvent.emit({headerName: headerName,type: this.tableHeaderClickedPattern});
    }
  }

}
