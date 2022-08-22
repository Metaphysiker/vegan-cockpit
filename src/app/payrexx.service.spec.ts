import { TestBed } from '@angular/core/testing';

import { PayrexxService } from './payrexx.service';

describe('PayrexxService', () => {
  let service: PayrexxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PayrexxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
