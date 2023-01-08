import { Component, OnInit, AfterViewInit } from '@angular/core';
import { combineLatest, from, fromEvent, interval, Observable, of, forkJoin } from 'rxjs';
import { catchError, delay, filter, map, retry, take, takeUntil } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { Subscription } from 'rxjs'
import { formatCurrency } from '@angular/common';

@Component({
  selector: 'app-practice-observable-rxjs',
  templateUrl: './practice-observable-rxjs.component.html',
  styleUrls: ['./practice-observable-rxjs.component.scss']
})
export class PracticeObservableRxjsComponent implements OnInit, AfterViewInit {

  constructor() { }

  test = new Observable((res: any)=>{
    setTimeout(()=>{
      res.next("Send My Greetings");
    },2000);
  });

  testPromise = new Promise((resolve,reject)=>{
    setTimeout(()=>{
      //write a succesfull condition
      resolve("send promise data");
    },5000)
  });

  testError = new Observable((observer)=>{
    setTimeout(()=>{observer.next(1)},1000);
    setTimeout(()=>{observer.next(2)},2000);
    setTimeout(()=>{observer.next(3)},3000);
    setTimeout(()=>{observer.error(new Error('Error Occured'))},3000);
    setTimeout(()=>{observer.next(4)},4000);
    setTimeout(()=>{observer.next(5)},5000);
  });

  testComplete = new Observable((x)=>{
    setTimeout(()=>{x.next(1)},1000);
    setTimeout(()=>{x.next(2)},2000);
    setTimeout(()=>{x.complete()},3000);
    setTimeout(()=>{x.next(4)},4000);
    setTimeout(()=>{x.next(5)},5000);
  });

  //observable OF operator
  arr1 = [1,2,3,4,5];
  arr2 = ["Hi","I am", "Avishek"];
  testOf = of(this.arr1,this.arr2);

  //observable FROM operator => here we can pass any iterable (string or array)
  //it can only take a single iterable argument. Also we can pass a promise which will be converted to observable
  arrPromise = new Promise((resolve,reject)=>{
    resolve("send the successful value");
  })
  testFrom = from(this.arrPromise);//here converting the promise to an observable

  //Observable Operators
  //operators are functions that take an observable as input & send modified observable as an output

  //Observable AJAX operators
  testAjax = ajax('https://api.github.com/users?per_page=2'); //url

  //observable INTERVAL operators => emits value on a certain time interval
  testInterval = interval(1000);

  /********************************* OPERATORS (MAP, FILTER, TAKE, TAKEUNTIL, DELAY, RETRY, CATCHERROR, FORKJOIN, COMBINELATEST)*************************/
  //Remaining MERGEMAP & SWITCHMAP => they are with OUTER & INNER observable
  //MAP to trasnform data => returns an observable
  arr3 = [1,2,3,4,5,6,7,8,9,10];
  testMap = from(this.arr3);

  //FILTER to transform data => conditional basis
  arr4 = [10,20,30,40,50,60,70,80,90,100];
  testFilter = from(this.arr3);

  //TAKE to trasnform the count menas first count values & return those as an observable
  arr5 = [10,20,30,40,50,60,70,80,90,100];
  testTake = from(this.arr5);

  //TAKEUNTIL to stop emitting value once one inner observable completes
  buttonEvent !: Observable<Event> 
  //create an click event with FROMEVENT observable

  //DELAY is same like setTimeout but in terms of operator
  testDelay = from(this.arr5);

  //RETRY is to retry any failed observable, it takes count as an argument
  //CATCHERROR converts an error into an successful observable
  testRetry = new Observable(x=>{
    x.next(1);
    x.next(2);
    x.error(new Error('Hi this is an error'));
  });

  //COMBINELATEST function
  //it will combine all latest values from all observables & sends as an array
  //it will keep emitting the data
  //all observables have to emit some values
  //ONLY SEND LATEST VALUES
  //if any errors comes, COMBINELATEST will also throw an error immediately & STOPS emitting values
  testCombineLatest1 = new Observable(observer=>{
    setTimeout(()=>{observer.next(1)},1000);//emits value after 1 sec
  });

  testCombineLatest2 = new Observable(observer=>{
    setTimeout(()=>{observer.next(5)},5000);//emits value after 5 sec
  });

  //FORKJOIN function
  //it will send only the final value of observables
  //it will wait for all observables to complete
  //it emits only ONCE
  //if any errors comes, FORKJOIN will also throw an error immediately & STOPS emitting values
  testForkJoin1 = of(1,2,3,4);
  testForkJoin2 = of('a','b');

  ngOnInit(): void {
    this.subscribeAllObservable();
  }

  ngAfterViewInit(): void {
    this.buttonEvent = fromEvent(document.getElementById('stopTimer'), 'click');
  }

  startTimer(): void{
    interval(1000).pipe(takeUntil(this.buttonEvent)).subscribe((x)=>{
      console.log(x);
    },
    error=>{
      console.log(error.message);
    },
    ()=>{
      console.log("completed");
    })
  }

  subscribeAllObservable(): void{
    //observable
    /*this.test.subscribe((res)=>{
      console.log(res);
    },
    (error)=>{
      console.log(error.message);
    })*/

    //promise
    /*this.testPromise.then((res: any)=>{
      console.log(res);
    },
    (error: any)=>{

    })*/

    //observable error
    /*this.testError.subscribe((x)=>{
      console.log(x);
    },
    (error: any)=>{
      console.log(error.message);
    })*/

    //observable complete
    /*this.testComplete.subscribe((x)=>{
      console.log(x);
    },
    (error)=>{
      console.log(error.message);
    },
    ()=>{
      console.log("complete triggered")
    })*/

    //observable OF operator
    /*this.testOf.subscribe((res)=>{
      console.log(res);
    },
    (error: any)=>{console.log("Error occured")},
    ()=>{console.log("OF operator complete triggered")});*/

    //observable FROM operator
    /*this.testFrom.subscribe((res)=>{
      console.log(res);
    })*/

    //observable AJAX operator
    /*this.testAjax.subscribe(x=>{
      console.log(x);//print the AJAX response
    })*/

    //observable INTERVAL operator
    /*this.testInterval.subscribe(x=>{
      console.log(x);
    });*/

    //observable MAP operator
    /*this.testMap.pipe(map((x)=>{
      return x*10;
    })).subscribe(res=>{
      console.log(res);
    });*/

    //observable FILTER operator
    //use MAP & PIPE with single PIPE operator
    /*this.testFilter.pipe(map((x)=>{
      return x * 10;
    }), filter((x)=>{
      return x >= 50;
    })).subscribe((x)=>{
      console.log(x);
    })*/

    //observable TAKE operator
    /*this.testTake.pipe(take(2)).subscribe((x)=>{
      console.log(x);//emitting first two values only
    })*/

    //observable DELAY operator
    this.testDelay.pipe(delay(2000)).subscribe((x)=>{
      console.log(x);//delay the data for 2 seconds
    })

    //observable RETRY operator
    this.testRetry.pipe(retry(2), catchError(x=>{return of('a','b')})).subscribe((x)=>{
      console.log(x);
    });

    //observable COMBINELATEST
    //CombineLatest is a function & take observables as an array
    //returns value in array => print [1,5] after 5 sec
    /*combineLatest([this.testCombineLatest1,this.testCombineLatest2]).subscribe((x:any)=>{
      console.log(x);
    });*/

    //observable FORKJOIN
    forkJoin([this.testForkJoin1,this.testForkJoin2]).subscribe(x=>{
      console.log(x);
    });

  }

}
