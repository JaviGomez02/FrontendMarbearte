import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllCategoriasComponent } from './all-categorias/all-categorias.component';
import { CategoriasRoutingModule } from './categorias-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { DataTablesModule } from 'angular-datatables';
import { HttpClientModule } from '@angular/common/http';
import { AddCategoriaComponent } from './add-categoria/add-categoria.component';
import { UpdateCategoriaComponent } from './update-categoria/update-categoria.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AllCategoriasComponent,
    AddCategoriaComponent,
    UpdateCategoriaComponent
  ],
  imports: [
    CommonModule,
    CategoriasRoutingModule,
    DataTablesModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule

  ],
  exports:[
    AllCategoriasComponent
  ]
})
export class CategoriasModule { }
