import { Component, OnInit } from '@angular/core';
import {fromEvent, interval, Observable, of, timer} from 'rxjs';
import {fromPromise} from 'rxjs/internal-compatibility';

@Component({
  selector: 'app-observable-create',
  templateUrl: './observable-create.component.html',
  styleUrls: ['./observable-create.component.scss']
})
export class ObservableCreateComponent implements OnInit {

  of$: Observable<any>;

  constructor() {
    this.of$ = of('o');
  }

  ngOnInit() {
  }

  fromEventObservable() {
    fromEvent(document, 'click')
      .subscribe(click => console.log(click));
  }

  fromPromiseObservable() {
    const promise = new Promise(resolve => {
      setTimeout(() =>  {
        resolve('fromPromise');
      }, 1000);
    });
    fromPromise(promise)
      .subscribe(value => console.log(value));
  }

  timerObservable() {
    // 1000ms后emit一个value，emit后立即complete
    // dueTime 表示第一个value emit的时间
    // periodOrScheduler 同interval的值一样，每多少秒再次emit一个值
    timer(1000)
      .subscribe(val => console.log(val), null, () => console.log('complete'));
  }

  intervalObservable() {
    // emit value for every interval
    const intervalObservable = interval(1000)
      .subscribe(val => console.log(val));

    // unsubscribe
    setTimeout(() => {
      intervalObservable.unsubscribe();
    }, 5000);
  }

  ofObservable() {
    // emit一组value，emit后立即complete
    of('test', ['test1', 'test2'], { test: '1'})
      .subscribe(val => console.log(val), null, () => console.log('complete'));
  }
}
