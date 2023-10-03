import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarmanagementComponent } from './carmanagement.component';

describe('CarmanagementComponent', () => {
  let component: CarmanagementComponent;
  let fixture: ComponentFixture<CarmanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarmanagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
