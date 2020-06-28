import { Component, OnInit } from '@angular/core';
import {from, fromEvent, interval, Observable, of, range, timer} from 'rxjs';
import {fromPromise} from 'rxjs/internal-compatibility';

@Component({
  selector: 'app-observable-create',
  templateUrl: './observable-create.component.html',
  styleUrls: ['./observable-create.component.scss']
})
export class ObservableCreateComponent implements OnInit {

  of$: Observable<any>;
  from$: Observable<any>;
  range$: Observable<any>;
  interval$: Observable<any>;
  timer$: Observable<any>;
  fromEvent$: Observable<any>;
  create$: Observable<any>;

  constructor() {
    this.of$ = of('o');
    this.from$ = from([1, 2, 3]);
    this.range$ = range(1, 3);
    this.interval$ = interval(1000);
    this.timer$ = timer(0, 1000);
    this.fromEvent$ = fromEvent(window, 'keydown');
    this.create$ = Observable.create((observer) => {
      observer.next('1');
      setTimeout(() => {
        observer.next('2');
        observer.complete();
      }, 1000);
    });

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
