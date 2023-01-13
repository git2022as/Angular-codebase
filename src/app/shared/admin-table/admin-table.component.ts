import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-admin-table',
  templateUrl: './admin-table.component.html',
  styleUrls: ['./admin-table.component.scss']
})
export class AdminTableComponent implements OnInit, OnChanges {

  @Input() adminHeader = [];
  @Input() adminTableDataSet = [];
  @Input() adminFirstColumnVariable: any;
  @Input() adminSecondColumnVariable: any;
  @Output() deleteClickedEvent = new EventEmitter<any>();
  @Output() editClickedEvent = new EventEmitter<any>();
  _adminTableDataSet = [];
  searchItem: string = "";

  constructor() { }

  ngOnInit(): void {
    this._adminTableDataSet = this.adminTableDataSet;
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

}
