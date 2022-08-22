import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordpressBlogPostsAgeComponent } from './wordpress-blog-posts-age.component';

describe('WordpressBlogPostsAgeComponent', () => {
  let component: WordpressBlogPostsAgeComponent;
  let fixture: ComponentFixture<WordpressBlogPostsAgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordpressBlogPostsAgeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WordpressBlogPostsAgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
