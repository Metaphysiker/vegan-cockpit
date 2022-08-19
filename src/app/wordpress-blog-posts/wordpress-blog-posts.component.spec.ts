import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordpressBlogPostsComponent } from './wordpress-blog-posts.component';

describe('WordpressBlogPostsComponent', () => {
  let component: WordpressBlogPostsComponent;
  let fixture: ComponentFixture<WordpressBlogPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordpressBlogPostsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WordpressBlogPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
