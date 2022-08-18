import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryAnalyticsComponent } from './category-analytics.component';

describe('CategoryAnalyticsComponent', () => {
  let component: CategoryAnalyticsComponent;
  let fixture: ComponentFixture<CategoryAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryAnalyticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
