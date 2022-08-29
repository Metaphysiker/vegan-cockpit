import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryAnalyticsGenderComponent } from './category-analytics-gender.component';

describe('CategoryAnalyticsGenderComponent', () => {
  let component: CategoryAnalyticsGenderComponent;
  let fixture: ComponentFixture<CategoryAnalyticsGenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryAnalyticsGenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryAnalyticsGenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
