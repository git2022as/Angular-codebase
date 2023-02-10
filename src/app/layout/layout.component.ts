import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppCacheService } from '../services/app.cache.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private appCacheService: AppCacheService) { }

  ngOnInit(): void {
    //get data from CONTENT API - RESOLVE
    this.appCacheService._content = this.activatedRoute.snapshot.data.content;
  }

}
