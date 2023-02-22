
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllCategoriasComponent } from './all-categorias/all-categorias.component';


const routes: Routes = [
  {
    path: '',
    component: AllCategoriasComponent,
    pathMatch: 'full'
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)], //Muy importante que no se olvide el forChild
    exports: [RouterModule]
  })
  export class CategoriasRoutingModule { }