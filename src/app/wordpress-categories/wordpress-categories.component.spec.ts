import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordpressCategoriesComponent } from './wordpress-categories.component';

describe('WordpressCategoriesComponent', () => {
  let component: WordpressCategoriesComponent;
  let fixture: ComponentFixture<WordpressCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordpressCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WordpressCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
