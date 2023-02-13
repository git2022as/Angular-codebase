import { Component, OnInit } from '@angular/core';
import { AppCacheService } from '../services/app.cache.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(public appCacheService: AppCacheService) { }

  ngOnInit(): void {
  }

}
