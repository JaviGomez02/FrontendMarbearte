import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarritoComponent } from './carrito/carrito.component';
import { CarritoFinalComponent } from './carrito-final/carrito-final.component';
const routes: Routes = [
    {
        path: '',
        component: CarritoFinalComponent,
        pathMatch: 'full'
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CarritoRoutingModule { }