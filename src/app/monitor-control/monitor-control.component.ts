import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-monitor-control',
  templateUrl: './monitor-control.component.html',
  styleUrls: ['./monitor-control.component.scss']
})
export class MonitorControlComponent implements OnInit {

  operation = 'start';
  start = false;

  constructor() { }

  ngOnInit() {
  }

  startOrStop() {
    this.start = !this.start;
    if(this.start) {
      this.operation = 'stop';
    } else {
      this.operation = 'start';
    }
  }

}
