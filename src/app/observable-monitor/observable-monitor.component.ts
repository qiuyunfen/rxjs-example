import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-observable-monitor',
  templateUrl: './observable-monitor.component.html',
  styleUrls: ['./observable-monitor.component.scss']
})
export class ObservableMonitorComponent implements OnInit {

  @Input()
  name = '';

  constructor() { }

  ngOnInit() {
  }

}
