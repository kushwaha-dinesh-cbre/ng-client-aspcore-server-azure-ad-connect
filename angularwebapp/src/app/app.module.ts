import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MsalModule, MsalInterceptor } from '@azure/msal-angular';
import { environment } from 'src/environments/environment';
import { MsalUserService } from './http-services/msal.user.service';
import { TechTalkService } from './http-services/tech.talk.service';

export const protectedResourceMap: [string, string[]][] = [
  ['http://localhost:58640/api/', ['api://227f010a-2682-4ab0-b432-737887d9b0f9/user_impersonation']],
  ['https://graph.microsoft.com/v1.0/me', ['user.read']]
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    MsalModule.forRoot({
      clientID: environment.uiClienId,
      authority: 'https://login.microsoftonline.com/' + environment.tenantId,
      cacheLocation: 'localStorage',
      protectedResourceMap: protectedResourceMap,
      redirectUri: environment.redirectUrl
    }),
  ],
  providers: [
    TechTalkService,
    MsalUserService,
    [{ provide: HTTP_INTERCEPTORS, useClass: MsalInterceptor, multi: true }]],
  bootstrap: [AppComponent]
})
export class AppModule { }
