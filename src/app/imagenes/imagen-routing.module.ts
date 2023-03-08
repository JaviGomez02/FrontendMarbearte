import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatatableImagenesComponent } from './datatable-imagenes/datatable-imagenes.component';

const routes: Routes = [
    {
        path: '',
        component: DatatableImagenesComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ImagesRoutingModule { }