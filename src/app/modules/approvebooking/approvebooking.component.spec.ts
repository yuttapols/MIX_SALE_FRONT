import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovebookingComponent } from './approvebooking.component';

describe('ApprovebookingComponent', () => {
  let component: ApprovebookingComponent;
  let fixture: ComponentFixture<ApprovebookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovebookingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovebookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
