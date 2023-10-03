import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservedetailComponent } from './reservedetail.component';

describe('ReservedetailComponent', () => {
  let component: ReservedetailComponent;
  let fixture: ComponentFixture<ReservedetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservedetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservedetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
