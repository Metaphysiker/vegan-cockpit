import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgeBracketComponent } from './age-bracket.component';

describe('AgeBracketComponent', () => {
  let component: AgeBracketComponent;
  let fixture: ComponentFixture<AgeBracketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgeBracketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgeBracketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
