import { TestBed } from '@angular/core/testing';

import { QuizbackendService } from './quizbackend.service';

describe('QuizbackendService', () => {
  let service: QuizbackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizbackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
