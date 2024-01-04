import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray, CdkDragMove, CdkDragEnd, CdkDragStart } from '@angular/cdk/drag-drop';

import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout.service';

@Component({
  selector: 'app-layout-create',
  templateUrl: './layout-create.component.html',
  styleUrls: ['./layout-create.component.css']
})
export class LayoutCreateComponent implements OnInit {

  title = 'hotel-seat-booking';
  tableInputValue: any=3;
  chairInputValue: any=3;
  layout: any[] = [];

  apparatusTable: any = [];
  apparatusChair: any = [];
  initialPosition: { x: any; y: any; };

  initialX: number;
  initialY: number;


  constructor(
    private layoutService: LayoutService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loadTable();
    this.loadChair();
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
        tablePositionX: event.source.getFreeDragPosition().x,
        tablePositionY: event.source.getFreeDragPosition().y,

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
        chairPositionX: event.source.getFreeDragPosition().x,
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

    this.layoutService.sendRequesta(this.layout);
  }
  goToView() {
    this.router.navigate(['view']);
  }
  onReset(){

  }
}
