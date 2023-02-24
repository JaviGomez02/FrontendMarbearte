import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllProductsComponent } from './all-products/all-products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { DatatableProductComponent } from './datatable-product/datatable-product.component';
import { DataTablesModule } from 'angular-datatables';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AllProductsComponent,
    DatatableProductComponent
    
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    DataTablesModule
    
  ],
  exports:[
    AllProductsComponent
  ]
})
export class ProductsModule { }
