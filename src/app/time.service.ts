import {ElementRef, Injectable, ViewChild} from '@angular/core';
import {BehaviorSubject, fromEvent, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimeService {
  runningSource = new BehaviorSubject(false);
  currentStatus = this.runningSource.asObservable();

  constructor() { }

  setStatus(value) {
    this.runningSource.next(value);
  }

}
