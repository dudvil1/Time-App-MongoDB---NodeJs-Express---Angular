import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTimesComponent } from './user-times.component';

describe('UserTimesComponent', () => {
  let component: UserTimesComponent;
  let fixture: ComponentFixture<UserTimesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTimesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
