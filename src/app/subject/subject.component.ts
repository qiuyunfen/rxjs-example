import { Component, OnInit } from '@angular/core';
import {AsyncSubject, BehaviorSubject, Observable, ReplaySubject, Subject} from 'rxjs';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {

  subject$: Observable<any>;
  replaySubject$: Observable<any>;
  behaviorSubject$: Observable<any>;
  asyncSubject$: Observable<any>;

  constructor() {
    this.subject$ = new Subject();
    this.replaySubject$ = new ReplaySubject();
    this.behaviorSubject$ = new BehaviorSubject('o');
    this.asyncSubject$ = new AsyncSubject();
  }

  ngOnInit() {
  }

}
