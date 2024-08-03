import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderDetailedComponent } from '../order-detailed/order-detailed.component';
import { OrdersComponent } from './orders.component';

// 1. add routes for the orders

const routes: Routes = [
 
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
