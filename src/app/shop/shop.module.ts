import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { SharedModule } from '../shared/shared.module';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { RouterModule } from '@angular/router';
import { ShopRoutingModule } from './shop-routing.module';
import { AddProductComponent } from './add-product/add-product.component';

import { FormsModule } from '@angular/forms';
import { ListProduitComponent } from './list-produit/list-produit.component';
import { AddEditTypeComponent } from '../parametrage/add-edit-type/add-edit-type.component';
import { ListTypeComponent } from '../parametrage/list-type/list-type.component';
import { AddEditFamilleComponent } from '../parametrage/add-edit-famille/add-edit-famille.component';
import { ListFamilleComponent } from '../parametrage/list-famille/list-famille.component';
import { AddEditUserComponent } from '../parametrage/add-edit-user/add-edit-user.component';
import { ListUserComponent } from '../parametrage/list-user/list-user.component';


@NgModule({
  declarations: [ 
    ShopComponent,
    ProductItemComponent,
    ProductDetailsComponent,
    AddProductComponent,
    ListProduitComponent,
    AddEditTypeComponent,
    ListTypeComponent,
    AddEditFamilleComponent,
    ListFamilleComponent,
    AddEditUserComponent,
    ListUserComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ShopRoutingModule,FormsModule
  ]
})
export class ShopModule { }
