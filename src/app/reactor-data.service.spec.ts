import { TestBed } from '@angular/core/testing';

import { ReactorDataService } from './reactor-data.service';

describe('ReactorDataService', () => {
  let service: ReactorDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReactorDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
