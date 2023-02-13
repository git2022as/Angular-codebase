import { Component, OnInit, Input } from '@angular/core';
import { AppCacheService } from 'src/app/services/app.cache.service';

@Component({
  selector: 'app-no-items',
  templateUrl: './no-items.component.html',
  styleUrls: ['./no-items.component.scss']
})
export class NoItemsComponent implements OnInit {

  @Input() section : string = "cart";

  constructor(public appCacheService: AppCacheService) { }

  ngOnInit(): void {
  }

}
