import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth-guard.guard';
import { RolGuard } from './rol-guard.guard';
import { NotFoundComponent } from './shared/not-found/not-found.component';

const routes: Routes = [

  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule)
  },
  {
    path: 'products',
    loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)
  },
  {
    path: 'categoria',
    loadChildren: () => import('./categorias/categorias.module').then(m => m.CategoriasModule),
    canActivate: [RolGuard]
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule)
  },
  {
    path: 'images',
    loadChildren: () => import('./imagenes/imagenes.module').then(m => m.ImagenesModule),
    canActivate: [RolGuard]
  },
  {
    path: 'cart',
    loadChildren: () => import('./carrito/carrito.module').then(m => m.CarritoModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'pedidos',
    loadChildren: () => import('./pedidos/pedidos.module').then(m => m.PedidosModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
