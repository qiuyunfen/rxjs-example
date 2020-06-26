import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservableMonitorComponent } from './observable-monitor.component';

describe('ObservableMonitorComponent', () => {
  let component: ObservableMonitorComponent;
  let fixture: ComponentFixture<ObservableMonitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservableMonitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservableMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
