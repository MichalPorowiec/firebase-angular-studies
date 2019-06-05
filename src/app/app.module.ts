import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { AppRoutingModule } from './routing/app-routing.module';
import { AvailabilityModule } from './availabilityPicker/availability/availability.module';
import { FirebaseModule } from './firebase/firebase.module';
import { MenuModule } from './menu/menu/menu.module';
import { AuthModule } from './auth/auth.module';
import { EmailGeneratorModule } from './email-generator/email-generator.module';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { CookieService } from 'ngx-cookie-service';
import { FaqModule } from './faq/faq.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AvailabilityModule,
    FirebaseModule,
    MenuModule,
    FaqModule,
    AuthModule,
    EmailGeneratorModule,
    AngularFireAuthModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
