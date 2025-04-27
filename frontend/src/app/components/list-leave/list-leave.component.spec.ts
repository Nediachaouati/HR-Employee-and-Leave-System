import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLeaveComponent } from './list-leave.component';

describe('ListLeaveComponent', () => {
  let component: ListLeaveComponent;
  let fixture: ComponentFixture<ListLeaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListLeaveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
