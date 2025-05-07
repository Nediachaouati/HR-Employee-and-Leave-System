import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetOfOneEmployeeComponent } from './timesheet-of-one-employee.component';

describe('TimesheetOfOneEmployeeComponent', () => {
  let component: TimesheetOfOneEmployeeComponent;
  let fixture: ComponentFixture<TimesheetOfOneEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimesheetOfOneEmployeeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimesheetOfOneEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
