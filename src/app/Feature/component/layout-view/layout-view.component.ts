import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray, CdkDragMove, CdkDragEnd, CdkDragStart } from '@angular/cdk/drag-drop';

import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-layout-view',
  templateUrl: './layout-view.component.html',
  styleUrls: ['./layout-view.component.css']
})
export class LayoutViewComponent implements OnInit {

  title = 'hotel-seat-booking';
  tableInputValue: any;
  chairInputValue: any;
  layout: any[] = [];

  apparatusTable: any = [];
  apparatusChair: any = [];
  initialPosition: { x: any; y: any; };

  initialX: number;
  initialY: number;
  layoutViewList: Object;


  constructor(
    private layoutService: LayoutService,
    private router: Router,
  ) { }
  ngOnInit(): void {
    this.getLayoutByName()
  }

  getLayoutByName(){
    this.layoutService.getLayoutByName("First Layout").subscribe(
      (data)=>{
        this.layoutViewList = data.Data;
        console.log(this.layoutViewList);
      },
      (err)=>{
        console.log(err);

      }
    )
  }

  loadTable() {
    var itarate = 10;
    for (var i = 1; i <= this.tableInputValue; i++) {
      this.apparatusTable.push(
        {
          id: i,
          imageURl: '../../../../assets/table.jpg',
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
    console.log(item);

    if (apparatusType == 1) {
      // console.log('X', event.dropPoint.x);
      // console.log('Y', event.dropPoint.y);

      var layouTableProperty = {
        name: "First Layout",
        tableNo: item.id,
        tablePositionX: event.dropPoint.x,
        tablePositionY: event.dropPoint.y,

      }

      this.layout.push(layouTableProperty);
    }
    else {
      // console.log('X', event.dropPoint.x);
      // console.log('Y', event.dropPoint.y);

      var layoutChairProperty = {
        name: "First Layout",
        chairNo: item.id,
        chairPositionX: event.dropPoint.x,
        chairPositionY: event.dropPoint.y,
      }

      this.layout.push(layoutChairProperty);
    }
    console.log(this.layout);




  }


  items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];

  // Track the initial mouse coordinates when dragging starts

  // Function to determine whether drag should be canceled based on mouse position
  shouldCancelDrag(x: number, y: number): boolean {
    return x < 1100 || y < 1100;
  }

  onDragStarted(event: CdkDragStart): void {

    // Save the initial mouse coordinates when drag starts
    this.initialX = event.source.element.nativeElement.getBoundingClientRect().left;
    this.initialY = event.source.element.nativeElement.getBoundingClientRect().top;

  }

  onDrop(event: CdkDragDrop<string[]>): void {

    // Check if the drag should be canceled based on mouse position
    if (this.shouldCancelDrag(this.initialX, this.initialY)) {
      // Cancel the drag by resetting the element's position
      event.item.element.nativeElement.style.transform = 'none';
    } else {
      // Add code to execute when an item is dropped
      console.log('Item dropped successfully');
    }
  }

  isDragDisabled(item: string): boolean {
    console.log(item);

    // Add your logic here to determine whether the item can be dragged
    return false; // Example: disable dragging for 'Item 3'
  }

  onSubmit() {
    console.log(this.layout);
    this.layoutService.sendRequesta(this.layout);
  }
  goToView(){
    this.router.navigate([environment.apiUrl+'view']);
  }
  deleteLayout(){
    debugger
    this.layoutService.deleteItem(this.layoutViewList[0].name).subscribe(
      (data)=>{
        console.log(data);
        this.getLayoutByName()
      },
      (err)=>{
        console.log(err);

      }
    )
  }

}
