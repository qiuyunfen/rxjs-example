import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HighObservableComponent } from './high-observable.component';

describe('HighObservableComponent', () => {
  let component: HighObservableComponent;
  let fixture: ComponentFixture<HighObservableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HighObservableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighObservableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
