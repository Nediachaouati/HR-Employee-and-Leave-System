import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTimesheetsComponent } from './my-timesheets.component';

describe('MyTimesheetsComponent', () => {
  let component: MyTimesheetsComponent;
  let fixture: ComponentFixture<MyTimesheetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyTimesheetsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyTimesheetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
