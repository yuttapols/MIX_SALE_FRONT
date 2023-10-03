import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckinformationComponent } from './checkinformation.component';

describe('CheckinformationComponent', () => {
  let component: CheckinformationComponent;
  let fixture: ComponentFixture<CheckinformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckinformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckinformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
