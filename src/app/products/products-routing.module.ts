import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProductsComponent } from './all-products/all-products.component';
import { ColorProductoComponent } from './color-producto/color-producto.component';

const routes: Routes = [
    {
        path: 'all',
        component: AllProductsComponent
    },
    {
        path: 'color',
        component: ColorProductoComponent
    }   
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ProductsRoutingModule { }