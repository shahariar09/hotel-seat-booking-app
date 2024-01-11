/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SvgConversionService } from './svgConversion.service';

describe('Service: SvgConversion', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SvgConversionService]
    });
  });

  it('should ...', inject([SvgConversionService], (service: SvgConversionService) => {
    expect(service).toBeTruthy();
  }));
});
