import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageaddminComponent } from './homepageaddmin.component';

describe('HomepageaddminComponent', () => {
  let component: HomepageaddminComponent;
  let fixture: ComponentFixture<HomepageaddminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomepageaddminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomepageaddminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
