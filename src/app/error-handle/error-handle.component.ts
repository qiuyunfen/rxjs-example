import { Component, OnInit } from '@angular/core';
import {Observable, timer} from 'rxjs';
import {catchError, map, retry, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-error-handle',
  templateUrl: './error-handle.component.html',
  styleUrls: ['./error-handle.component.scss']
})
export class ErrorHandleComponent implements OnInit {

  error$: Observable<any>;
  catch$: Observable<any>;
  retry$: Observable<any>;

  constructor() {
    this.error$ = timer(2000).pipe(
      map(() => {
        throw new Error('error');
      }),
      startWith('start')
    );

    const errorHandler = (error) => {
      return Observable.create(observe => {
        observe.next('error');
        setTimeout(() => {
          observe.next('end');
          observe.complete();
        }, 1000);
      });
    };

    this.catch$ = this.error$.pipe(catchError(errorHandler));
    this.retry$ = this.error$.pipe(retry(2));
  }

  ngOnInit() {
  }

}
