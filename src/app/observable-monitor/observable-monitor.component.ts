import {Component, Input, OnInit} from '@angular/core';
import {TimeService} from '../time.service';

@Component({
  selector: 'app-observable-monitor',
  templateUrl: './observable-monitor.component.html',
  styleUrls: ['./observable-monitor.component.scss']
})
export class ObservableMonitorComponent implements OnInit {

  @Input()
  name = '';

  constructor(private timeService: TimeService) {
  }

  ngOnInit() {
    this.timeService.currentStatus.subscribe(message => {
      console.log('------------', message);
    });
  }

}
