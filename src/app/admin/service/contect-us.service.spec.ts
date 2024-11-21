import { TestBed } from '@angular/core/testing';

import { ContectUsService } from './contect-us.service';

describe('ContectUsService', () => {
  let service: ContectUsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContectUsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
