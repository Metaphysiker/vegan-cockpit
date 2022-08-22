import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryAnalyticsAgeComponent } from './category-analytics-age.component';

describe('CategoryAnalyticsAgeComponent', () => {
  let component: CategoryAnalyticsAgeComponent;
  let fixture: ComponentFixture<CategoryAnalyticsAgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryAnalyticsAgeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryAnalyticsAgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
