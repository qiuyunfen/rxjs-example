import { Component, OnInit } from '@angular/core';
import {combineLatest, forkJoin, from, interval, Observable, of, range, timer} from 'rxjs';
import {
  concat,
  debounce,
  distinct,
  distinctUntilChanged,
  filter,
  first,
  last,
  map, mapTo, merge, pluck, reduce,
  scan,
  startWith,
  switchMap,
  take, takeUntil,
  throttle
} from 'rxjs/operators';

@Component({
  selector: 'app-observable-operator',
  templateUrl: './observable-operator.component.html',
  styleUrls: ['./observable-operator.component.scss']
})
export class ObservableOperatorComponent implements OnInit {

  interval$: Observable<any>;
  filter$: Observable<any>;
  take$: Observable<any>;
  distinct$: Observable<any>;
  distinctUntilChanged$: Observable<any>;
  takeUtil$: Observable<any>;
  takeUtilSign$: Observable<any>;

  startWith$: Observable<any>;
  observable1$: Observable<any>;
  observable2$: Observable<any>;
  merge$: Observable<any>;
  combineLatest$: Observable<any>;
  concat$: Observable<any>;
  forkJoin$: Observable<any>;

  map$: Observable<any>;
  mapTo$: Observable<any>;
  pluck$: Observable<any>;
  reduce$: Observable<any>;
  scan$: Observable<any>;

  constructor() {
    this.interval$ = interval(1000);
    this.take$ = this.interval$.pipe(take(5));
    this.filter$ = this.interval$.pipe(filter(x => x % 2 === 0));
    this.distinct$ = this.take$.pipe(distinct(x => x % 2));
    this.distinctUntilChanged$ = this.take$.pipe(map(x => x % 2), distinctUntilChanged());
    this.startWith$ = this.take$.pipe(startWith('h'));

    this.takeUtilSign$ = timer(5000);
    this.takeUtil$ = this.interval$.pipe(takeUntil(this.takeUtilSign$));

    this.map$ = this.interval$.pipe(map(i => ({i: i + 1})));
    this.mapTo$ = this.interval$.pipe(mapTo('i'));
    this.pluck$ = this.map$.pipe(pluck('i'));
    this.reduce$ = this.take$.pipe(reduce(((acc, value) => acc + value), 0));
    this.scan$ = this.take$.pipe(scan(((acc, value) => acc + value), 0));

    this.observable1$ = timer(0, 2000).pipe(map(i => String.fromCharCode(97 + i)), take(2));
    this.observable2$ = timer(1000, 2000).pipe(take(3));
    this.merge$ = this.observable1$.pipe(merge(this.observable2$));
    this.combineLatest$ = combineLatest(this.observable1$, this.observable2$);
    this.concat$ = this.observable1$.pipe(concat(this.observable2$));
    this.forkJoin$ = forkJoin(this.observable1$, this.observable2$);
  }

  ngOnInit() {
  }

  map() {
    from([10, 20, 30])
      .pipe(map(val => Math.log(val)))
      .subscribe(val => console.log(val));
  }

  filter() {
    from([10, 20, 30])
      .pipe(filter(val => val % 6 === 0))
      .subscribe(val => console.log(val));
  }

  first() {
    of('Richard', 'Erlich', 'Dinesh', 'Gilfoyle')
      .pipe(first())
      .subscribe(val => console.log(val));
  }

  last() {
    of('Richard', 'Erlich', 'Dinesh', 'Gilfoyle')
      .pipe(last())
      .subscribe(val => console.log(val));
  }

  throttle() {
    // Give me the first value, then wait X time
    const source = interval(1000);
    const example = source.pipe(throttle(() => interval(2000)));
    example.subscribe(val => console.log(val));
  }

  debounce() {
    // Wait X time, then give me the last value
    // observable应该是能complete的
    const source = of('Richard', 'Erlich', 'Dinesh', 'Gilfoyle');
    const example = source.pipe(debounce(() => interval(2000)));
    example.subscribe(val => console.log(val));
  }

  scan() {
    const source$ = range(0, 10);

    source$.pipe(
      filter(x => x % 2 === 0),
      scan((acc, x) => acc + x, 0)
    )
      .subscribe(x => console.log(x));
  }

  switchMap() {
    // 常用于一个observable完成后，转化为另一个Observable
    of('test')
      .pipe(switchMap(value => of(value)))
      .subscribe(val => console.log(val));
  }
}
