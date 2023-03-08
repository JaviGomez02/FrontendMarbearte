
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth-guard.guard';
import { RolGuard } from '../rol-guard.guard';
import { AllUsuariosComponent } from './all-usuarios/all-usuarios.component';
import { UpdateUsuarioComponent } from './update-usuario/update-usuario.component';


const routes: Routes = [
  {
    path: '',
    component: AllUsuariosComponent,
    pathMatch:"full",
    canActivate:[RolGuard]
  },
  {
    path:'update/:username',
    component: UpdateUsuarioComponent,
    canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)], //Muy importante que no se olvide el forChild
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }