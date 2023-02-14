import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account/account.component';
import { LoginComponent } from './login/login.component';
import { AccountRoutingModule } from './account-routing.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AccountComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AccountRoutingModule
  ],
  exports: [
    AccountComponent,
    LoginComponent
  ]
})
export class AccountModule { }
