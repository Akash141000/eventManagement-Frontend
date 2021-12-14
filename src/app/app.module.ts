import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AuthModule } from './Auth/auth.module';
import { HeaderComponent } from './Header/header.component';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from "@angular/common/http"
import { EventsModule } from './Events/events.module';
import { PaymentsModule } from './Payments/payments.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AuthModule,
    AppRoutingModule,
    EventsModule,
    PaymentsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
