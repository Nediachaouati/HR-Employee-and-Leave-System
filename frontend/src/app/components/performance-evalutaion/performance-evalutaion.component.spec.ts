import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceEvalutaionComponent } from './performance-evalutaion.component';

describe('PerformanceEvalutaionComponent', () => {
  let component: PerformanceEvalutaionComponent;
  let fixture: ComponentFixture<PerformanceEvalutaionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerformanceEvalutaionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerformanceEvalutaionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
