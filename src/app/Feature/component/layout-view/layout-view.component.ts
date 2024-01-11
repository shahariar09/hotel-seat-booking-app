import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray, CdkDragMove, CdkDragEnd, CdkDragStart } from '@angular/cdk/drag-drop';

import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout.service';
import { environment } from 'src/environments/environment';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { setDragData } from 'ngx-drag-drop/lib/dnd-utils';
import { SvgConversionService } from 'src/app/svgConversion.service';


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
  layoutViewList: any;
  screenWidth: number;
  screenHeight: number;
  tableWidth: number;
  chairWidth: number;
  position: DOMRect;
  sanitizedSvg: SafeHtml;
  svgByteCode: string;
  width: number;



  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef,
    private svgConversionService: SvgConversionService
  ) { 
   
  }
  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    this.tableWidth = (4*this.screenWidth)/100
    this.chairWidth = (3*this.screenWidth)/100

    var canvas = document.getElementById('canvas');


    
    this.width = canvas.offsetWidth

  // Get the position of the div
  this.position = canvas.getBoundingClientRect();
  console.log(this.position.top);
  console.log(this.position.left);



    this.getLayoutByName()

//     var c = document.getElementById("myCanvas")!;
// var ctx = c.getContext("2d");
//     ctx.beginPath();
//     ctx.arc(95,50,40,0,2*Math.PI);
//     ctx.arc(105,50,40,0,2*Math.PI);
//     ctx.stroke();



  }



  sanitizeSvg() {
    this.sanitizedSvg = this.svgConversionService.base64ToSvg(this.svgByteCode),toString();
    console.log(this.sanitizedSvg);
  }

  getLayoutByName(){
    this.layoutService.getLayoutByName("First Layout").subscribe(
      (data)=>{
        
        this.layoutViewList = data;
        this.layoutViewList.forEach(element => {
          
          if(element.chairPositionX){
            element.chairPositionX = (element.chairPositionX)+22+45
          }
          if(element.chairPositionY){
            element.chairPositionY = (element.chairPositionY)+22+45
          }
          if(element.tablePositionX){
            element.tablePositionX = (element.tablePositionX)+22+45
          }
          if(element.tablePositionY){
            element.tablePositionY = (element.tablePositionY)+22+25
          }
        });
        console.log(this.layoutViewList);
      },
      (err)=>{
        console.log(err);

      }
    )
  }
  onSubmit() {

    
    this.layoutService.sendRequesta(this.layout);
  }
  goToView(){
    this.router.navigate([environment.apiUrl+'view']);
  }
  deleteLayout(){
    
    this.layoutService.deleteItem(this.layoutViewList[0].name.trim()).subscribe(
      (data)=>{
        console.log(data);
        this.getLayoutByName()
      },
      (err)=>{
        console.log(err);

      }
    )
  }

  zoomLevel = 1;
  zoomStep = 0.1;

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
