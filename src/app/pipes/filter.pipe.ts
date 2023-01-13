import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(item: Array<any>, search: string): Array<any> {

    if(!search)
      return item;
    if(!item)
      return [];
    
    return item.filter((x)=>{
      for(let key in x){
        if(typeof x[key] == 'object'){
          for(let key1 in x[key]){
            if(String(x[key][key1]).toLowerCase().includes(search.toLowerCase())){
              return x;
            }
          }
        }
        else{
          if(String(x[key]).toLowerCase().includes(search.toLowerCase())){
            return x;
          }
        }   
      }
    });

  }

}
