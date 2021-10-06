import { TestBed } from '@angular/core/testing';

import { PartoService } from './parto.service';

describe('PartoService', () => {
  let service: PartoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
