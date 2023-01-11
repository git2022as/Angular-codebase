import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() totalNoOfPage : number = 0;
  @Input() currentPage: number = 0;
  perPageSelection: number = 5;
  perPageOptions = [5,10,15,20];

  constructor() { }

  ngOnInit(): void {
  }

}
