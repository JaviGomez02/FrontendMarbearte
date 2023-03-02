import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatatableImagenesComponent } from './datatable-imagenes/datatable-imagenes.component';
import { ImagesRoutingModule } from './imagen-routing.module';
import { DataTablesModule } from 'angular-datatables';



@NgModule({
  declarations: [
    DatatableImagenesComponent
  ],
  imports: [
    CommonModule,
    ImagesRoutingModule,
    DataTablesModule
  ]
})
export class ImagenesModule { }
