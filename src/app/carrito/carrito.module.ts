import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoComponent } from './carrito/carrito.component';
import { CarritoFinalComponent } from './carrito-final/carrito-final.component';
import { CarritoRoutingModule } from './carrito-routing.module';



@NgModule({
  declarations: [
    CarritoComponent,
    CarritoFinalComponent
  ],
  imports: [
    CommonModule,
    CarritoRoutingModule
  ],
  exports: [
    CarritoComponent,
    CarritoFinalComponent
  ]
})
export class CarritoModule { }
