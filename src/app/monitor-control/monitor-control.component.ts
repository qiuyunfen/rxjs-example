import {Component, OnInit} from '@angular/core';
import {TimeService} from '../time.service';

@Component({
  selector: 'app-monitor-control',
  templateUrl: './monitor-control.component.html',
  styleUrls: ['./monitor-control.component.scss']
})
export class MonitorControlComponent implements OnInit {

  operation = 'start';
  start = false;

  constructor(private timeService: TimeService) {
  }

  ngOnInit(): void {
  }

  startOrStop() {
    this.start = !this.start;
    if(this.start) {
      this.operation = 'stop';
      this.timeService.setStatus(true);
    } else {
      this.operation = 'start';
      this.timeService.setStatus(false);
    }
  }

}
