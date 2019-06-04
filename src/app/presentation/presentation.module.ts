import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ProtectedComponent } from './pages/protected/protected.component';

@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    ProtectedComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class PresentationModule { }
