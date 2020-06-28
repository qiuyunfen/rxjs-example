import {Component, Input, OnInit} from '@angular/core';
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

  @Input()
  name = '';

  @Input()
  observable;

  subject$ = new BehaviorSubject(null);
  subject = this.subject$ as Observable<any>;
  globalID;

  constructor(private timeService: TimeService) {
  }

  observe() {
    this.observable.subscribe((value) => {
      this.subject$.next({ value, type: MONITOR.VALUE });
    });
  }

  repeatOften() {
    const width = document.getElementById('timeline').style.width.slice(0, -2) || '0';
    document.getElementById('timeline').style.width = parseInt(width) + 1 + 'px';
    this.globalID = requestAnimationFrame(this.repeatOften.bind(this));
  }

  appendValue(value) {
    if (value && value.type === MONITOR.VALUE) {
      const node = document.createElement('span');
      const textnode = document.createTextNode(value.value);
      node.appendChild(textnode);
      node.style.left = document.getElementById('timeline').style.width;
      node.style.position = 'absolute';
      document.getElementById('timeline').appendChild(node);
    }
  }

  ngOnInit() {
    this.timeService.currentStatus.subscribe(status => {
      if (status) {
        this.globalID = requestAnimationFrame(this.repeatOften.bind(this));
      } else if (this.globalID) {
        cancelAnimationFrame(this.globalID);
      }
    });

    this.subject.subscribe((value) => {
      console.log(value);
      this.appendValue(value);
    });
  }

}
