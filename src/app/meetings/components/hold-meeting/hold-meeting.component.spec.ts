import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoldMeetingComponent } from './hold-meeting.component';

describe('HoldMeetingComponent', () => {
  let component: HoldMeetingComponent;
  let fixture: ComponentFixture<HoldMeetingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoldMeetingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoldMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
