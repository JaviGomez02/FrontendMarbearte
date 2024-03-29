import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProductsComponent } from './all-products/all-products.component';
import { ColorProductoComponent } from './color-producto/color-producto.component';
import { ProductComponent } from './product/product.component';
import { ProductsAddComponent } from './products-add/products-add.component';
import { ProductsEditComponent } from './products-edit/products-edit.component';
import { ColorAddComponent } from './color-add/color-add.component';

const routes: Routes = [
    {
        path: 'all',
        component: AllProductsComponent
    },
    {
        path: '',
        redirectTo: 'all',
        pathMatch: 'full'
    },
    {
        path: 'color',
        component: ColorProductoComponent
    },
    {
        path: 'color/add',
        component: ColorAddComponent
    },
    {
        path: 'add',
        component: ProductsAddComponent
    },
    {
        path: 'edit/:id',
        component: ProductsEditComponent
    },
    {
        path: ':id',
        component: ProductComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductsRoutingModule { }