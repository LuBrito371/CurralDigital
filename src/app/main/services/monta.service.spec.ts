import { TestBed } from '@angular/core/testing';

import { MontaService } from './monta.service';

describe('MontaService', () => {
  let service: MontaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MontaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
