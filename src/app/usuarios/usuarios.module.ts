import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllUsuariosComponent } from './all-usuarios/all-usuarios.component';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { DataTablesModule } from 'angular-datatables';
import { UpdateUsuarioComponent } from './update-usuario/update-usuario.component';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [
    AllUsuariosComponent,
    UpdateUsuarioComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    DataTablesModule,
    FormsModule,
    MatProgressSpinnerModule
  ]
})
export class UsuariosModule { }
