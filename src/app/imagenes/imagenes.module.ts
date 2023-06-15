import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatatableImagenesComponent } from './datatable-imagenes/datatable-imagenes.component';
import { ImagesRoutingModule } from './imagen-routing.module';
import { DataTablesModule } from 'angular-datatables';
import { CategoriaImagenesComponent } from './categoria-imagenes/categoria-imagenes.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [
    DatatableImagenesComponent,
    CategoriaImagenesComponent
  ],
  imports: [
    CommonModule,
    ImagesRoutingModule,
    DataTablesModule,
    MatProgressSpinnerModule
  ]
})
export class ImagenesModule { }
