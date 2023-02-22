import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllCategoriasComponent } from './all-categorias/all-categorias.component';
import { CategoriasRoutingModule } from './categorias-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { DataTablesModule } from 'angular-datatables';
import { HttpClientModule } from '@angular/common/http';
import { BorrarCategoriaComponent } from './borrar-categoria/borrar-categoria.component';
import { AddCategoriaComponent } from './add-categoria/add-categoria.component';
import { UpdateCategoriaComponent } from './update-categoria/update-categoria.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AllCategoriasComponent,
    BorrarCategoriaComponent,
    AddCategoriaComponent,
    UpdateCategoriaComponent
  ],
  imports: [
    CommonModule,
    CategoriasRoutingModule,
    DataTablesModule,
    HttpClientModule,
    ReactiveFormsModule

  ],
  exports:[
    AllCategoriasComponent
  ]
})
export class CategoriasModule { }
