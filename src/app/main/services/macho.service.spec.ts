import { TestBed } from '@angular/core/testing';

import { MachoService } from './macho.service';

describe('MachoService', () => {
  let service: MachoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MachoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
