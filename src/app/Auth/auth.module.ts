import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

import { MsalGuard, MsalInterceptor, MsalModule } from '@azure/msal-angular';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { environment } from 'src/environments/environment';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

const isIE =
  window.navigator.userAgent.indexOf('MSIE ') > -1 ||
  window.navigator.userAgent.indexOf('Trident/') > -1;

@NgModule({
  declarations: [SignupComponent, LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    MsalModule.forRoot(
      new PublicClientApplication({
        auth: {
          clientId: environment.CLIENT_ID,
          redirectUri: 'https://ticketing.test/auth/callback',
        },
        cache: {
          cacheLocation: 'localstorage',
          storeAuthStateInCookie: isIE,
        },
      }),
      {
        interactionType: InteractionType.Popup,
        authRequest: {
          scopes: ['user.read'],
        },
      },
      {
          interactionType: InteractionType.Popup,
          protectedResourceMap: new Map([
              ['https://graph.microsoft.com/v1.0/me',['user.read']]
          ])
      }
    ),
  ],
  providers: [
    MsalGuard,
    { provide: HTTP_INTERCEPTORS, useClass: MsalInterceptor, multi: true },
  ],
  exports: [SignupComponent, LoginComponent],
})
export class AuthModule {}
