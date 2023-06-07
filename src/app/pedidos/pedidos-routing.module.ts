import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaPedidosComponent } from './lista-pedidos/lista-pedidos.component';

const routes: Routes = [
    {
        path: '',
        component: ListaPedidosComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PedidosRoutingModule { }