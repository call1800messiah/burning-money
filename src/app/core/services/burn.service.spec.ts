import { TestBed, inject } from '@angular/core/testing';

import { BurnService } from './burn.service';

describe('BurnService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BurnService]
    });
  });

  it('should be created', inject([BurnService], (service: BurnService) => {
    expect(service).toBeTruthy();
  }));
});
