import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ShopComponent } from './shop.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AddEditTypeComponent } from '../parametrage/add-edit-type/add-edit-type.component';

const routes: Routes = [
  {path: '', component: ShopComponent},
  {path: 'addproduct', component: AddProductComponent},

  {path: 'editproduct/:id', component: AddProductComponent},

  { path: 'EditType/:id', component: AddEditTypeComponent },

  {path: 'AddType', component: AddEditTypeComponent},

  {path: '', component: ShopComponent},

  {path: ':id', component: ProductDetailsComponent, data: {breadcrumb: {alias: 'productDetails'}}},
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ShopRoutingModule { }
  