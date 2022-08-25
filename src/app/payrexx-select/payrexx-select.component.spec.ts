import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrexxSelectComponent } from './payrexx-select.component';

describe('PayrexxSelectComponent', () => {
  let component: PayrexxSelectComponent;
  let fixture: ComponentFixture<PayrexxSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayrexxSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrexxSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
