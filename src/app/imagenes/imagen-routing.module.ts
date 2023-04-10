import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriaImagenesComponent } from './categoria-imagenes/categoria-imagenes.component';
import { DatatableImagenesComponent } from './datatable-imagenes/datatable-imagenes.component';

const routes: Routes = [
    {
        path: '',
        component: DatatableImagenesComponent
    },
    {
        path: 'categoria',
        component:CategoriaImagenesComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ImagesRoutingModule { }