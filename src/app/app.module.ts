import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { LoadingInterceptor } from './core/interceptor/loading.interceptor';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { OrderDetailedComponent } from './order-detailed/order-detailed.component';
import { FormsModule } from '@angular/forms';
import { AddEditTypeComponent } from './parametrage/add-edit-type/add-edit-type.component';
import { ListTypeComponent } from './parametrage/list-type/list-type.component';
import { AddEditFamilleComponent } from './parametrage/add-edit-famille/add-edit-famille.component';
import { ListFamilleComponent } from './parametrage/list-famille/list-famille.component';
import { AddEditUserComponent } from './parametrage/add-edit-user/add-edit-user.component';
import { ListUserComponent } from './parametrage/list-user/list-user.component';

import { ListProduitPromoComponent } from './vente/list-produit-promo/list-produit-promo.component';
import { AddEditClientComponent } from './vente/add-edit-client/add-edit-client.component';
import { ListClientComponent } from './vente/list-client/list-client.component';
import { CommandesComponent } from './commandes/commandes.component';
import { DetailsCommandesComponent } from './details-commandes/details-commandes.component';
import { AddItemModalComponent } from './add-item-modal/add-item-modal.component';
import {  ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ListGroupComponent } from './parametrage/list-group/list-group.component';
import { AddEditGroupComponent } from './add-edit-group/add-edit-group.component';
import { SharedModule } from "./shared/shared.module";
import { DashbordComponent } from './dashbord/dashbord.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    OrderDetailedComponent,
    AddEditClientComponent,
    ListClientComponent,
    ListProduitPromoComponent,
    CommandesComponent,
    DetailsCommandesComponent,
    AddItemModalComponent,
    ListGroupComponent,
    AddEditGroupComponent,
    DashbordComponent,
    AcceuilComponent,
    SidebarComponent, 
  ],
  imports: [MatAutocompleteModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule, MatFormFieldModule, MatInputModule,
    HomeModule, FormsModule, MatDialogModule, MatButtonModule, ReactiveFormsModule, SharedModule],
  providers: [
    // {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    // {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true},
    // {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
