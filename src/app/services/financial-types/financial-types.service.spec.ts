import { TestBed } from '@angular/core/testing';

import { FinancialTypesService } from './financial-types.service';

describe('FinancialTypesService', () => {
  let service: FinancialTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinancialTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
