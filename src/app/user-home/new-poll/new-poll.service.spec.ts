import { TestBed } from '@angular/core/testing';

import { NewPollService } from './new-poll.service';

describe('NewPollService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewPollService = TestBed.get(NewPollService);
    expect(service).toBeTruthy();
  });
});
