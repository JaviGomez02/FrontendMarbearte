
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllUsuariosComponent } from './all-usuarios/all-usuarios.component';


const routes: Routes = [
  {
    path: '',
    component: AllUsuariosComponent,
    pathMatch:"full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)], //Muy importante que no se olvide el forChild
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }