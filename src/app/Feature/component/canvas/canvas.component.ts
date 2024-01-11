import { AfterViewInit, Component, ElementRef, NgZone, OnInit, Renderer2, ViewChild } from '@angular/core';
import * as fabric from 'fabric';


@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {

  zoomLevel = 1;
  zoomStep = 0.1;

  ngOnInit(): void {}

  onZoom(event: WheelEvent) {
    event.preventDefault();

    if (event.deltaY > 0) {
      // Zoom out
      this.zoomOut();
    } else {
      // Zoom in
      this.zoomIn();
    }
  }

  zoomIn() {
    this.zoomLevel += this.zoomStep;
  }

  zoomOut() {
    if (this.zoomLevel > this.zoomStep) {
      this.zoomLevel -= this.zoomStep;
    }
  }
}