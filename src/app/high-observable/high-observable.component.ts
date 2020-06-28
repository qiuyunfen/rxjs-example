import { Component, OnInit } from '@angular/core';
import {interval, Observable, timer} from 'rxjs';
import {combineAll, concat, concatAll, concatMap, map, mapTo, mergeAll, mergeMap, switchAll, switchMap, take} from 'rxjs/operators';

@Component({
  selector: 'app-high-observable',
  templateUrl: './high-observable.component.html',
  styleUrls: ['./high-observable.component.scss']
})
export class HighObservableComponent implements OnInit {

  ob1$: Observable<any>;
  ob2$: Observable<any>;
  ob3$: Observable<any>;
  ho$: Observable<any>;
  timer$: Observable<any>;
  merge$: Observable<any>;
  combine$: Observable<any>;
  concat$: Observable<any>;
  switchAll$: Observable<any>;
  mergeMap$: Observable<any>;
  concatMap$: Observable<any>;
  switchMap$: Observable<any>;

  constructor() {
    this.ob1$ = timer(0, 2500).pipe(map(x => x + 10), take(3));
    this.ob2$ = timer(0, 1500).pipe(map(x => x + 20), take(5));
    this.ob3$ = timer(0, 1000).pipe(map(x => x + 30), take(3));
    this.ho$ = Observable.create(observe => {
      setTimeout(() => observe.next(this.ob1$), 1000);
      setTimeout(() => observe.next(this.ob2$), 4000);
      setTimeout(() => {
        observe.next(this.ob3$);
        observe.complete();
      }, 6500);
    });
    this.merge$ = this.ho$.pipe(mergeAll());
    this.combine$ = this.ho$.pipe(combineAll());
    this.concat$ = this.ho$.pipe(concatAll());
    this.switchAll$ = this.ho$.pipe(switchAll());

    this.timer$ = timer(1000).pipe(
      mapTo(0),
      concat(timer(3000).pipe(mapTo(1)), timer(2500).pipe(mapTo(2))));

    const observables = [this.ob1$, this.ob2$, this.ob3$];
    this.mergeMap$ = this.timer$.pipe(mergeMap(i => observables[i]));
    this.concatMap$ = this.timer$.pipe(concatMap(i => observables[i]));
    this.switchMap$ = this.timer$.pipe(switchMap(i => observables[i]));
  }

  ngOnInit() {
  }

}
