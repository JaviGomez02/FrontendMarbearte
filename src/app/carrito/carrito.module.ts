import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoComponent } from './carrito/carrito.component';



@NgModule({
  declarations: [
    CarritoComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CarritoComponent
  ]
})
export class CarritoModule { }
