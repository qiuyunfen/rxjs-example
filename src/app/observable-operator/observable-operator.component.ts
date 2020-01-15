import { Component, OnInit } from '@angular/core';
import {from, interval, of, range} from 'rxjs';
import {debounce, filter, first, last, map, scan, switchMap, throttle} from 'rxjs/operators';

@Component({
  selector: 'app-observable-operator',
  templateUrl: './observable-operator.component.html',
  styleUrls: ['./observable-operator.component.scss']
})
export class ObservableOperatorComponent implements OnInit {

  constructor() { }

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
