import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTimesComponent } from './admin-times.component';

describe('AdminTimesComponent', () => {
  let component: AdminTimesComponent;
  let fixture: ComponentFixture<AdminTimesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTimesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
