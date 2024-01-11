import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SvgConversionService {

constructor() { }

base64ToSvg(base64String: string): string {
  return atob(base64String);
}

}

