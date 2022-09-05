import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { BillingIndexComponent } from './billing/billing-index/billing-index.component';

import { HomeComponent } from './home/home/home.component';
import { PlansIndexComponent } from './plans/plans-index/plans-index.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, canActivate: [MsalGuard]},
  {path:'plans',component: PlansIndexComponent, canActivate: [MsalGuard]},
  {path: 'billing', component: BillingIndexComponent, canActivate: [MsalGuard]}
];

const isIframe = window !== window.parent && !window.opener;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
