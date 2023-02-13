import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import { AppCacheService } from 'src/app/services/app.cache.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchForm: FormGroup;
  @Output() searchTextEvent = new EventEmitter<any>();

  constructor(private fb: FormBuilder,
              public appCacheService: AppCacheService) { }

  ngOnInit(): void {
    this.createSearchForm();
    this.valueChagesSubscribe();
  }

  createSearchForm(): void{
    this.searchForm = this.fb.group({
      searchText: ['']
    })
  }

  setValue(searchText: any): void{
    this.searchForm.patchValue({
      searchText: ''
    })
  }

  valueChagesSubscribe(): void{
    this.searchForm.get('searchText').valueChanges.subscribe((selectedValue: any)=>{
      console.log("selected value " + selectedValue);
      console.log("old value " + JSON.stringify(this.searchForm.value));
      setTimeout(()=>{//use setTimeout to get the update value on FORMGGROUP
        console.log("updated value " + JSON.stringify(this.searchForm.value));
      });
      this.searchTextEvent.emit({searchText: selectedValue});
    });
  }

}
