import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MsalInterceptor, MsalModule, MSAL_BROADCAST_CONFIG, MsalService, MsalBroadcastConfiguration, MSAL_INTERCEPTOR_CONFIG, MsalGuard } from '@azure/msal-angular';

import { msalConfig, msalAngularConfig, isIE, guardConfig, interceptConfig } from './app-config';
import { Configuration } from 'msal';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlansModule } from './plans/plans.module';
import { DevicesModule } from './Devices/devices.module';
import { BillingModule } from './billing/billing.module';
import { PublicClientApplication } from '@azure/msal-browser';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MsalModule.forRoot(new PublicClientApplication({
      auth: {
        clientId: '76614ac9-0d7f-4fa2-beb7-2e5588b40a90',
        authority: "https://login.microsoftonline.com/common/",
        redirectUri: 'https://orange-mushroom-0fdc85810.1.azurestaticapps.net',
        postLogoutRedirectUri: 'https://orange-mushroom-0fdc85810.1.azurestaticapps.net',
        navigateToLoginRequestUrl: true,
      },
      cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: isIE,
      }
    }), guardConfig, interceptConfig),
    ReactiveFormsModule,
    HttpClientModule,
    PlansModule,
    DevicesModule,
    FormsModule,
    BillingModule
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: MsalInterceptor,
    multi: true
    },
    MsalGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
