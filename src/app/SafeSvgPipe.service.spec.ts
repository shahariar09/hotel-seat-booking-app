/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SafeSvgPipeService } from './SafeSvgPipe.service';

describe('Service: SafeSvgPipe', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SafeSvgPipeService]
    });
  });

  it('should ...', inject([SafeSvgPipeService], (service: SafeSvgPipeService) => {
    expect(service).toBeTruthy();
  }));
});
