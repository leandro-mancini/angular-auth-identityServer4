import { Route as ngRoute, Routes } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthGuard } from '../data/auth/auth.guard';
import { BaseComponent } from './base/base.component';

@Injectable({
  providedIn: 'root'
})
export class Route {

  static withShell(routes: Routes): ngRoute {
    return {
      path: '',
      component: BaseComponent,
      children: routes,
      canActivate: [AuthGuard],
    };
  }
}
