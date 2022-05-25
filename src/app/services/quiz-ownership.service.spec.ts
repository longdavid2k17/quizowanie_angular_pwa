import { TestBed } from '@angular/core/testing';

import { QuizOwnershipService } from './quiz-ownership.service';

describe('QuizOwnershipService', () => {
  let service: QuizOwnershipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizOwnershipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
