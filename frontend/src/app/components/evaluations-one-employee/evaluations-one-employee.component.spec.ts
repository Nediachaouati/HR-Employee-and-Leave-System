import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationsOneEmployeeComponent } from './evaluations-one-employee.component';

describe('EvaluationsOneEmployeeComponent', () => {
  let component: EvaluationsOneEmployeeComponent;
  let fixture: ComponentFixture<EvaluationsOneEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvaluationsOneEmployeeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvaluationsOneEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
