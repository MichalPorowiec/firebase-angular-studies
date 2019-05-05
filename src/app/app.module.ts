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
    AuthModule,
    EmailGeneratorModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
