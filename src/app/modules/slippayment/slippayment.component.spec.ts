import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlippaymentComponent } from './slippayment.component';

describe('SlippaymentComponent', () => {
  let component: SlippaymentComponent;
  let fixture: ComponentFixture<SlippaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlippaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlippaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
