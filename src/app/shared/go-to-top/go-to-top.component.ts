import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-go-to-top',
  templateUrl: './go-to-top.component.html',
  styleUrls: ['./go-to-top.component.scss']
})
export class GoToTopComponent implements OnInit {

  @Output() clickedArrowEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  clickedArrow(): any{
    this.clickedArrowEvent.emit(true);
  }

}
