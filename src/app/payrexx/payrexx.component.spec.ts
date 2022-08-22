import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrexxComponent } from './payrexx.component';

describe('PayrexxComponent', () => {
  let component: PayrexxComponent;
  let fixture: ComponentFixture<PayrexxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayrexxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrexxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
