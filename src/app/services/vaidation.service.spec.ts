import { TestBed } from '@angular/core/testing';

import { VaidationService } from './vaidation.service';

describe('VaidationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VaidationService = TestBed.get(VaidationService);
    expect(service).toBeTruthy();
  });
});
