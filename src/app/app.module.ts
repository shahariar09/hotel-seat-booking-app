import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CdkDragHandle, DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LayoutViewComponent } from './Feature/component/layout-view/layout-view.component';
import { LayoutCreateComponent } from './Feature/component/layout-create/layout-create.component';
import { OrderComponent } from './Feature/component/order/order.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutViewComponent,
    LayoutCreateComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,DragDropModule,CdkDragHandle,FormsModule,HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
