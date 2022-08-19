import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordpressBlogPostComponent } from './wordpress-blog-post.component';

describe('WordpressBlogPostComponent', () => {
  let component: WordpressBlogPostComponent;
  let fixture: ComponentFixture<WordpressBlogPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordpressBlogPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WordpressBlogPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
