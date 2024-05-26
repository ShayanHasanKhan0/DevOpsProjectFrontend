import { TestBed } from '@angular/core/testing';

import { CustomizequizService } from './customizequiz.service';

describe('CustomizequizService', () => {
  let service: CustomizequizService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomizequizService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
