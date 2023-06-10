import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoComponent } from './carrito/carrito.component';
import { CarritoFinalComponent } from './carrito-final/carrito-final.component';
import { CarritoRoutingModule } from './carrito-routing.module';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';


@NgModule({
  declarations: [
    CarritoComponent,
    CarritoFinalComponent
  ],
  imports: [
    CommonModule,
    CarritoRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule
  ],
  exports: [
    CarritoComponent,
    CarritoFinalComponent
  ]
})
export class CarritoModule { }
