import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { ProductsModule } from './products/products.module';
import { AboutModule } from './about/about.module';
import { ContactModule } from './contact/contact.module';
import { AccountModule } from './account/account.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CategoriasModule } from './categorias/categorias.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthInterceptorService } from './auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HomeModule,
    ProductsModule,
    AboutModule,
    ContactModule,
    AccountModule,
    HttpClientModule,
    CategoriasModule,
    UsuariosModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
