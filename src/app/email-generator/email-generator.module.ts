import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailGeneratorComponent } from './email-generator.component';
import { WholeEmailGeneratorComponent } from './sub-components/whole-email-generator/whole-email-generator.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CheckEmailComponent } from './sub-components/check-email/check-email.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

@NgModule({
  declarations: [
    EmailGeneratorComponent,
    WholeEmailGeneratorComponent,
    CheckEmailComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    MDBBootstrapModule
  ],
  exports: [EmailGeneratorComponent]
})
export class EmailGeneratorModule { }
