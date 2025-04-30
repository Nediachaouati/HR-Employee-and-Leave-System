import { TestBed } from '@angular/core/testing';

import { PerformanceEvaluationService } from './performance-evaluation.service';

describe('PerformanceEvaluationService', () => {
  let service: PerformanceEvaluationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerformanceEvaluationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
