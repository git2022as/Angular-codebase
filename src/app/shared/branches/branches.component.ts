import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.scss']
})
export class BranchesComponent implements OnInit {

  @Input() branch : any;
  @Output() callOptionClicked = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  openCallDialog(branch: any): void {
    this.callOptionClicked.emit(branch);
  }

}
