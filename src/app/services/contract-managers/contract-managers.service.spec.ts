import { TestBed } from '@angular/core/testing';

import { ContractManagersService } from './contract-managers.service';

describe('ContractManagersService', () => {
  let service: ContractManagersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContractManagersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
