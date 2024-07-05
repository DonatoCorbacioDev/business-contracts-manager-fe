import { TestBed } from '@angular/core/testing';

import { FinancialValuesService } from './financial-values.service';

describe('FinancialValuesService', () => {
  let service: FinancialValuesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinancialValuesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
