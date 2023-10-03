import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovebookingmanagementComponent } from './approvebookingmanagement.component';

describe('ApprovebookingmanagementComponent', () => {
  let component: ApprovebookingmanagementComponent;
  let fixture: ComponentFixture<ApprovebookingmanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovebookingmanagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovebookingmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
