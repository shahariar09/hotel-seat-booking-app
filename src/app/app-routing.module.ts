import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutViewComponent } from './Feature/component/layout-view/layout-view.component';
import { LayoutCreateComponent } from './Feature/component/layout-create/layout-create.component';
import { OrderComponent } from './Feature/component/order/order.component';

const routes: Routes = [
  {
     path: '', component: LayoutCreateComponent 
  },
  {
     path: 'view', component: LayoutViewComponent 
  },
  {
     path: 'order', component: OrderComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
