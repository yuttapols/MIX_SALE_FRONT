import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookinginformationComponent } from './bookinginformation.component';

describe('BookinginformationComponent', () => {
  let component: BookinginformationComponent;
  let fixture: ComponentFixture<BookinginformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookinginformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookinginformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
