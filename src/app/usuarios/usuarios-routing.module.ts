
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllUsuariosComponent } from './all-usuarios/all-usuarios.component';
import { UpdateUsuarioComponent } from './update-usuario/update-usuario.component';


const routes: Routes = [
  {
    path: '',
    component: AllUsuariosComponent,
    pathMatch:"full"
  },
  {
    path:'update/:username',
    component: UpdateUsuarioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)], //Muy importante que no se olvide el forChild
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }