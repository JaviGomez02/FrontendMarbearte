import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { AboutRoutingModule } from './about-routing.module';


@NgModule({
  declarations: [
    AboutComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    AboutComponent,
    AboutRoutingModule
  ]
})
export class AboutModule { }
