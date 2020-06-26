import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorControlComponent } from './monitor-control.component';

describe('MonitorControlComponent', () => {
  let component: MonitorControlComponent;
  let fixture: ComponentFixture<MonitorControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
