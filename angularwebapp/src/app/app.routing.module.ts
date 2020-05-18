import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MsalGuard } from '@azure/msal-angular'

const routes: Routes = [
  { path: '', component: AppComponent, pathMatch: 'full', canActivate: [MsalGuard] }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }