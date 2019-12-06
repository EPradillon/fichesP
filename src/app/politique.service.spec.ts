import { TestBed } from '@angular/core/testing';

import { PolitiqueService } from './politique.service';

describe('PolitiqueService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PolitiqueService = TestBed.get(PolitiqueService);
    expect(service).toBeTruthy();
  });
});
