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
  layoutViewList: any;
  screenWidth: number;
  screenHeight: number;
  tableWidth: number;
  chairWidth: number;


  constructor(
    private layoutService: LayoutService,
    private router: Router,
  ) { }
  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    this.tableWidth = (3.2*this.screenWidth)/100
    this.chairWidth = (3.2*this.screenWidth)/100
    this.getLayoutByName()
  }

  getLayoutByName(){
    this.layoutService.getLayoutByName("First Layout").subscribe(
      (data)=>{
        
        this.layoutViewList = data;
        this.layoutViewList.forEach(element => {
          
          if(element.chairPositionX){
            element.chairPositionX = ((element.chairPositionX*this.screenWidth)/100)
          }
          if(element.chairPositionY){
            element.chairPositionY = ((element.chairPositionY*this.screenHeight)/100)
          }
          if(element.tablePositionX){
            element.tablePositionX = ((element.tablePositionX*this.screenWidth)/100)
          }
          if(element.tablePositionY){
            element.tablePositionY = ((element.tablePositionY*this.screenHeight)/100)
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
    console.log(this.layout);
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

}
