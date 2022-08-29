import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordpressBlogPostsGenderComponent } from './wordpress-blog-posts-gender.component';

describe('WordpressBlogPostsGenderComponent', () => {
  let component: WordpressBlogPostsGenderComponent;
  let fixture: ComponentFixture<WordpressBlogPostsGenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordpressBlogPostsGenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WordpressBlogPostsGenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
