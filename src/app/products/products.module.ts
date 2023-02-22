import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllProductsComponent } from './all-products/all-products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { DatatableProductComponent } from './datatable-product/datatable-product.component';



@NgModule({
  declarations: [
    AllProductsComponent,
    DatatableProductComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule
  ],
  exports:[
    AllProductsComponent
  ]
})
export class ProductsModule { }
