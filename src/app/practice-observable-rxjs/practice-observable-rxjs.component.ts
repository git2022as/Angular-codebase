import { Component, OnInit } from '@angular/core';
import {from, map, Observable, of} from 'rxjs'
import {Subscription} from 'rxjs'

@Component({
  selector: 'app-practice-observable-rxjs',
  templateUrl: './practice-observable-rxjs.component.html',
  styleUrls: ['./practice-observable-rxjs.component.scss']
})
export class PracticeObservableRxjsComponent implements OnInit {

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

  ngOnInit(): void {
    this.subscribeAllObservable();
  }

  subscribeAllObservable(): void{
    //observable
    this.test.subscribe((res)=>{
      console.log(res);
    },
    (error)=>{
      console.log(error.message);
    })

    //promise
    this.testPromise.then((res: any)=>{
      console.log(res);
    },
    (error: any)=>{

    })

    //observable error
    this.testError.subscribe((x)=>{
      console.log(x);
    },
    (error: any)=>{
      console.log(error.message);
    })

    //observable complete
    this.testComplete.subscribe((x)=>{
      console.log(x);
    },
    (error)=>{
      console.log(error.message);
    },
    ()=>{
      console.log("complete triggered")
    })

    //observable OF operator
    this.testOf.subscribe((res)=>{
      console.log(res);
    },
    (error: any)=>{console.log("Error occured")},
    ()=>{console.log("OF operator complete triggered")});

    //observable FROM operator
    this.testFrom.subscribe((res)=>{
      console.log(res);
    })

  }

}
