import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportgenexcelComponent } from './reportgenexcel.component';

describe('ReportgenexcelComponent', () => {
  let component: ReportgenexcelComponent;
  let fixture: ComponentFixture<ReportgenexcelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportgenexcelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportgenexcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
