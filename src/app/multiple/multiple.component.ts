import { Component, OnInit } from '@angular/core';
import {interval, Observable} from 'rxjs';
import {publish, publishReplay, refCount, share, shareReplay, take} from 'rxjs/operators';

@Component({
  selector: 'app-multiple',
  templateUrl: './multiple.component.html',
  styleUrls: ['./multiple.component.scss']
})
export class MultipleComponent implements OnInit {

  interval$: Observable<any>;
  publish$: Observable<any>;
  share$: Observable<any>;
  shareReplay$: Observable<any>;

  constructor() {
    this.interval$ = interval(1000).pipe(take(5));
    this.publish$ = this.interval$.pipe(publish(), refCount());
    this.share$ = this.interval$.pipe(share());
    // this.shareReplay$ = this.interval$.pipe(shareReplay(1));
  }

  ngOnInit() {
  }

}
