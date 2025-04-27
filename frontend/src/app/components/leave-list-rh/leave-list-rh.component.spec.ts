import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveListRhComponent } from './leave-list-rh.component';

describe('LeaveListRhComponent', () => {
  let component: LeaveListRhComponent;
  let fixture: ComponentFixture<LeaveListRhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaveListRhComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveListRhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
