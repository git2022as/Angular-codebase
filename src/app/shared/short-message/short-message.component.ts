import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-short-message',
  templateUrl: './short-message.component.html',
  styleUrls: ['./short-message.component.scss']
})
export class ShortMessageComponent implements OnInit {

  @Input() message: string = ""; 
  @Input() parent !: any;
  @Input() time: number = 5000;

  constructor() { }

  ngOnInit(): void {
    this.sendMessageAfterTime();
  }

  sendMessageAfterTime(){
    setTimeout(()=>{
      this.parent.callParentMethod();
    },this.time);
  }

}
