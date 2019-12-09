import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartExitComponent } from './start-exit.component';

describe('StartExitComponent', () => {
  let component: StartExitComponent;
  let fixture: ComponentFixture<StartExitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartExitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartExitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
