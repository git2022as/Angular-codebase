import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { staticValue } from 'src/app/constants/constant';
import { outputAst } from '@angular/compiler';
import { AppCacheService } from 'src/app/services/app.cache.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})

export class PaginationComponent implements OnInit, OnChanges {

  @Input() currentDataSet: Array<any>;
  totalNoOfPage : number = staticValue.totalNoOfPage;
  currentPage: number = staticValue.currentPage;
  perPageSelection: number = staticValue.paginationPerPageConstant;
  @Output() perPageSelectionChangedEvent = new EventEmitter<any>();
  @Output() paginationButtonChangedEvent = new EventEmitter<any>();
  paginationButton = {
    first: false,
    previous: false,
    next: false,
    last: false
  };

  perPageOptions = staticValue.perPageOptions;

  constructor(private commonService: CommonService,
              public appCacheService: AppCacheService) { }

  ngOnInit(): void {
    this.pageCalculation();
    this.pageButtonCalculation();
  }

  //it is called on page load or when dish array dataset changes
  //it starts with first page always
  pageCalculation(): void{
    this.totalNoOfPage = this.commonService.totalNoOfPage(this.currentDataSet, this.perPageSelection);
  }

  pageButtonCalculation(): void{
    this.paginationButton = this.commonService.getPaginationButtonStatus(this.totalNoOfPage, this.currentPage);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.pageCalculation();
    this.pageButtonCalculation();
  }

  goToFirst(): void{
    this.currentPage = 1;
    this.pageButtonCalculation();
    this.paginationButtonChangedEvent.emit({currentPage: this.currentPage, perPageSelection: this.perPageSelection});
  }

  goToPrevious(): void{
    this.currentPage --;
    this.pageButtonCalculation();
    this.paginationButtonChangedEvent.emit({currentPage: this.currentPage, perPageSelection: this.perPageSelection});
  }

  goToNext(): void{
    this.currentPage ++;
    this.pageButtonCalculation();
    this.paginationButtonChangedEvent.emit({currentPage: this.currentPage, perPageSelection: this.perPageSelection});
  }

  goToLast(): void{
    this.currentPage = this.totalNoOfPage;
    this.pageButtonCalculation();
    this.paginationButtonChangedEvent.emit({currentPage: this.currentPage, perPageSelection: this.perPageSelection});
  }

  perSelectionChange(event): void{
    this.pageCalculation();
    this.currentPage = 1;
    console.log(event.value);
    this.perPageSelection = event.value;
    this.pageButtonCalculation();
    this.perPageSelectionChangedEvent.emit(event.value);
  }

}
