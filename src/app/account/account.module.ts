import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account/account.component';
import { LoginComponent } from './login/login.component';
import { AccountRoutingModule } from './account-routing.module';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { VerifyComponent } from './verify/verify.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AccountComponent,
    LoginComponent,
    RegisterComponent,
    VerifyComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AccountRoutingModule,
    RouterModule
  ],
  exports: [
    AccountComponent,
    LoginComponent
  ]
})
export class AccountModule { }
