import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account/account.component';
import { LoginComponent } from './login/login.component';
import { AccountRoutingModule } from './account-routing.module';



@NgModule({
  declarations: [
    AccountComponent,
    LoginComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AccountComponent,
    LoginComponent,
    AccountRoutingModule
  ]
})
export class AccountModule { }
