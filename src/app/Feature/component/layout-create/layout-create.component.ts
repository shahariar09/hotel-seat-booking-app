import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray, CdkDragMove, CdkDragEnd, CdkDragStart } from '@angular/cdk/drag-drop';

import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout.service';
import * as html2canvas from 'html2canvas';


@Component({
  selector: 'app-layout-create',
  templateUrl: './layout-create.component.html',
  styleUrls: ['./layout-create.component.css']
})
export class LayoutCreateComponent implements OnInit {

  title = 'hotel-seat-booking';
  tableInputValue: any = 10;
  chairInputValue: any = 10;
  layout: any[] = [];

  apparatusTable: any = [];
  apparatusChair: any = [];
  initialPosition: { x: any; y: any; };

  initialX: number;
  initialY: number;
  screenWidth: number;
  screenHeight: number;
  tableWidth: number;
  chairWidth: number;
  position: DOMRect;
  @ViewChild('captureElement') captureElement: ElementRef;


  constructor(
    private layoutService: LayoutService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    this.tableWidth = (4 * this.screenWidth) / 100
    this.chairWidth = (3 * this.screenWidth) / 100
    this.loadTable();
    this.loadChair();

    var canvas = document.getElementById('canvas');

    this.position = canvas.getBoundingClientRect();
    console.log(this.position.top);
    console.log(this.position.left);
  }

  loadTable() {
    var itarate = 10;
    for (var i = 1; i <= this.tableInputValue; i++) {
      this.apparatusTable.push(
        {
          id: i,
          imageURl: './assets/table.jpg',
        }
      )
    }
  }

  loadChair() {
    var itarate = 10;
    for (var i = 1; i <= this.chairInputValue; i++) {
      this.apparatusChair.push(
        {
          id: i,
          imageURl: './assets/chair.png',
        }
      )
    }
  }
  handleDrop(event: CdkDragDrop<any>) {
    

    this.initialPosition = { x: event.item.element.nativeElement.style.left, y: event.item.element.nativeElement.style.top };

    // Your custom logic to determine whether to cancel the drag action.
    if (1) {
      event.item.element.nativeElement.style.left = this.initialPosition.x;
      event.item.element.nativeElement.style.top = this.initialPosition.y;
    }

  }

  onDragEnded(event: CdkDragEnd, apparatusType, item) {
    console.log(event.source.getFreeDragPosition());




    if (apparatusType == 1) {


      if (this.layout.filter(c => c.tableNo == item.id).length > 0) {

        var selectedItem = this.layout.filter(c => c.tableNo == item.id)
        var index = this.layout.indexOf(selectedItem[0]);
        this.layout.splice(index, 1)
      }

      var layouTableProperty = {
        name: "First Layout",
        tableNo: item.id,
        tablePositionX: event.source.getFreeDragPosition().x-this.position.left,
        tablePositionY: event.source.getFreeDragPosition().y,
        // tablePositionX: (((event.source.getFreeDragPosition().x-this.position.left) * 1000) / this.screenWidth),
        // tablePositionY: (((event.source.getFreeDragPosition().y-this.position.top) * 1000) / this.screenHeight),

      }
      

      this.layout.push(layouTableProperty);



    }
    else {


      if (this.layout.filter(c => c.chairNo == item.id).length > 0) {

        var selectedItem = this.layout.filter(c => c.chairNo == item.id)
        var index = this.layout.indexOf(selectedItem[0]);
        this.layout.splice(index, 1)
      }

      var layoutChairProperty = {
        name: "First Layout",
        chairNo: item.id,
        chairPositionX: event.source.getFreeDragPosition().x-this.position.left,
        chairPositionY: event.source.getFreeDragPosition().y,
      }

      this.layout.push(layoutChairProperty);



    }
    console.log(this.layout);




  }



  isDragDisabled(item: string): boolean {


    // Add your logic here to determine whether the item can be dragged
    return false; // Example: disable dragging for 'Item 3'
  }

  onSubmit() {
    // this.captureToCanvas()

    this.layoutService.sendRequesta(this.layout);

  }
  goToView() {
    this.router.navigate(['view']);
  }
  onReset() {

  }


  captureToCanvas() {
    const elementToCapture = this.captureElement.nativeElement;
  
    html2canvas.default(elementToCapture).then((canvas) => {
      // The canvas is now ready, you can do further processing
      // or save the canvas image as needed.
      this.captureElement.nativeElement.appendChild(canvas);
    });
  }

  
}

