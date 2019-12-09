import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMyShiftsComponent } from './all-my-shifts.component';

describe('AllMyShiftsComponent', () => {
  let component: AllMyShiftsComponent;
  let fixture: ComponentFixture<AllMyShiftsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllMyShiftsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllMyShiftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
