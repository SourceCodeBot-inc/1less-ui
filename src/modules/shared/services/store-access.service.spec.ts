import { TestBed } from '@angular/core/testing';

import { StoreAccessService } from './store-access.service';

describe('StoreAccessService', () => {
  let service: StoreAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
