import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {TimeService} from '../time.service';
import {BehaviorSubject, Observable} from 'rxjs';

const MONITOR = {
  VALUE: 'value',
  SUBSCRIBE: 'subscribe',
};


@Component({
  selector: 'app-observable-monitor',
  templateUrl: './observable-monitor.component.html',
  styleUrls: ['./observable-monitor.component.scss']
})
export class ObservableMonitorComponent implements OnInit {

  // @ts-ignore
  @ViewChild('timeline') timeline: ElementRef;
  @Input()
  name = '';

  @Input()
  observable;

  @Input()
  autoSub = false;

  @Input()
  isSubject = false;

  subject$ = new BehaviorSubject(null);
  subject = this.subject$ as Observable<any>;
  globalID;
  subscription;
  current = 0;

  constructor(private timeService: TimeService) {
  }

  observe() {
    this.subject$.next({ type: MONITOR.SUBSCRIBE });
    this.observable.subscribe((value) => {
      this.subject$.next({ value: JSON.stringify(value), type: MONITOR.VALUE });
    }, null, () => {
      this.subject$.complete();
    });
  }

  next() {
    this.observable.next(this.current++);
  }

  complete() {
    this.observable.complete();
  }

  repeatOften() {
    const width = this.timeline.nativeElement.style.width.slice(0, -2) || '0';
    this.timeline.nativeElement.style.width = parseInt(width) + 1 + 'px';
    this.globalID = requestAnimationFrame(this.repeatOften.bind(this));
  }

  appendValue(value) {
    if (value && value.type === MONITOR.VALUE) {
      const node = document.createElement('span');
      const textnode = document.createTextNode(value.value);
      node.appendChild(textnode);
      node.style.left = document.getElementById('timeline').style.width;
      node.style.position = 'absolute';
      this.timeline.nativeElement.appendChild(node);
    } else if (value && value.type === MONITOR.SUBSCRIBE) {
      const node = document.createElement('span');
      const textnode = document.createTextNode('|');
      node.appendChild(textnode);
      node.style.left = document.getElementById('timeline').style.width;
      node.style.position = 'absolute';
      this.timeline.nativeElement.appendChild(node);
    }
  }

  ngOnInit() {
     this.subscription = this.subject.subscribe((value) => {
      this.appendValue(value);
    });

    this.timeService.currentStatus.subscribe(status => {
      if (status) {
        this.globalID = requestAnimationFrame(this.repeatOften.bind(this));
        if (this.autoSub) {
          this.observe();
        }
      } else if (this.globalID) {
        cancelAnimationFrame(this.globalID);
        this.subscription.unsubscribe();
      }
    });
  }

}
