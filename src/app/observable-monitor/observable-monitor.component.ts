import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {TimeService} from '../time.service';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';

const MONITOR = {
  VALUE: 'value',
  SUBSCRIBE: 'subscribe',
  INNER: 'inner',
};


@Component({
  selector: 'app-observable-monitor',
  templateUrl: './observable-monitor.component.html',
  styleUrls: ['./observable-monitor.component.scss']
})
export class ObservableMonitorComponent implements OnInit {

  // @ts-ignore
  @ViewChild('timeline') timeline: ElementRef;
  // @ts-ignore
  @ViewChild('container') container: ElementRef;
  @Input()
  name = '';

  @Input()
  observable;

  @Input()
  autoSub = false;

  @Input()
  isSubject = false;

  @Input()
  isHigh = false;

  subject$ = new BehaviorSubject(null);
  subject = this.subject$ as Observable<any>;
  globalID;
  subscription;
  current = 0;
  animationIds: number[] = [];
  subs = [];

  constructor(private timeService: TimeService) {
  }

  observe() {
    this.subject$.next({ type: MONITOR.SUBSCRIBE });
    let count = 0;
    this.observable.subscribe((value) => {
      if (this.isHigh) {
        this.subject$.next({
          value,
          type: MONITOR.INNER,
          level: count++
        });
      } else {
        this.subject$.next({ value: JSON.stringify(value), type: MONITOR.VALUE });
      }
    });
  }

  next() {
    this.observable.next(this.current++);
  }

  complete() {
    this.observable.complete();
  }

  repeatOften(targetNode, level) {
    const width = targetNode.style.width.slice(0, -2) || '0';
    targetNode.style.width = parseInt(width) + 1 + 'px';
    this.animationIds[level] = requestAnimationFrame(this.repeatOften.bind(this, targetNode, level));
  }

  repeat(targetNode) {
    const width = targetNode.style.width.slice(0, -2) || '0';
    targetNode.style.width = parseInt(width) + 1 + 'px';
    this.globalID = requestAnimationFrame(this.repeat.bind(this, targetNode));
  }

  appendValue(targetNode, value) {
    if (value && value.type === MONITOR.VALUE) {
      const node = document.createElement('span');
      const textnode = document.createTextNode(value.value);
      node.appendChild(textnode);
      node.style.left = targetNode.style.width;
      node.style.position = 'absolute';
      targetNode.appendChild(node);
    } else if (value && value.type === MONITOR.SUBSCRIBE) {
      const node = document.createElement('span');
      const textnode = document.createTextNode('|');
      node.appendChild(textnode);
      node.style.left = document.getElementById('timeline').style.width;
      node.style.position = 'absolute';
      this.timeline.nativeElement.appendChild(node);
    } else if (value && value.type === MONITOR.INNER) {
      const node = document.createElement('div');
      node.style.left = document.getElementById('timeline').style.width;
      node.style.position = 'relative';
      node.style.height = '20px';
      node.style.width = '0px';
      node.style.marginTop = '10px';
      node.style.background = 'aqua';
      this.animationIds[value.level] = requestAnimationFrame(this.repeatOften.bind(this, node, value.level));
      this.container.nativeElement.appendChild(node);
      this.subs[value.level] = value.value.subscribe(x => {
        this.appendValue(node, {
          value: x,
          type: MONITOR.VALUE
        });
      });
    }
  }

  ngOnInit() {
     this.subscription = this.subject.subscribe((value) => {
      this.appendValue(this.timeline.nativeElement, value);
    });
     this.timeService.currentStatus.subscribe(status => {
      if (status) {
        this.globalID = requestAnimationFrame(this.repeat.bind(this, this.timeline.nativeElement));
        if (this.autoSub) {
          this.observe();
        }
      } else if (this.globalID) {
        cancelAnimationFrame(this.globalID);
        for (const id of this.animationIds) {
          cancelAnimationFrame(id);
        }
        this.subscription.unsubscribe();
        for (const sub of this.subs) {
          sub.unsubscribe();
        }
      }
    });
  }

}
