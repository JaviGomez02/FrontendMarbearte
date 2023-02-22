import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllCategoriasComponent } from './all-categorias/all-categorias.component';
import { CategoriasRoutingModule } from './categorias-routing.module';



@NgModule({
  declarations: [
    AllCategoriasComponent
  ],
  imports: [
    CommonModule,
    CategoriasRoutingModule
  ],
  exports:[
    AllCategoriasComponent
  ]
})
export class CategoriasModule { }
