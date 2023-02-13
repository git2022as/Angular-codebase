import { Component, OnInit } from '@angular/core';
import { AppCacheService } from 'src/app/services/app.cache.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  constructor(public appCacheService: AppCacheService) { }

  ngOnInit(): void {
  }

}
