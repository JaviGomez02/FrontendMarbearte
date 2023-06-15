import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaPedidosComponent } from './lista-pedidos/lista-pedidos.component';
import { PedidosRoutingModule } from './pedidos-routing.module';
import {  MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [
    ListaPedidosComponent
  ],
  imports: [
    CommonModule,
    PedidosRoutingModule,
    MatProgressSpinnerModule
  ]
})
export class PedidosModule { }
