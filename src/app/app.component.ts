import { Component, OnInit } from '@angular/core';
import { data } from './data';
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray, CdkDragMove, CdkDragEnd, CdkDragStart } from '@angular/cdk/drag-drop';
import { LayoutService } from './layout.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})
export class AppComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  
  ngOnInit(): void {
    
  }

  goToCreate(){
    this.router.navigate(['']);
  }
  goToView(){
    this.router.navigate(['view']);
  }
  goToOrder(){
    this.router.navigate(['order']);
  }
  


}
