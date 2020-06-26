import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {TimeService} from '../time.service';

@Component({
  selector: 'app-observable-monitor',
  templateUrl: './observable-monitor.component.html',
  styleUrls: ['./observable-monitor.component.scss']
})
export class ObservableMonitorComponent implements OnInit {

  @Input()
  name = '';

  globalID;

  constructor(private timeService: TimeService) {
  }

  repeatOften() {
    const width = document.getElementById('timeline').style.width.slice(0, -2) || '0';
    document.getElementById('timeline').style.width = parseInt(width) + 1 + 'px';
    this.globalID = requestAnimationFrame(this.repeatOften.bind(this));
  }

  ngOnInit() {
    this.timeService.currentStatus.subscribe(status => {
      if (status) {
        this.globalID = requestAnimationFrame(this.repeatOften.bind(this));
      } else if (this.globalID) {
        cancelAnimationFrame(this.globalID);
      }
    });
  }

}
