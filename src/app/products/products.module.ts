import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllProductsComponent } from './all-products/all-products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { DatatableProductComponent } from './datatable-product/datatable-product.component';
import { DataTablesModule } from 'angular-datatables';
import { HttpClientModule } from '@angular/common/http';
import { ColorProductoComponent } from './color-producto/color-producto.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductsAddComponent } from './products-add/products-add.component';
import { ProductsEditComponent } from './products-edit/products-edit.component';
import { ProductComponent } from './product/product.component';



@NgModule({
  declarations: [
    AllProductsComponent,
    DatatableProductComponent,
    ColorProductoComponent,
    ProductsAddComponent,
    ProductsEditComponent,
    ProductComponent
    
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    DataTablesModule,
    ReactiveFormsModule
    
  ],
  exports:[
    AllProductsComponent
  ]
})
export class ProductsModule { }
