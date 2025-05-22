import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCongeComponent } from './update-conge.component';

describe('UpdateCongeComponent', () => {
  let component: UpdateCongeComponent;
  let fixture: ComponentFixture<UpdateCongeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateCongeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCongeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
